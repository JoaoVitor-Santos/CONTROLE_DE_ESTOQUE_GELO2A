import React, { createContext, useState, useContext } from "react";

interface TableContextProps {
  isOpen: boolean;
  openTable: () => void;
  closeTable: () => void;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openTable = () => setIsOpen(true);
  const closeTable = () => setIsOpen(false);

  return (
    <TableContext.Provider value={{ isOpen, openTable, closeTable }}>
      {children}
    </TableContext.Provider>
  );
};

// Hook para usar o contexto
export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable deve ser usado dentro de um TableProvider");
  }
  return context;
};
