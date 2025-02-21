import React, { useState } from "react";
import './styles.css';
import { useTableClients } from "../../context/tableClientsContext";

export function TableClients() {
    const { clients, isOpenClients } = useTableClients();
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBalanceType, setSelectedBalanceType] = useState("");

    if (!isOpenClients) {
        return null;
    }

    const formatBalance = (balance: number): string => {
        if (balance > 0) {
            return `+ R$ ${balance.toFixed(2)}`;
        } else if (balance < 0) {
            return `- R$ ${Math.abs(balance).toFixed(2)}`;
        } else {
            return `R$ 0.00`;
        }
    };

    const filteredClients = clients.filter((client) => {
        const matchesCity = selectedCity ? client.city === selectedCity : true;
        const matchesBalanceType =
            selectedBalanceType === "positive"
                ? client.balance > 0
                : selectedBalanceType === "negative"
                ? client.balance < 0
                : true;

        return matchesCity && matchesBalanceType;
    });

    const uniqueCities = Array.from(new Set(clients.map((client) => client.city)));

    return (
        <div className="table-container">
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
                    <label htmlFor="balance-type">Filtrar por Saldo:</label>
                    <select
                        id="balance-type"
                        className="DropdownFiltersTable"
                        value={selectedBalanceType}
                        onChange={(e) => setSelectedBalanceType(e.target.value)}
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
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.phone}</td>
                                <td>{client.address}</td>
                                <td>{client.city}</td>
                                <td>{formatBalance(client.balance)}</td>
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