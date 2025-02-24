import React, { createContext, useState, useContext } from "react";

interface ModalNewSaleContexType {
    isOpen: boolean;
    openModalNewSale: () => void;
    closeModalNewSale: () => void;
}

const ModalNewSaleContext = createContext<ModalNewSaleContexType>({
    isOpen: false,
    openModalNewSale: () => {},
    closeModalNewSale: () => {},
})

export const ModalNewSaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModalNewSale = () => setIsOpen(true);
    const closeModalNewSale = () => setIsOpen(false);

    return (
        <ModalNewSaleContext.Provider value={{ isOpen, openModalNewSale, closeModalNewSale }}>
            {children}
        </ModalNewSaleContext.Provider>
    )
}

export const useModalNewSale = () => {
    const context = useContext(ModalNewSaleContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}