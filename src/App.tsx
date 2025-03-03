import React from 'react';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { TableSales } from './components/TableSales';
import { TableClients } from './components/TableClients';
import { TableProducts } from './components/TableProducts';
import { FinanceControl } from './components/FinanceControl';
import { FinanceControlProvider, useFinanceControl } from './context/FinanceControlContext';
import { ModalNewClientProvider } from './context/modalNewClientContext';
import { ModalNewProductProvider } from './context/modalNewProductContext';
import { ModalNewSaleProvider } from './context/modalNewSaleContext';
import { ModalNewSpentProvider } from './context/modalNewSpent';
import { TableSalesProvider, useTableSales } from './context/tableSalesContext';
import { TableClientsProvider, useTableClients } from './context/tableClientsContext';
import { TableProductsProvider, useTableProducts } from './context/tableProductsContext';
import { TableSpentsProvider, useTableSpents } from './context/tableSpentContext';
import { ModalNewClient } from './components/ModalNewClient';
import { ModalNewProduct } from './components/ModalNewProduct/ModalNewProduct';
import { ModalNewSale } from './components/ModalNewSale';
import { ModalNewSpent } from './components/ModalNewSpent';
import './styles/global.css';

function App() {
    const { setIsOpenSales } = useTableSales();
    const { setIsOpenClients } = useTableClients();
    const { setIsOpenProducts } = useTableProducts();
    const { setIsOpenFinanceControl } = useFinanceControl(); // Adicionado para controlar FinanceControl

    return (
        <div className="App">
            <TopBar title="Controle de Estoque e Finanças" />
            <SideBar 
                title="Menu" 
                setIsOpenSales={setIsOpenSales} 
                setIsOpenClients={setIsOpenClients} 
                setIsOpenProducts={setIsOpenProducts} 
                setIsOpenFinanceControl={setIsOpenFinanceControl} // Corrigido para usar setIsOpenFinanceControl
            />
            <ModalNewClient />
            <ModalNewProduct />
            <ModalNewSale />
            <ModalNewSpent />
            <div id='content'>
                <TableSales />
                <TableClients />
                <TableProducts />
                <FinanceControl />
            </div>
        </div>
    );
}

export default function RootApp() {
    return (
        <ModalNewClientProvider> 
            <ModalNewProductProvider>
                <ModalNewSaleProvider>
                    <ModalNewSpentProvider>
                        <TableSalesProvider>
                            <TableClientsProvider>
                                <TableProductsProvider>
                                    <TableSpentsProvider>
                                        <FinanceControlProvider>
                                            <App />
                                        </FinanceControlProvider>
                                    </TableSpentsProvider>
                                </TableProductsProvider>
                            </TableClientsProvider>
                        </TableSalesProvider>
                    </ModalNewSpentProvider>
                </ModalNewSaleProvider>
            </ModalNewProductProvider>
        </ModalNewClientProvider>
    );
}