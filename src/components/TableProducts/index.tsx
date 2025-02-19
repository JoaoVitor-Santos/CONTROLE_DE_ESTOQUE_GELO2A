import React from "react";
import './styles.css';
import { useTableProducts } from "../../context/tableProductsContext";


export function TableProducts() {
    const { products } = useTableProducts();
    const { isOpenProducts } = useTableProducts();

    if (!isOpenProducts) {
        return null;
    }
    
    return (
        <div className="table-products-container"> 
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
                    {products.map((product) => ( 
                        <tr key={product.id}> 
                            <td>{product.name}</td> 
                            <td>{product.value}</td> 
                            <td>{product.quantity}</td> 
                            <td>{product.description}</td> 
                        </tr> 
                    ))} 
                </tbody> 
            </table> 
        </div>
    );
}