import React, { useState } from "react";
import './styles.css';
import { useTableSales } from "../../context/tableSalesContext";

export function TableSales() {
    const { sales, isOpenSales } = useTableSales();

    // States for filters
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedClient, setSelectedClient] = useState<string>("");

    // Function to extract the month from a date in the format DD/MM/YYYY
    const extractMonth = (date: string): string => {
        return date.split("/")[1]; // Returns the month (second part of the date)
    };

    // Filter sales based on selected filters
    const filteredSales = sales.filter((sale) => {
        const matchesCity = selectedCity ? sale.city === selectedCity : true;
        const matchesProduct = selectedProduct ? sale.product === selectedProduct : true;
        const matchesMonth = selectedMonth ? extractMonth(sale.date) === selectedMonth : true;
        const matchesClient = selectedClient ? sale.client === selectedClient : true;

        return matchesCity && matchesProduct && matchesMonth && matchesClient;
    });

    // Get unique values for cities, products, months, and clients
    const uniqueCities = Array.from(new Set(sales.map((s) => s.city)));
    const uniqueProducts = Array.from(new Set(sales.map((s) => s.product)));
    const uniqueMonths = Array.from(new Set(sales.map((s) => extractMonth(s.date))));
    const uniqueClients = Array.from(new Set(sales.map((s) => s.client)));

    // Early return if the table is not open
    if (!isOpenSales) {
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
                    {filteredSales.length > 0 ? (
                        filteredSales.map((sale) => (
                            <tr key={sale.id}>
                                <td>{sale.date}</td>
                                <td>{sale.client}</td>
                                <td>{sale.city}</td>
                                <td>{sale.product}</td>
                                <td>{sale.quantity}</td>
                                <td>R$ {sale.value}</td>
                                <td>{sale.seller}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Nenhuma venda encontrada</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}