import React from "react";
import './styles.css';
import { useTableClients } from "../../context/tableClientsContext";

export function TableClients() {
    const { clients } = useTableClients(); // Use o hook useClients para obter os clientes
    const { isOpenClients } = useTableClients(); // Use o hook useClients para obter isOpenClients e setIsOpenClients
    
    if (!isOpenClients) {
        return null; // Se a tabela não estiver aberta, retorna null
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>Saldo</th>
                </tr>
            </thead>
            <tbody>
            {clients.map((client) => {
                // Função para formatar o saldo
                const formatBalance = (balance: number): string => {
                    if (balance > 0) {
                        return `+ R$ ${balance.toFixed(2)}`; // Para valores positivos
                    } else if (balance < 0) {
                        return `- R$ ${Math.abs(balance).toFixed(2)}`; // Para valores negativos
                    } else {
                        return `R$ 0.00`; // Para saldo zero
                    }
                };

                return (
                    <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td>{client.address}</td>
                        <td>{formatBalance(client.balance)}</td> {/* Usa a função para formatar */}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}