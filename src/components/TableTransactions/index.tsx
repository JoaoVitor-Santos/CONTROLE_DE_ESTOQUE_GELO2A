import React, { useState } from "react";
import './styles.css';
import { useTableTransactions } from "../../context/tableTransactionsContext";

export function TableTransactions() {
    const { transactions, isOpenTransactions } = useTableTransactions();

    // States for filters
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedClient, setSelectedClient] = useState<string>("");

    // Function to extract the month from a date in the format DD/MM/YYYY
    const extractMonth = (date: string): string => {
        return date.split("/")[1]; // Returns the month (second part of the date)
    };

    // Filter transactions based on selected filters
    const filteredTransactions = transactions.filter((transaction) => {
        const matchesCity = selectedCity ? transaction.city === selectedCity : true;
        const matchesProduct = selectedProduct ? transaction.product === selectedProduct : true;
        const matchesMonth = selectedMonth ? extractMonth(transaction.date) === selectedMonth : true;
        const matchesClient = selectedClient ? transaction.client === selectedClient : true;

        return matchesCity && matchesProduct && matchesMonth && matchesClient;
    });

    // Get unique values for cities, products, months, and clients
    const uniqueCities = Array.from(new Set(transactions.map((t) => t.city)));
    const uniqueProducts = Array.from(new Set(transactions.map((t) => t.product)));
    const uniqueMonths = Array.from(new Set(transactions.map((t) => extractMonth(t.date))));
    const uniqueClients = Array.from(new Set(transactions.map((t) => t.client)));

    // Early return if the table is not open
    if (!isOpenTransactions) {
        return null;
    }

    return (
        <div className="table-container">
            {/* Filters */}
            <div className="filters">
                <div className="filter-item">
                    <label htmlFor="city">Filtrar por Cidade:</label>
                    <select
                        id="city"
                        className="DropdownFiltersTable"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                    >
                        <option value="">Todas as cidades</option>
                        {uniqueCities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-item">
                    <label htmlFor="product">Filtrar por Produto:</label>
                    <select
                        id="product"
                        className="DropdownFiltersTable"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        <option value="">Todos os produtos</option>
                        {uniqueProducts.map((product) => (
                            <option key={product} value={product}>
                                {product}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-item">
                    <label htmlFor="month">Filtrar por Mês:</label>
                    <select
                        id="month"
                        className="DropdownFiltersTable"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">Todos os meses</option>
                        {uniqueMonths.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-item">
                    <label htmlFor="client">Filtrar por Cliente:</label>
                    <select
                        id="client"
                        className="DropdownFiltersTable"
                        value={selectedClient}
                        onChange={(e) => setSelectedClient(e.target.value)}
                    >
                        <option value="">Todos os clientes</option>
                        {uniqueClients.map((client) => (
                            <option key={client} value={client}>
                                {client}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Cliente</th>
                        <th>Cidade</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Vendedor</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.client}</td>
                                <td>{transaction.city}</td>
                                <td>{transaction.product}</td>
                                <td>{transaction.quantity}</td>
                                <td>R$ {transaction.value}</td>
                                <td>{transaction.seller}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Nenhuma transação encontrada</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}