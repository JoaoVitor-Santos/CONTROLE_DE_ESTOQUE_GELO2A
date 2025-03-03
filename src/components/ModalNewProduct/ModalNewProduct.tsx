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
    const [CO_NAME, setCO_NAME] = useState("");
    const [VL_VALUE, setVL_VALUE] = useState<number | "">("");
    const [CD_QUANTITY, setCD_QUANTITY] = useState<number | "">("");
    const [CO_DESCRIPTION, setCO_DESCRIPTION] = useState("");
    const { createProduct } = useTableProducts();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!CO_NAME || VL_VALUE === "" || CD_QUANTITY === "") {
            alert("Preencha todos os campos!");
            return;
        }
        try {
            const productData = {
                CO_NAME,
                VL_VALUE,
                CD_QUANTITY,
                CO_DESCRIPTION,
            };
            await createProduct(productData);
            setCO_NAME("");
            setVL_VALUE("");
            setCD_QUANTITY("");
            setCO_DESCRIPTION("");
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
                    ×
                </button>
            </div>
            <form className="modal-body" onSubmit={handleSubmit}>
                <label htmlFor="CO_NAME">Nome:</label>
                <input
                    type="text"
                    id="CO_NAME"
                    value={CO_NAME}
                    onChange={(e) => setCO_NAME(e.target.value)}
                    placeholder="Digite o nome do produto"
                />
                <label htmlFor="VL_VALUE">Valor:</label>
                <input
                    type="number"
                    id="VL_VALUE"
                    value={VL_VALUE}
                    onChange={(e) => setVL_VALUE(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Digite o valor do produto"
                />
                <label htmlFor="CD_QUANTITY">Quantidade:</label>
                <input
                    type="number"
                    id="CD_QUANTITY"
                    value={CD_QUANTITY}
                    onChange={(e) => setCD_QUANTITY(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Digite a quantidade do produto"
                />
                <label htmlFor="CO_DESCRIPTION">Descrição:</label>
                <input
                    type="text"
                    id="CO_DESCRIPTION"
                    value={CO_DESCRIPTION}
                    onChange={(e) => setCO_DESCRIPTION(e.target.value)}
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