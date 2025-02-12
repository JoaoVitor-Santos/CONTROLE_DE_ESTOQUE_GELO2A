// src/components/TableTransactions/index.tsx
import React from "react";
import './styles.css';
import { useTable } from "../../context/tableTransactionsContext";

export function TableTransactions() {
    const { isOpen } = useTable();

    // Se a tabela não estiver aberta, retorna null
    if (!isOpen) return null;

    return (
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Dia</th>
                    <th>Cliente</th>
                    <th>Rota</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Vendedor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label="Data">05/02/2025</td>
                    <td data-label="Dia">Segunda-feira</td>
                    <td data-label="Cliente">João da Silva</td>
                    <td data-label="Rota">Rota 01</td>
                    <td data-label="Produto">Gelo</td>
                    <td data-label="Quantidade">50 kg</td>
                    <td data-label="Valor">R$ 200,00</td>
                    <td data-label="Vendedor">Carlos Souza</td>
                </tr>
                <tr>
                    <td data-label="Data">06/02/2025</td>
                    <td data-label="Dia">Terça-feira</td>
                    <td data-label="Cliente">Ana Oliveira</td>
                    <td data-label="Rota">Rota 02</td>
                    <td data-label="Produto">Gelo</td>
                    <td data-label="Quantidade">30 kg</td>
                    <td data-label="Valor">R$ 120,00</td>
                    <td data-label="Vendedor">Roberto Lima</td>
                </tr>
            </tbody>
        </table>
    );
}