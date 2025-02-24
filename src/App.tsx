import React from 'react';
import { TopBar } from './components/TopBar';
import { SideBar } from './components/SideBar';
import { TableSales } from './components/TableSales';
import { TableClients } from './components/TableClients';
import { TableProducts } from './components/TableProducts';
import { ModalNewClientProvider } from './context/modalNewClientContext';
import { ModalNewProductProvider } from './context/modalNewProductContext';
import { ModalNewSaleProvider } from './context/modalNewSaleContext';
import { ModalNewSpentProvider } from './context/modalNewSpent'; // Novo provider para despesas
import { TableSalesProvider, useTableSales } from './context/tableSalesContext';
import { TableClientsProvider, useTableClients } from './context/tableClientsContext';
import { TableProductsProvider, useTableProducts } from './context/tableProductsContext';
import { ModalNewClient } from './components/ModalNewClient';
import { ModalNewProduct } from './components/ModalNewProduct/ModalNewProduct';
import { ModalNewSale } from './components/ModalNewSale';
import { ModalNewSpent } from './components/ModalNewSpent'; // Importando o novo modal
import './styles/global.css';

function App() {
    const { setIsOpenSales } = useTableSales(); // Obtendo a função setIsOpen
    const { setIsOpenClients } = useTableClients();
    const { setIsOpenProducts } = useTableProducts();

    return (
        <div className="App">
            <TopBar title="Controle de Estoque e Finanças" />
            {/* Passando setIsOpen para o SideBar */}
            <SideBar 
                title="Menu" 
                setIsOpenSales={setIsOpenSales} 
                setIsOpenClients={setIsOpenClients} 
                setIsOpenProducts={setIsOpenProducts} 
            />
            {/* Renderizando todos os modais */}
            <ModalNewClient />
            <ModalNewProduct />
            <ModalNewSale />
            <ModalNewSpent /> {/* Novo modal para despesas */}
            <div id='content'>
                <TableSales /> {/* Renderiza a tabela com base no estado */}
                <TableClients />
                <TableProducts />
            </div>
        </div>
    );
}

export default function RootApp() {
    return (
        <ModalNewClientProvider> 
            <ModalNewProductProvider>
                <ModalNewSaleProvider>
                    <ModalNewSpentProvider> {/* Provider para despesas */}
                        <TableSalesProvider>
                            <TableClientsProvider>
                                <TableProductsProvider>
                                    <App />
                                </TableProductsProvider>
                            </TableClientsProvider>
                        </TableSalesProvider>
                    </ModalNewSpentProvider>
                </ModalNewSaleProvider>
            </ModalNewProductProvider>
        </ModalNewClientProvider>
    );
}