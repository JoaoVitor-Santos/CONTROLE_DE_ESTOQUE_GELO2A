import React from "react";
import './styles.css';

// Interface para os dados dos clientes
interface Client {
  id: number;
  name: string;
  city: string;
  balance: number;
}

// Dados estáticos para preencher a tabela
const clientsData: Client[] = [
  { id: 1, name: "João Silva", city: "São Paulo", balance: 1500.5 },
  { id: 2, name: "Maria Oliveira", city: "Rio de Janeiro", balance: 2300.75 },
  { id: 3, name: "Carlos Santos", city: "Belo Horizonte", balance: 800.0 },
  { id: 4, name: "Ana Pereira", city: "Curitiba", balance: 3000.0 },
];

// Componente da tabela de clientes
export function ClientsTable() {
  return (
    <div id="content">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {clientsData.length > 0 ? (
            clientsData.map((client) => (
              <tr key={client.id}>
                <td data-label="Nome">{client.name}</td>
                <td data-label="Cidade">{client.city}</td>
                <td data-label="Saldo">R$ {client.balance.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>Nenhum cliente encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}