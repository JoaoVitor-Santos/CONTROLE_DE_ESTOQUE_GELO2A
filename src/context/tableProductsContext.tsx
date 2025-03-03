import React, { createContext, useState, useContext, useEffect } from "react";
import { api } from "../services/api";

interface Product {
    CO_ID: number;
    CO_NAME: string;
    VL_VALUE: number;
    CD_QUANTITY: number;
    CO_DESCRIPTION: string;
}

type ProductEntry = Omit<Product, "CO_ID">;

interface ProductContextData {
    tbProducts: Product[];
    createProduct: (product: ProductEntry) => Promise<void>;
    isOpenProducts: boolean;
    setIsOpenProducts: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProviderProductsProps {
    children: React.ReactNode;
}

const ProductsContext = createContext<ProductContextData>({} as ProductContextData);

export const TableProductsProvider: React.FC<ProviderProductsProps> = ({ children }) => {
    const [tbProducts, setTbProducts] = useState<Product[]>([]);
    const [isOpenProducts, setIsOpenProducts] = useState(false);

    useEffect(() => {
        console.log("Carregando produtos da API...");
        api.get("/products")
            .then((response) => {
                const data = response.data.tbProducts || [];
                const parsedData = data.map((product: any) => ({
                    ...product,
                    VL_VALUE: typeof product.VL_VALUE === "string" ? parseFloat(product.VL_VALUE) : product.VL_VALUE,
                    CD_QUANTITY: typeof product.CD_QUANTITY === "string" ? parseInt(product.CD_QUANTITY, 10) : product.CD_QUANTITY,
                }));
                console.log("Produtos recebidos:", parsedData);
                setTbProducts(parsedData);
            })
            .catch((error) => {
                console.error("Erro ao buscar produtos:", error);
            });
    }, []);

    async function createProduct(product: ProductEntry) {
        try {
            const response = await api.post("/products", product);
            const data = response.data.product;
            const parsedProduct = {
                ...data,
                VL_VALUE: typeof data.VL_VALUE === "string" ? parseFloat(data.VL_VALUE) : data.VL_VALUE,
                CD_QUANTITY: typeof data.CD_QUANTITY === "string" ? parseInt(data.CD_QUANTITY, 10) : data.CD_QUANTITY,
            };
            setTbProducts([...tbProducts, parsedProduct]);
            console.log("Produto criado:", parsedProduct);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
        }
    }

    // Log para verificar alterações no estado isOpenProducts
    useEffect(() => {
        console.log("Estado isOpenProducts alterado para:", isOpenProducts);
    }, [isOpenProducts]);

    return (
        <ProductsContext.Provider value={{ tbProducts, createProduct, isOpenProducts, setIsOpenProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export function useTableProducts(): ProductContextData {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useTableProducts must be used within a TableProductsProvider");
    }
    return context;
}