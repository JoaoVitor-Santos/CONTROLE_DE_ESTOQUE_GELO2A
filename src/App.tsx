import React from 'react';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { TableTransactions } from './components/TableTransactions';
import { ModalProvider } from './context/modalNewClientContext';
import { TableProvider, useTable } from './context/tableTransactionsContext';
import { ModalNewClient } from './components/ModalNewClient';
import './styles/global.css';

function App() {
    const { setIsOpen } = useTable(); // Obtendo a função setIsOpen

    return (
        <div className="App">
            <TopBar title="Controle de Estoque e Finanças" />
            {/* Passando setIsOpen para o SideBar */}
            <SideBar title="Menu" setIsOpen={setIsOpen} />
            <ModalNewClient />
            <div id='content'>
                <TableTransactions /> {/* Renderiza a tabela com base no estado */}
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
