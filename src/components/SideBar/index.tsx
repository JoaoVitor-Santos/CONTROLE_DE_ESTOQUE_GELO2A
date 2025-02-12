// src/components/SideBar/index.tsx
import React from "react";
import './styles.css';

interface SideBarProps {
    title: string;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Função para alterar o estado
}

export function SideBar({ title, setIsOpen }: SideBarProps) {

    const handleListClients = () => {
        console.log("Listando clientes...");
        setIsOpen(false); // Fecha a tabela ao listar clientes
    };

    const handleListProducts = () => {
        console.log("Listando produtos...");
        setIsOpen(false); // Fecha a tabela ao listar produtos
    };

    const handleListTransactions = () => {
        console.log("Listando transações...");
        setIsOpen(true); // Abre a tabela ao listar transações
    };

    return (
        <div id="side-bar">
            <h1>{title}</h1>
            <button id="registerClient">
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Cadastrar Cliente
            </button>
            <button id="registerProduct">
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Cadastrar Produto
            </button>
            {/* Botão para listar clientes e fechar a tabela de transactions */}
            <button id="listClients" onClick={handleListClients}>
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12c0-4.41 3.59-8 8-8 1.85 0 3.55.63 4.9 1.69L21 4v16H7c-1.1 0-2-.9-2-2V12zm9 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
                Listar Clientes
            </button>
            {/* Botão para listar produtos e fechar a tabela de transactions */}
            <button id="listProducts" onClick={handleListProducts}>
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12c0-4.41 3.59-8 8-8 1.85 0 3.55.63 4.9 1.69L21 4v16H7c-1.1 0-2-.9-2-2V12zm9 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
                Listar Produtos
            </button>
            {/* Botão para listar transações e abrir a tabela */}
            <button id="listTransactions" onClick={handleListTransactions}>
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Listar Transações
            </button>
            <button id="registerTransaction">
                <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v5h-2zm-1 8h2v2h-2z" />
                </svg>
                Cadastrar Transação
            </button>
            <footer>
                &copy; 2023 Controle de Estoque
            </footer>
        </div>
    );
}
