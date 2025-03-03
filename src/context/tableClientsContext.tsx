import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

interface Client {
    CO_ID: number;
    CO_NAME: string;
    VL_BALANCE: number;
    CO_PHONE: string;
    CG_ADDRESS: string;
    CG_CITY: string;
}

type ClientEntry = Omit<Client, "CO_ID">;

interface ClientsContextData {
    tbClients: Client[];
    createClient: (client: ClientEntry) => Promise<void>;
    isOpenClients: boolean;
    setIsOpenClients: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderClientsProps {
    children: React.ReactNode;
}

const ClientsContext = createContext<ClientsContextData>({} as ClientsContextData);

export const TableClientsProvider: React.FC<ProviderClientsProps> = ({ children }) => {
    const [tbClients, setTbClients] = useState<Client[]>([]);
    const [isOpenClients, setIsOpenClients] = useState(false);

    useEffect(() => {
        api.get("/clients").then((response) => {
            const data = response.data.tbClients || [];
            console.log("resposta da api", data);
            setTbClients(data);
        });
    }, []);

    async function createClient(client: ClientEntry) {
        const response = await api.post("/clients", client);
        const data = response.data.client;
        setTbClients([...tbClients, data]);
    }

    return (
        <ClientsContext.Provider value={{ tbClients, createClient, isOpenClients, setIsOpenClients }}>
            {children}
        </ClientsContext.Provider>
    );
};

export function useTableClients(): ClientsContextData {
    const context = useContext(ClientsContext);
    if (!context) {
        throw new Error("useTableClients must be used within a TableClientsProvider");
    }
    return context;
}