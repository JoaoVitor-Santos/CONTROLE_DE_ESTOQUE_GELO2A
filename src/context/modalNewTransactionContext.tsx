import React, { createContext, useState, useContext } from "react";

interface ModalNewTransactionContexType {
    isOpen: boolean;
    openModalNewTransaction: () => void;
    closeModalNewTransaction: () => void;
}

const ModalNewTransactionContext = createContext<ModalNewTransactionContexType>({
    isOpen: false,
    openModalNewTransaction: () => {},
    closeModalNewTransaction: () => {},
})

export const ModalNewTransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModalNewTransaction = () => setIsOpen(true);
    const closeModalNewTransaction = () => setIsOpen(false);

    return (
        <ModalNewTransactionContext.Provider value={{ isOpen, openModalNewTransaction, closeModalNewTransaction }}>
            {children}
        </ModalNewTransactionContext.Provider>
    )
}

export const useModalNewTransaction = () => {
    const context = useContext(ModalNewTransactionContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}