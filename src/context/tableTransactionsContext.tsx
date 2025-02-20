import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

// Interfaces
interface Transaction {
  id: number;
  date: string;
  client: string;
  route: string;
  product: string;
  quantity: number;
  value: number;
  seller: string;
}

type TransactionEntry = Omit<Transaction, "id">;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionEntry) => Promise<void>;
  isOpenTransactions: boolean;
  setIsOpenTransactions: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderTransactionsProps {
  children: React.ReactNode;
}

const TableContext = createContext<TransactionsContextData>({} as TransactionsContextData);

// Provedor de Transações
export const TableTransactionsProvider: React.FC<ProviderTransactionsProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isOpenTransactions, setIsOpenTransactions] = useState(false);

  // Carregar transações ao iniciar
  useEffect(() => {
    api.get("/transactions").then((response) => {
      const data = response.data.transactions || [];
      setTransactions(data);
    });
  }, []);

  // Criar nova transação
  async function createTransaction(transaction: TransactionEntry) {
    const response = await api.post("/transactions", transaction);
    const data = response.data.transaction;
    setTransactions([...transactions, data]);
  }

  return (
    <TableContext.Provider value={{ transactions, createTransaction, isOpenTransactions, setIsOpenTransactions }}>
      {children}
    </TableContext.Provider>
  );
};

// Hook para usar o contexto
export function useTableTransactions(): TransactionsContextData {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
}