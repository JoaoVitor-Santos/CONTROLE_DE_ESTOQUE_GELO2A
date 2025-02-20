import React, { useState } from "react"; // Certifique-se de importar useState
import './styles.css';
import { useTableTransactions } from "../../context/tableTransactionsContext";


export function TableTransactions() {
    const { transactions } = useTableTransactions(); // Desestruture o objeto retornado pelo hook
    const { isOpenTransactions } = useTableTransactions();

    if (!isOpenTransactions) {
        return null; // Se a tabela não estiver aberta, retorna null
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Cliente</th>
                    <th>Rota</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Valor</th>
                    <th>Vendedor</th>
                </tr>
            </thead>
            <tbody>
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.client}</td>
                            <td>{transaction.route}</td>
                            <td>{transaction.product}</td>
                            <td>{transaction.quantity}</td>
                            <td>{transaction.value}</td>
                            <td>{transaction.seller}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={8}>Nenhuma transação encontrada</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
