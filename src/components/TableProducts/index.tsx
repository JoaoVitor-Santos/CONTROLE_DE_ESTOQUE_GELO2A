import React from "react";
import './styles.css';
import { useTableProducts } from "../../context/tableProductsContext";

export function TableProducts() {
    const { tbProducts, isOpenProducts } = useTableProducts();

    if (!isOpenProducts) {
        return null;
    }

    // Função para formatar o valor monetário
    const formatValue = (value: number | string): string => {
        const valueNumber = typeof value === "string" ? parseFloat(value) : value;
        return isNaN(valueNumber) ? "R$ 0.00" : `R$ ${valueNumber.toFixed(2)}`;
    };

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {tbProducts.length > 0 ? (
                        tbProducts.map((product) => (
                            <tr key={product.CO_ID}>
                                <td>{product.CO_NAME}</td>
                                <td>{formatValue(product.VL_VALUE)}</td>
                                <td>{product.CD_QUANTITY}</td>
                                <td>{product.CO_DESCRIPTION}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>Nenhum produto encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}