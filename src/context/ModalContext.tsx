// src/context/ModalContext.tsx
import React, { createContext, useState, useContext } from "react";

interface ModalContextType {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    registerClient: (clientData: { name: string; email: string; phone: string }) => Promise<void>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const registerClient = async (clientData: { name: string; email: string; phone: string }) => {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                console.log("Dados enviados para a API:", clientData); // Exibe os dados no console
                alert(`Cliente cadastrado!\n\nNome: ${clientData.name}\nEmail: ${clientData.email}\nTelefone: ${clientData.phone}`);
                resolve();
            }, 1000); 
        });
    };

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, registerClient }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};