import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

// Interfaces
interface Spent {
    id: number; // Adicionado para consistência com SpentEntry
    date: string;
    value: number;
    description: string;
    type: string;
}

type SpentEntry = Omit<Spent, "id">;

// Contexto
interface SpentContextData {
    spents: Spent[];
    createSpent: (spent: SpentEntry) => Promise<void>;
    isOpenSpents: boolean;
    setIsOpenSpents: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderSpentsProps {
    children: React.ReactNode;
}

// Criando o Contexto
const SpentContext = createContext<SpentContextData>({} as SpentContextData);

// Provedor de Gastos
export const TableSpentsProvider: React.FC<ProviderSpentsProps> = ({ children }) => {
    const [spents, setSpents] = useState<Spent[]>([]);
    const [isOpenSpents, setIsOpenSpents] = useState(false);

    // Carregar gastos ao iniciar
    useEffect(() => {
        api.get("/spents").then((response) => {
            const data = response.data.spents || [];
            setSpents(data);
        });
    }, []);

    // Criar novo gasto
    async function createSpent(spent: SpentEntry) {
        const response = await api.post("/spents", spent);
        const data = response.data.spent;
        setSpents([...spents, data]);
    }

    return (
        <SpentContext.Provider value={{ spents, createSpent, isOpenSpents, setIsOpenSpents }}>
            {children}
        </SpentContext.Provider>
    );
};

// Hook para usar o contexto
export function useTableSpents(): SpentContextData {
    const context = useContext(SpentContext);
    if (!context) {
        throw new Error("useTableSpents must be used within a TableSpentsProvider");
    }
    return context;
}