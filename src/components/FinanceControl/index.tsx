import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import './styles.css';
import { useFinanceControl } from "../../context/FinanceControlContext";
import { useTableSales } from "../../context/tableSalesContext";
import { useTableSpents } from "../../context/tableSpentContext";
import * as XLSX from 'xlsx';

// Registro dos componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Transaction {
  CO_ID: number;
  DT_DATE: string;
  CO_TYPE: string;
  CO_DESCRIPTION: string;
  VL_VALUE: number;
}

export function FinanceControl() {
  const { isOpenFinanceControl } = useFinanceControl();
  const { tbSales = [] } = useTableSales();
  const { tbSpents = [] } = useTableSpents();

  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isChartMinimized, setIsChartMinimized] = useState<boolean>(false);

  if (!isOpenFinanceControl) {
    return null;
  }

  const extractMonth = (DT_DATE: string): string => DT_DATE.split("/")[1] || "";

  const formatDate = (dateValue: string): string => {
    // Verifica se já está no formato DD/MM/YYYY
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) {
      return dateValue;
    }

    // Tenta converter a string para um objeto Date
    const date = new Date(dateValue);

    if (isNaN(date.getTime())) {
      return "Data inválida";
    }

    // Extrai dia, mês e ano usando métodos UTC para evitar deslocamento de fuso
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // +1 porque meses começam em 0
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  // Normaliza as datas para DD/MM/YYYY antes de processar
  const transactions: Transaction[] = [
    ...(tbSales || []).map((sale) => ({
      CO_ID: sale.CO_ID,
      DT_DATE: formatDate(sale.DT_DATE),
      CO_TYPE: "Venda",
      CO_DESCRIPTION: `${sale.CO_CLIENT} - ${sale.CO_PRODUCT}`,
      VL_VALUE: Number(sale.VL_VALUE) || 0,
    })),
    ...(tbSpents || []).map((spent) => ({
      CO_ID: spent.CO_ID,
      DT_DATE: formatDate(spent.DT_DATE),
      CO_TYPE: "Gasto",
      CO_DESCRIPTION: spent.CO_DESCRIPTION,
      VL_VALUE: -Number(spent.VL_VALUE) || 0,
    })),
  ].sort((a, b) => {
    const dateA = new Date(a.DT_DATE.split('/').reverse().join('-')); // Converte DD/MM/YYYY para YYYY-MM-DD
    const dateB = new Date(b.DT_DATE.split('/').reverse().join('-'));
    return dateA.getTime() - dateB.getTime();
  });

  const filteredTransactions = transactions.filter((t) => {
    const matchesMonth = selectedMonth ? extractMonth(t.DT_DATE) === selectedMonth : true;
    const matchesType = selectedType ? t.CO_TYPE === selectedType : true;
    const date = new Date(t.DT_DATE.split('/').reverse().join('-')).getTime(); // Converte para comparação
    const matchesStartDate = startDate ? date >= new Date(startDate).getTime() : true;
    const matchesEndDate = endDate ? date <= new Date(endDate).getTime() : true;
    return matchesMonth && matchesType && matchesStartDate && matchesEndDate;
  });

  const totalGains = filteredTransactions
    .filter((t) => t.CO_TYPE === "Venda")
    .reduce((acc, curr) => acc + curr.VL_VALUE, 0);

  const totalExpenses = filteredTransactions
    .filter((t) => t.CO_TYPE === "Gasto")
    .reduce((acc, curr) => acc + Math.abs(curr.VL_VALUE), 0);

  const balance = totalGains - totalExpenses;

  const uniqueMonths = Array.from(new Set(transactions.map((t) => extractMonth(t.DT_DATE)))).sort();
  const monthlyData = uniqueMonths.map((month) => {
    const monthTransactions = transactions.filter((t) => extractMonth(t.DT_DATE) === month);
    const gains = monthTransactions.filter((t) => t.CO_TYPE === "Venda").reduce((acc, curr) => acc + curr.VL_VALUE, 0);
    const expenses = monthTransactions.filter((t) => t.CO_TYPE === "Gasto").reduce((acc, curr) => acc + Math.abs(curr.VL_VALUE), 0);
    return { month, gains, expenses, balance: gains - expenses };
  });

  const monthlyAverageGain = totalGains / uniqueMonths.length || 0;
  const monthlyAverageExpense = totalExpenses / uniqueMonths.length || 0;
  const projectedBalanceNextMonth = balance + (monthlyAverageGain - monthlyAverageExpense);

  const chartData = {
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        label: "Ganhos",
        data: monthlyData.map((d) => d.gains),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        fill: true,
      },
      {
        label: "Gastos",
        data: monthlyData.map((d) => d.expenses),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)",
        fill: true,
      },
      {
        label: "Saldo",
        data: monthlyData.map((d) => d.balance),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Evolução Financeira Mensal" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const exportToXLSX = () => {
    const headers = ["Data", "Tipo", "Descrição", "Valor"];
    const data = filteredTransactions.map((t) => [
      t.DT_DATE,
      t.CO_TYPE,
      t.CO_DESCRIPTION,
      t.VL_VALUE.toFixed(2),
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transações");
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "finance_control.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="finance-control-container">
      <div className="summary">
        <div className="summary-item">
          <h3>Total Ganhos</h3>
          <p style={{ color: 'green' }}>R$ {Number(totalGains).toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Total Gastos</h3>
          <p style={{ color: 'red' }}>R$ {Number(totalExpenses).toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Saldo</h3>
          <p style={{ color: balance >= 0 ? 'green' : 'red' }}>
            R$ {Number(balance).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="filters">
        <div className="filter-item">
          <label htmlFor="MONTH">Filtrar por Mês:</label>
          <select
            id="MONTH"
            className="DropdownFiltersTable"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">Todos os meses</option>
            {uniqueMonths.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="TYPE">Filtrar por Tipo:</label>
          <select
            id="TYPE"
            className="DropdownFiltersTable"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Venda">Venda</option>
            <option value="Gasto">Gasto</option>
          </select>
        </div>
        <div className="filter-item">
          <label htmlFor="START_DATE">Data Inicial:</label>
          <input
            type="date"
            id="START_DATE"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="END_DATE">Data Final:</label>
          <input
            type="date"
            id="END_DATE"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="chart-container">
        <button
          className="toggle-chart-button"
          onClick={() => setIsChartMinimized(!isChartMinimized)}
        >
          {isChartMinimized ? "Maximizar Gráfico" : "Minimizar Gráfico"}
        </button>
        {!isChartMinimized && (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={`${transaction.CO_TYPE}-${transaction.CO_ID}`}>
                  <td>{transaction.DT_DATE}</td>
                  <td>{transaction.CO_TYPE}</td>
                  <td>{transaction.CO_DESCRIPTION}</td>
                  <td style={{ color: transaction.VL_VALUE >= 0 ? 'green' : 'red' }}>
                    R$ {Math.abs(transaction.VL_VALUE).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>Nenhuma transação encontrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="projection">
        <h3>Projeção para o Próximo Mês</h3>
        <p>Média Mensal de Ganhos: R$ {Number(monthlyAverageGain).toFixed(2)}</p>
        <p>Média Mensal de Gastos: R$ {Number(monthlyAverageExpense).toFixed(2)}</p>
        <p style={{ color: projectedBalanceNextMonth >= 0 ? 'green' : 'red' }}>
          Saldo Projetado: R$ {Number(projectedBalanceNextMonth).toFixed(2)}
        </p>
      </div>

      <div className="export">
        <button onClick={exportToXLSX} className="export-button">
          Exportar para XLSX
        </button>
      </div>

      <div className="monthly-summary">
        <h3>Resumo Mensal</h3>
        <table>
          <thead>
            <tr>
              <th>Mês</th>
              <th>Ganhos</th>
              <th>Gastos</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {monthlyData.map((data) => (
              <tr key={data.month}>
                <td>{data.month}</td>
                <td style={{ color: 'green' }}>R$ {Number(data.gains).toFixed(2)}</td>
                <td style={{ color: 'red' }}>R$ {Number(data.expenses).toFixed(2)}</td>
                <td style={{ color: data.balance >= 0 ? 'green' : 'red' }}>
                  R$ {Number(data.balance).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}