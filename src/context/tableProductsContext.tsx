import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

// Interfaces
interface Product {
    id: number;
    name: string;
    value: number;
    quantity: number;
    description: string;
}

type ProductEntry = Omit<Product, "id">;

interface ProductContextData {
    products: Product[];
    createProduct: (product: ProductEntry) => Promise<void>;
    isOpenProducts: boolean;
    setIsOpenProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderProductsProps {
    children: React.ReactNode;
}
const ProductsContext = createContext<ProductContextData>({} as ProductContextData);

export const TableProductsProvider: React.FC<ProviderProductsProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isOpenProducts, setIsOpenProducts] = useState(false);

    // Carregar produtos ao iniciar
    useEffect(() => {
        api.get("/products").then((response) => {
            const data = response.data.products || [];
            setProducts(data);
        });
    }, []);

    // Criar novo produto
    async function createProduct(product: ProductEntry) {
        const response = await api.post("/products", product);
        const data = response.data.product;
        setProducts([...products, data]);
    }

    return (
        <ProductsContext.Provider value={{ products, createProduct, isOpenProducts, setIsOpenProducts }}>
            {children}
        </ProductsContext.Provider>
    )
};

export function useTableProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
}