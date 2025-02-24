// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Importação correta para React 18+
import './index.css';
import App from './App';
import { createServer, Model } from 'miragejs';

// Criando o servidor com MirageJS
createServer({
  models: {
    sale: Model, // Modelo para vendas
    client: Model,
    product: Model,
    spent: Model,
  },

  seeds(server) {
    server.db.loadData({
      sales: [ // Corrigido o nome da tabela para "sales"
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
      clients: [ // Nome da tabela "clients" mantido
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
      products: [ // Nome da tabela "products" mantido
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

    server.db.loadData({
      spents: [
        {
          id: 1,
          date: '05/01/2025',
          cust: '200',
          name: 'Picole',
          description: 'Custo de producao',
          type: 'Producao',
        },
        {
          id: 2,
          date: '06/02/2025',
          cust: '120',
          name: 'Equipamento',
          description: 'Nova maquina de enformar',
          type: 'Eventual',
        },
      ]
    });
    
  },

  routes() {
    this.namespace = 'api'; // Definindo o namespace para a API
    this.get('/sales', () => {
      return {
        sales: this.schema.all('sale').models, // Retorna todas as vendas
      };
    });

    this.post('/sales', (schema, request) => {
      const data = JSON.parse(request.requestBody); // Obtenha o corpo da solicitação
      return schema.create('sale', data); // Crie uma nova venda com os dados fornecidos
    });

    this.get('/spents', () => {
      return {
        spents: this.schema.all('spent').models, // Retorna todos os gastos
      };
    });

    this.post('/spents', (schema, request) => {
      const data = JSON.parse(request.requestBody); // Obtenha o corpo da solicitação
      return schema.create('spent', data); // Crie um novo gasto com os dados fornecidos
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