import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

// Interfaces
interface Sale {
  id: number;
  date: string;
  client: string;
  city: string;
  product: string;
  quantity: number;
  value: number;
  seller: string;
}

type SaleEntry = Omit<Sale, "id">;

interface SalesContextData {
  sales: Sale[];
  createSale: (sale: SaleEntry) => Promise<void>;
  isOpenSales: boolean;
  setIsOpenSales: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderSalesProps {
  children: React.ReactNode;
}

const TableContext = createContext<SalesContextData>({} as SalesContextData);

// Provedor de Vendas
export const TableSalesProvider: React.FC<ProviderSalesProps> = ({ children }) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isOpenSales, setIsOpenSales] = useState(false);

  // Carregar vendas ao iniciar
  useEffect(() => {
    api.get("/sales").then((response) => {
      const data = response.data.sales || [];
      setSales(data);
    });
  }, []);

  // Criar nova venda
  async function createSale(sale: SaleEntry) {
    const response = await api.post("/sales", sale);
    const data = response.data.sale;
    setSales([...sales, data]);
  }

  return (
    <TableContext.Provider value={{ sales, createSale, isOpenSales, setIsOpenSales }}>
      {children}
    </TableContext.Provider>
  );
};

// Hook para usar o contexto
export function useTableSales(): SalesContextData {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
}