import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

interface Sale {
  CO_ID: number;
  DT_DATE: string;
  CO_CLIENT: string;
  CG_CITY: string;
  CO_PRODUCT: string;
  CD_QUANTITY: number;
  VL_VALUE: number;
  CO_SELLER: string;
}

type SaleEntry = Omit<Sale, "CO_ID">;

interface SalesContextData {
  tbSales: Sale[];
  createSale: (sale: SaleEntry) => Promise<void>;
  isOpenSales: boolean;
  setIsOpenSales: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderSalesProps {
  children: React.ReactNode;
}

const TableContext = createContext<SalesContextData>({} as SalesContextData);

export const TableSalesProvider: React.FC<ProviderSalesProps> = ({ children }) => {
  const [tbSales, setTbSales] = useState<Sale[]>([]);
  const [isOpenSales, setIsOpenSales] = useState(false);

  useEffect(() => {
    api.get("/sales").then((response) => {
      const data = response.data.tbSales || [];
      setTbSales(data);
    });
  }, []);

  async function createSale(sale: SaleEntry) {
    const response = await api.post("/sales", sale);
    const data = response.data.sale;
    setTbSales([...tbSales, data]);
  }

  return (
    <TableContext.Provider value={{ tbSales, createSale, isOpenSales, setIsOpenSales }}>
      {children}
    </TableContext.Provider>
  );
};

export function useTableSales(): SalesContextData {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableSales must be used within a TableSalesProvider");
  }
  return context;
}