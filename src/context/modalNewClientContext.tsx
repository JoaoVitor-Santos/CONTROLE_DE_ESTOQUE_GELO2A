// src/context/ModalContext.tsx
import React, { createContext, useState, useContext } from "react";

interface ModalNewClientContextType {
    isOpen: boolean;
    openModalNewClient: () => void;
    closeModalNewClient: () => void;
}

const ModalNewClientContext = createContext<ModalNewClientContextType | undefined>(undefined);

export const ModalNewClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModalNewClient = () => setIsOpen(true);
    const closeModalNewClient = () => setIsOpen(false);



    return (
        <ModalNewClientContext.Provider value={{ isOpen, openModalNewClient, closeModalNewClient }}>
            {children}
        </ModalNewClientContext.Provider>
    );
};

export const useModalNewClient = () => {
    const context = useContext(ModalNewClientContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};