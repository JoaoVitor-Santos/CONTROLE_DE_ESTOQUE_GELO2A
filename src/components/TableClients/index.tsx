import React, { useState } from "react";
import './styles.css';
import { useTableClients } from "../../context/tableClientsContext";

export function TableClients() {
    const { tbClients, isOpenClients } = useTableClients();
    const [CG_CITY_FILTER, setCG_CITY_FILTER] = useState("");
    const [BALANCE_TYPE_FILTER, setBALANCE_TYPE_FILTER] = useState("");

    if (!isOpenClients) {
        return null;
    }

    const formatBalance = (VL_BALANCE: number | string): string => {
        // Converte VL_BALANCE para número, tratando possíveis strings
        const balanceNumber = typeof VL_BALANCE === "string" ? parseFloat(VL_BALANCE) : VL_BALANCE;

        if (isNaN(balanceNumber)) {
            return "R$ 0.00"; // Caso a conversão falhe, retorna 0
        }

        if (balanceNumber > 0) {
            return `+ R$ ${balanceNumber.toFixed(2)}`;
        } else if (balanceNumber < 0) {
            return `- R$ ${Math.abs(balanceNumber).toFixed(2)}`;
        } else {
            return `R$ 0.00`;
        }
    };

    const filteredClients = tbClients.filter((client) => {
        const matchesCity = CG_CITY_FILTER ? client.CG_CITY === CG_CITY_FILTER : true;
        // Converte VL_BALANCE para número no filtro também
        const balanceNumber = typeof client.VL_BALANCE === "string" ? parseFloat(client.VL_BALANCE) : client.VL_BALANCE;
        const matchesBalanceType =
            BALANCE_TYPE_FILTER === "positive"
                ? balanceNumber > 0
                : BALANCE_TYPE_FILTER === "negative"
                ? balanceNumber < 0
                : true;

        return matchesCity && matchesBalanceType;
    });

    const uniqueCities = Array.from(new Set(tbClients.map((client) => client.CG_CITY)));

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
                    <label htmlFor="BALANCE_TYPE">Filtrar por Saldo:</label>
                    <select
                        id="BALANCE_TYPE"
                        className="DropdownFiltersTable"
                        value={BALANCE_TYPE_FILTER}
                        onChange={(e) => setBALANCE_TYPE_FILTER(e.target.value)}
                    >
                        <option value="">Todos os saldos</option>
                        <option value="positive">Saldo Positivo</option>
                        <option value="negative">Saldo Negativo</option>
                    </select>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.length > 0 ? (
                        filteredClients.map((client) => (
                            <tr key={client.CO_ID}>
                                <td>{client.CO_NAME}</td>
                                <td>{client.CO_PHONE}</td>
                                <td>{client.CG_ADDRESS}</td>
                                <td>{client.CG_CITY}</td>
                                <td>{formatBalance(client.VL_BALANCE)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>Nenhum cliente encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}