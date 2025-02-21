import React, { createContext, useState, useContext } from "react";

interface FinanceControlContextData{
    isOpenFinanceControl: boolean;
    setIsOpenFinanceControl: React.Dispatch<React.SetStateAction<boolean>>;
}

const FinanceControlContext = createContext<FinanceControlContextData>({} as FinanceControlContextData);

export const FinanceControlProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpenFinanceControl, setIsOpenFinanceControl] = useState(false);

    return (
        <FinanceControlContext.Provider value={{ isOpenFinanceControl, setIsOpenFinanceControl }}>
            {children}
        </FinanceControlContext.Provider>
    );
};

export function useFinanceControl(): FinanceControlContextData {
    const context = useContext(FinanceControlContext);
    if (!context) {
        throw new Error("useFinanceControl must be used within a FinanceControlProvider");
    }
    return context;
}