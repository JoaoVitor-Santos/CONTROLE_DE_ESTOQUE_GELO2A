import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

interface Spent {
    CO_ID: number;
    DT_DATE: string;
    VL_VALUE: number;
    CO_DESCRIPTION: string;
    CO_TYPE: string;
}

type SpentEntry = Omit<Spent, "CO_ID">;

interface SpentContextData {
    tbSpents: Spent[];
    createSpent: (spent: SpentEntry) => Promise<void>;
    isOpenSpents: boolean;
    setIsOpenSpents: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderSpentsProps {
    children: React.ReactNode;
}

const SpentContext = createContext<SpentContextData>({} as SpentContextData);

export const TableSpentsProvider: React.FC<ProviderSpentsProps> = ({ children }) => {
    const [tbSpents, setTbSpents] = useState<Spent[]>([]);
    const [isOpenSpents, setIsOpenSpents] = useState(false);

    useEffect(() => {
        api.get("/spents").then((response) => {
            const data = response.data.tbSpents || [];
            setTbSpents(data);
        });
    }, []);

    async function createSpent(spent: SpentEntry) {
        const response = await api.post("/spents", spent);
        const data = response.data.spent;
        setTbSpents([...tbSpents, data]);
    }

    return (
        <SpentContext.Provider value={{ tbSpents, createSpent, isOpenSpents, setIsOpenSpents }}>
            {children}
        </SpentContext.Provider>
    );
};

export function useTableSpents(): SpentContextData {
    const context = useContext(SpentContext);
    if (!context) {
        throw new Error("useTableSpents must be used within a TableSpentsProvider");
    }
    return context;
}