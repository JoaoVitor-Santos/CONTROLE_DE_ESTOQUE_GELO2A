import React, { useState } from "react";
import { useModalNewClient } from "../../context/modalNewClientContext";
import { useModalNewProduct } from "../../context/modalNewProductContext";
import { useModalNewSale } from "../../context/modalNewSaleContext";
import { useModalNewSpent } from "../../context/modalNewSpent";
import './styles.css';

interface SideBarProps {
    title: string;
    setIsOpenSales: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenClients: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideBar({ title, setIsOpenSales, setIsOpenClients, setIsOpenProducts }: SideBarProps) {
    // Estado para rastrear o botão ativo
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const { openModalNewClient } = useModalNewClient();
    const { openModalNewProduct } = useModalNewProduct();
    const { openModalNewSale } = useModalNewSale();
    const { openModalNewSpent } = useModalNewSpent();

    const handleListClients = () => {
        console.log("Listando clientes...");
        setIsOpenSales(false);
        setIsOpenProducts(false);
        setIsOpenClients(true);
        setActiveButton("listClients");
    };

    const handleListProducts = () => {
        console.log("Listando produtos...");
        setIsOpenSales(false);
        setIsOpenClients(false);
        setIsOpenProducts(true);
        setActiveButton("listProducts");
    };

    const handleListSales = () => {
        console.log("Listando vendas...");
        setIsOpenClients(false);
        setIsOpenProducts(false);
        setIsOpenSales(true);
        setActiveButton("listSales");
    };

    const handleFinanceControl = () => {
        setIsOpenClients(false);
        setIsOpenProducts(false);
        setIsOpenSales(false);
        setActiveButton("financeControl");
    };

    return (
        <div id="side-bar">
            <h1>{title}</h1>

            {/* Botões de Cadastro */}
            <button
                id="registerClient"
                onClick={() => openModalNewClient()}
                className={activeButton === "registerClient" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Cadastrar Cliente
            </button>
            <button
                id="registerProduct"
                onClick={() => openModalNewProduct()}
                className={activeButton === "registerProduct" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Cadastrar Produto
            </button>
            <button
                id="registerSale"
                onClick={() => openModalNewSale()}
                className={activeButton === "registerSale" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Cadastrar Venda
            </button>
            <button
                id="registerSpent"
                onClick={() => openModalNewSpent()}
                className={activeButton === "registerSpent" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Cadastrar Despesa
            </button>

            {/* Botões de Listagem */}
            <button
                id="listClients"
                onClick={handleListClients}
                className={activeButton === "listClients" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12c0-4.41 3.59-8 8-8 1.85 0 3.55.63 4.9 1.69L21 4v16H7c-1.1 0-2-.9-2-2V12zm9 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
                Listar Clientes
            </button>
            <button
                id="listProducts"
                onClick={handleListProducts}
                className={activeButton === "listProducts" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12c0-4.41 3.59-8 8-8 1.85 0 3.55.63 4.9 1.69L21 4v16H7c-1.1 0-2-.9-2-2V12zm9 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
                Listar Produtos
            </button>
            <button
                id="listSales"
                onClick={handleListSales}
                className={activeButton === "listSales" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Listar Vendas
            </button>

            {/* Botão de Controle Financeiro */}
            <button
                id="financeControl"
                onClick={handleFinanceControl}
                className={activeButton === "financeControl" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Controle Financeiro
            </button>

            <footer>
                © 2023 Controle de Estoque
            </footer>
        </div>
    );
}