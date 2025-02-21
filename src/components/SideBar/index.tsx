import React, { useState } from "react";
import { useModalNewClient } from "../../context/modalNewClientContext";
import { useModalNewProduct } from "../../context/modalNewProductContext";
import { useModalNewTransaction } from "../../context/modalNewTransactionContext";
import './styles.css';

interface SideBarProps {
    title: string;
    setIsOpenTransactions: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenClients: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideBar({ title, setIsOpenTransactions, setIsOpenClients, setIsOpenProducts }: SideBarProps) {
    // Estado para rastrear o botão ativo
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const { openModalNewClient } = useModalNewClient();
    const { openModalNewProduct } = useModalNewProduct();
    const { openModalNewTransaction } = useModalNewTransaction();

    const handleListClients = () => {
        console.log("Listando clientes...");
        setIsOpenTransactions(false);
        setIsOpenProducts(false);
        setIsOpenClients(true);
        setActiveButton("listClients"); // Define o botão "Listar Clientes" como ativo
    };

    const handleListProducts = () => {
        console.log("Listando produtos...");
        setIsOpenTransactions(false);
        setIsOpenClients(false);
        setIsOpenProducts(true);
        setActiveButton("listProducts"); // Define o botão "Listar Produtos" como ativo
    };

    const handleListTransactions = () => {
        console.log("Listando transações...");
        setIsOpenClients(false);
        setIsOpenProducts(false);
        setIsOpenTransactions(true);
        setActiveButton("listTransactions"); // Define o botão "Listar Transações" como ativo
    };

    const handleFinanceControl = () => {
        setIsOpenClients(false);
        setIsOpenProducts(false);
        setIsOpenTransactions(false);
        setActiveButton("financeControl"); // Define o botão "Controle Financeiro" como ativo
    };
    return (
        <div id="side-bar">
            <h1>{title}</h1>
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
            {/* Botão para listar clientes */}
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
            {/* Botão para listar produtos */}
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
            {/* Botão para listar transações */}
            <button
                id="listTransactions"
                onClick={handleListTransactions}
                className={activeButton === "listTransactions" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Listar Transações
            </button>
            <button
                id="registerTransaction"
                onClick={() => openModalNewTransaction()}
                className={activeButton === "registerTransaction" ? "active" : ""}
            >
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Cadastrar Transação
            </button>
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
                &copy; 2023 Controle de Estoque
            </footer>
        </div>
    );
}