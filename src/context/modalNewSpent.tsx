import React, { createContext, useState, useContext } from "react";

interface ModalNewSpentContextType {
    isOpen: boolean;
    openModalNewSpent: () => void;
    closeModalNewSpent: () => void;
}

const ModalNewSpentContext = createContext<ModalNewSpentContextType>({
    isOpen: false,
    openModalNewSpent: () => {},
    closeModalNewSpent: () => {},
})

export const ModalNewSpentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModalNewSpent = () => setIsOpen(true);
    const closeModalNewSpent = () => setIsOpen(false);

    return (
        <ModalNewSpentContext.Provider value={{ isOpen, openModalNewSpent, closeModalNewSpent }}>
            {children}
        </ModalNewSpentContext.Provider>
    )
}

export const useModalNewSpent = () => {
    const context = useContext(ModalNewSpentContext);
    if (!context) {
        throw new Error('useModalNewSpent must be used within a ModalNewSpentProvider');
    }
    return context;
}