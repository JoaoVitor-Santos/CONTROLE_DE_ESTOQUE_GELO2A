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
    product: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [ // Corrigido o nome da tabela para "transactions"
        {
          id: 1,
          date: '05/01/2025',
          client: 'João Gomes',
          city: 'Iuna',
          product: 'Gelo',
          quantity: '50 kg',
          value: '200',
          seller: 'Carlos Souza',
        },
        {
          id: 2,
          date: '06/02/2025',
          client: 'Ana Oliveira',
          city: 'Lajinha',
          product: 'Picole',
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
          name: 'João Vitor',
          address: 'Rua A, 123',
          city: 'Iuna',
          phone: '(33) 8412-1234',
          balance: 1000,
        },
        {
          id: 2,
          name: 'Maria',
          address: 'Rua B, 456',
          city: 'Lajinha',
          phone: '(45) 1234-5678',
          balance: 2000,
        },
      ],
    });

    server.db.loadData({
      products: [ // Corrigido o nome da tabela para "clients"
        {
          id: 1,
          name: 'Gelo',
          quantity: 100,
          value: 10,
          description: 'Gelo de agua',
        },
        {
          id: 2,
          name: 'Picole',
          quantity: 200,
          value: 2,
          description: 'Picole de agua',
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

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody); // Obtenha o corpo da solicitação
      return schema.create('transaction', data); // Crie uma nova transação com os dados fornecidos
    });

    this.get('/clients', () => {
      return {
        clients: this.schema.all('client').models, // Retorna todos os clientes
      };
    });

    this.post('/clients', (schema, request) => {
      const data = JSON.parse(request.requestBody); // Obtenha o corpo da solicitação
      return schema.create('client', data); // Crie um novo cliente com os dados fornecidos
    });

    this.get('/products', () => {
      return {
        products: this.schema.all('product').models, // Retorna todos os produtos
      };
    });

    this.post('/products', (schema, request) => {
      const data = JSON.parse(request.requestBody); // Obtenha o corpo da solicitação
      return schema.create('product', data); // Crie um novo produto com os dados fornecidos
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