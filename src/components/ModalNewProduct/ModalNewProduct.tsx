import React, { useState } from "react";
import Modal from "react-modal";
import { useModalNewProduct } from "../../context/modalNewProductContext";
import { useTableProducts } from "../../context/tableProductsContext";

Modal.setAppElement("#root");

interface ModalProps {
    onConfirm?: () => void;
}

export function ModalNewProduct({ onConfirm }: ModalProps) {
    const { isOpen, closeModalNewProduct } = useModalNewProduct();
    const [name, setName] = useState("");
    const [value, setPrice] = useState<number | "">("");
    const [quantity, setQuantity] = useState<number | "">("");
    const [description, setDescription] = useState("");
    const { createProduct } = useTableProducts();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !value || !quantity) {
            alert("Preencha todos os campos!");
            return;
        }
        try {
            const productData = {
                name,
                value,
                quantity,
                description,
            };
            await createProduct(productData);
            setName("");
            setPrice("");
            setQuantity("");
            setDescription("");
            closeModalNewProduct();
            if (onConfirm) {
                onConfirm();
            }
            alert("Produto cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            alert("Ocorreu um erro ao cadastrar o produto.");
        }
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModalNewProduct}
            contentLabel="Cadastrar Novo Produto"
            className="ReactModal__Content" 
            overlayClassName="ReactModal__Overlay" 
        >
            <div className="modal-header">
                <h2>Cadastrar Novo Produto</h2>
                <button className="modal-close" onClick={closeModalNewProduct}>
                    &times;
                </button>
            </div>
            <form className="modal-body" onSubmit={handleSubmit}>
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite o nome do produto"
                />
                <label htmlFor="value">Valor:</label>
                <input
                    type="number"
                    id="value"
                    value={value}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Digite o valor do produto"
                />
                <label htmlFor="quantity">Quantidade:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="Digite a quantidade do produto"
                />
                <label htmlFor="description">Descrição:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Digite a descrição do produto"
                />
                <div className="modal-footer">
                    <button type="button" className="cancel" onClick={closeModalNewProduct}>
                        Cancelar
                    </button>
                    <button type="submit" className="confirm">
                        Confirmar
                    </button>
                </div>
            </form>
        </Modal>
    );
}