import React from 'react';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { TableTransactions } from './components/TableTransactions';
import { ModalProvider } from './context/modalNewClientContext';
import { TableProvider } from './context/tableTransactionsContext';
import { ModalNewClient } from './components/ModalNewClient';
import './styles/global.css';

function App() {
    return (
        <div className="App">
            <TopBar title="Controle de Estoque e Finanças" />
            <SideBar title="Menu" />

            {/* Renderiza o modal */}
            <ModalNewClient />

            <div id='content'>
                <TableTransactions />
            </div>
        </div>
    );
}

export default function RootApp() {
    return (
        <ModalProvider>
            <TableProvider>
                <App />
            </TableProvider>
        </ModalProvider>
    );
}