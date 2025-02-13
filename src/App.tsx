import React from 'react';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { TableTransactions } from './components/TableTransactions';
import { TableClients } from './components/TableClients';
import { ModalProvider } from './context/modalNewClientContext';
import { TableTransactionsProvider, useTableTransactions } from './context/tableTransactionsContext';
import { TableClientsProvider, useTableClients } from './context/tableClientsContext';
import { ModalNewClient } from './components/ModalNewClient';
import './styles/global.css';

function App() {
    const { setIsOpenTransactions} = useTableTransactions(); // Obtendo a função setIsOpen
    const { setIsOpenClients } = useTableClients();

    return (
        <div className="App">
            <TopBar title="Controle de Estoque e Finanças" />
            {/* Passando setIsOpen para o SideBar */}
            <SideBar title="Menu" setIsOpenTransactions={setIsOpenTransactions} setIsOpenClients={setIsOpenClients} />
            <ModalNewClient />
            <div id='content'>
                <TableTransactions /> {/* Renderiza a tabela com base no estado */}
                <TableClients />
            </div>
        </div>
    );
}

export default function RootApp() {
    return (
        <ModalProvider>
            <TableTransactionsProvider>
                <TableClientsProvider>
                    <App />
                </TableClientsProvider>
            </TableTransactionsProvider>
        </ModalProvider>
    );
}
