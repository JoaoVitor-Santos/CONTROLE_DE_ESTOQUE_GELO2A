import React from 'react';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { Table } from './components/Table';
import { ModalProvider } from './context/ModalContext';
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
                <Table children={<></>} />
            </div>
        </div>
    );
}

export default function RootApp() {
    return (
        <ModalProvider>
            <App />
        </ModalProvider>
    );
}