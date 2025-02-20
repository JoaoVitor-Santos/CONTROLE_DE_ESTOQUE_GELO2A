import React, { createContext, useState, useContext } from "react";

interface ModalNewProductContextType {
    isOpen: boolean;
    openModalNewProduct: () => void;
    closeModalNewProduct: () => void;
}

const ModalNewProductContext = createContext<ModalNewProductContextType>({
    isOpen: false,
    openModalNewProduct: () => {},
    closeModalNewProduct: () => {},
})

export const ModalNewProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModalNewProduct = () => setIsOpen(true);
    const closeModalNewProduct = () => setIsOpen(false);

    return (
        <ModalNewProductContext.Provider value={{ isOpen, openModalNewProduct, closeModalNewProduct }}>
            {children}
        </ModalNewProductContext.Provider>
    )
}

export const useModalNewProduct = () => {
    const context = useContext(ModalNewProductContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}