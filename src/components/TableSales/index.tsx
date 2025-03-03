import React, { useState } from "react";
import './styles.css';
import { useTableSales } from "../../context/tableSalesContext";

export function TableSales() {
    const { tbSales, isOpenSales } = useTableSales();

    const [CG_CITY_FILTER, setCG_CITY_FILTER] = useState<string>("");
    const [CO_PRODUCT_FILTER, setCO_PRODUCT_FILTER] = useState<string>("");
    const [MONTH_FILTER, setMONTH_FILTER] = useState<string>("");
    const [CO_CLIENT_FILTER, setCO_CLIENT_FILTER] = useState<string>("");

    const extractMonth = (DT_DATE: string): string => {
        return DT_DATE.split("/")[1];
    };

    const filteredSales = tbSales.filter((sale) => {
        const matchesCity = CG_CITY_FILTER ? sale.CG_CITY === CG_CITY_FILTER : true;
        const matchesProduct = CO_PRODUCT_FILTER ? sale.CO_PRODUCT === CO_PRODUCT_FILTER : true;
        const matchesMonth = MONTH_FILTER ? extractMonth(sale.DT_DATE) === MONTH_FILTER : true;
        const matchesClient = CO_CLIENT_FILTER ? sale.CO_CLIENT === CO_CLIENT_FILTER : true;

        return matchesCity && matchesProduct && matchesMonth && matchesClient;
    });

    const uniqueCities = Array.from(new Set(tbSales.map((s) => s.CG_CITY)));
    const uniqueProducts = Array.from(new Set(tbSales.map((s) => s.CO_PRODUCT)));
    const uniqueMonths = Array.from(new Set(tbSales.map((s) => extractMonth(s.DT_DATE))));
    const uniqueClients = Array.from(new Set(tbSales.map((s) => s.CO_CLIENT)));

    if (!isOpenSales) {
        return null;
    }

    return (
        <div className="table-container">
            <div className="filters">
                <div className="filter-item">
                    <label htmlFor="CG_CITY">Filtrar por Cidade:</label>
                    <select
                        id="CG_CITY"
                        className="DropdownFiltersTable"
                        value={CG_CITY_FILTER}
                        onChange={(e) => setCG_CITY_FILTER(e.target.value)}
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
                    <label htmlFor="CO_PRODUCT">Filtrar por Produto:</label>
                    <select
                        id="CO_PRODUCT"
                        className="DropdownFiltersTable"
                        value={CO_PRODUCT_FILTER}
                        onChange={(e) => setCO_PRODUCT_FILTER(e.target.value)}
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
                    <label htmlFor="MONTH">Filtrar por Mês:</label>
                    <select
                        id="MONTH"
                        className="DropdownFiltersTable"
                        value={MONTH_FILTER}
                        onChange={(e) => setMONTH_FILTER(e.target.value)}
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
                    <label htmlFor="CO_CLIENT">Filtrar por Cliente:</label>
                    <select
                        id="CO_CLIENT"
                        className="DropdownFiltersTable"
                        value={CO_CLIENT_FILTER}
                        onChange={(e) => setCO_CLIENT_FILTER(e.target.value)}
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
                            <tr key={sale.CO_ID}>
                                <td>{sale.DT_DATE}</td>
                                <td>{sale.CO_CLIENT}</td>
                                <td>{sale.CG_CITY}</td>
                                <td>{sale.CO_PRODUCT}</td>
                                <td>{sale.CD_QUANTITY}</td>
                                <td>R$ {sale.VL_VALUE}</td>
                                <td>{sale.CO_SELLER}</td>
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