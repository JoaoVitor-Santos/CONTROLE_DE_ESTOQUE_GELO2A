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
                </tr>
            </thead>
            <tbody>
                {clients.map((client) => (
                    <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.phone}</td>
                        <td>{client.address}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}