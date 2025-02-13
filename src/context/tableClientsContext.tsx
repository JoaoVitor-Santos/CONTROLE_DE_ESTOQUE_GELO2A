import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

// Interfaces
interface Client {
    id: number;
    name: string;
    balance: number;
    phone: string;
    address: string;
}

type ClientEntry = Omit<Client, "id">;

interface ClientsContextData {
    clients: Client[];
    createClient: (client: ClientEntry) => Promise<void>;
    isOpenClients: boolean;
    setIsOpenClients: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderClientsProps {
    children: React.ReactNode;
}

const ClientsContext = createContext<ClientsContextData>({} as ClientsContextData);

// Provedor de Clientes
export const TableClientsProvider: React.FC<ProviderClientsProps> = ({ children }) => {
    const [clients, setClients] = useState<Client[]>([]);
    const [isOpenClients, setIsOpenClients] = useState(false);

    // Carregar clientes ao iniciar
    useEffect(() => {
        api.get("/clients").then((response) => {
            const data = response.data.clients || [];
            setClients(data);
        });
    }, []);

    // Criar novo cliente
    async function createClient(client: ClientEntry) {
        const response = await api.post("/clients", client);
        const data = response.data.client;
        setClients([...clients, data]);
    }

    return (
        <ClientsContext.Provider value={{ clients, createClient, isOpenClients, setIsOpenClients }}>
            {children}
        </ClientsContext.Provider>
    )
};

export function useTableClients() {
    const context = useContext(ClientsContext);
    if (!context) {
        throw new Error("useClients must be used within a ClientsProvider");
    }
    return context;
}