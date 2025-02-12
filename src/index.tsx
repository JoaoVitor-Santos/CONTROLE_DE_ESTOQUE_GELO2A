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
  },

  seeds(server) {
    server.db.loadData({
      transactions: [ // Corrigido o nome da tabela para "transactions"
        {
          id: 1,
          date: '05/02/2025',
          day: 'Segunda-feira',
          client: 'João da Silva',
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
  },

  routes() {
    this.namespace = 'api'; // Definindo o namespace para a API
    this.get('/transactions', () => {
      return {
        transactions: this.schema.all('transaction').models, // Retorna todas as transações
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