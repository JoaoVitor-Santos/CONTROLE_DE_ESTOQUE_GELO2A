import React, { useState } from "react";
import Modal from "react-modal";
import './styles.css';
import { useModalNewTransaction } from "../../context/modalNewTransactionContext";
import { useTableTransactions } from "../../context/tableTransactionsContext";
import { useTableClients } from "../../context/tableClientsContext";
import { useTableProducts } from "../../context/tableProductsContext";

Modal.setAppElement("#root");

export function ModalNewTransaction() {
    const { transactions } = useTableTransactions();
    const { isOpen, closeModalNewTransaction } = useModalNewTransaction();
    const { createTransaction } = useTableTransactions();
    const { clients } = useTableClients();
    const { products } = useTableProducts();

    // Função para obter a data atual
    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [date, setDate] = useState(getCurrentDate());
    const [client, setClient] = useState("");
    const [product, setProduct] = useState("");
    const [city, setCity] = useState(""); // Estado para a cidade selecionada ou digitada
    const [quantity, setQuantity] = useState<number | "">("");
    const [value, setValue] = useState<number | "">("");
    const [seller, setSeller] = useState("");

    // Função para criar uma nova transação
    const handleCreateTransaction = async () => {
        if (!client || !product || quantity === "" || value === "" || !city) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        try {
            await createTransaction({
                date,
                client,
                city,
                product,
                quantity,
                value,
                seller,
            });
            closeModalNewTransaction();
        } catch (error) {
            console.error("Erro ao criar transação:", error);
            alert("Ocorreu um erro ao criar a transação.");
        }
    };

    return (
        <Modal
            id="modal-new-transaction"
            isOpen={isOpen}
            onRequestClose={closeModalNewTransaction}
            contentLabel="Nova Transação"
            className="ReactModal__Content"
            overlayClassName="ReactModal__Overlay"
        >
            <div className="modal-header">
                <h2>Nova Transação</h2>
                <button className="modal-close" onClick={closeModalNewTransaction}>
                    &times;
                </button>
            </div>
            <div className="modal-body">
                <label htmlFor="date">Data:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <label htmlFor="client">Cliente:</label>
                <select
                    id="client"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                >
                    <option value="">Selecione um cliente</option>
                    {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                            {client.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="city">Cidade:</label>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* Campo de seleção para cidades */}
                    <select
                        id="city-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        style={{ marginBottom: "10px" }}
                    >
                        <option value="">Selecione uma cidade</option>
                        {transactions.map((transaction) => (
                            <option key={transaction.id} value={transaction.city}>
                                {transaction.city}
                            </option>
                        ))}
                    </select>

                    {/* Campo de entrada para cidade manual */}
                    <input
                        type="text"
                        id="city-input"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Digite a cidade se não encontrada"
                    />
                </div>

                <label htmlFor="product">Produto:</label>
                <select
                    id="product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                >
                    <option value="">Selecione um produto</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="quantity">Quantidade:</label>
                <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Digite a quantidade"
                />

                <label htmlFor="value">Valor:</label>
                <input
                    type="number"
                    id="value"
                    value={value}
                    onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Digite o valor"
                />

                <label htmlFor="seller">Vendedor:</label>
                <input
                    type="text"
                    id="seller"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                    placeholder="Digite o nome do vendedor"
                />
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="cancel"
                    onClick={closeModalNewTransaction}
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    className="confirm"
                    onClick={handleCreateTransaction}
                >
                    Confirmar
                </button>
            </div>
        </Modal>
    );
}