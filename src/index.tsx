// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação correta para React 18+
import './index.css';
import App from './App';
import { createServer, Model } from 'miragejs';

// Criando o servidor com MirageJS
createServer({
  models: {
    transaction: Model, // Modelo para transações
    client: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [ // Corrigido o nome da tabela para "transactions"
        {
          id: 1,
          date: '05/02/2025',
          day: 'Segunda-feira',
          client: 'João Gomes',
          route: 'Rota 01',
          product: 'Gelo',
          quantity: '50 kg',
          value: '200',
          seller: 'Carlos Souza',
        },
        {
          id: 2,
          date: '06/02/2025',
          day: 'Terça-feira',
          client: 'Ana Oliveira',
          route: 'Rota 02',
          product: 'Gelo',
          quantity: '30 kg',
          value: '120',
          seller: 'Roberto Lima',
        },
      ],
    });

    server.db.loadData({
      clients: [ // Corrigido o nome da tabela para "clients"
        {
          id: 1,
          name: 'João Gomes',
          address: 'Rua A, 123',
          phone: '123456789',
          balance: 1000,
        },
        {
          id: 2,
          name: 'Ana Oliveira',
          address: 'Rua B, 456',
          phone: '987654321',
          balance: 2000,
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api'; // Definindo o namespace para a API
    this.get('/transactions', () => {
      return {
        transactions: this.schema.all('transaction').models, // Retorna todas as transações
      };
    });

    this.get('/clients', () => {
      return {
        clients: this.schema.all('client').models, // Retorna todos os clientes
      };
    });
  },
});

// Renderizando o aplicativo (React 18+)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);