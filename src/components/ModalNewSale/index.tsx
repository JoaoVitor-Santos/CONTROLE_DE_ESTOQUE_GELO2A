import React, { useState } from "react";
import Modal from "react-modal";
import './styles.css';
import { useModalNewSale } from "../../context/modalNewSaleContext";
import { useTableSales } from "../../context/tableSalesContext";
import { useTableClients } from "../../context/tableClientsContext";
import { useTableProducts } from "../../context/tableProductsContext";

Modal.setAppElement("#root");

export function ModalNewSale() {
    const { tbSales } = useTableSales();
    const { isOpen, closeModalNewSale } = useModalNewSale();
    const { createSale } = useTableSales();
    const { tbClients } = useTableClients();
    const { tbProducts } = useTableProducts();

    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0"); // +1 porque meses começam em 0
        const year = today.getFullYear();
        return `${year}-${month}-${day}`; // Formato YYYY-MM-DD para input type="date"
    };

    const [DT_DATE, setDT_DATE] = useState(getCurrentDate());
    const [CO_CLIENT, setCO_CLIENT] = useState("");
    const [CO_PRODUCT, setCO_PRODUCT] = useState("");
    const [CG_CITY, setCG_CITY] = useState("");
    const [CD_QUANTITY, setCD_QUANTITY] = useState<number | "">("");
    const [VL_VALUE, setVL_VALUE] = useState<number | "">("");
    const [CO_SELLER, setCO_SELLER] = useState("");

    const handleCreateSale = async () => {
        console.log("Iniciando handleCreateSale com os valores:", {
            DT_DATE,
            CO_CLIENT,
            CG_CITY,
            CO_PRODUCT,
            CD_QUANTITY,
            VL_VALUE,
            CO_SELLER,
        });

        if (!CO_CLIENT || !CO_PRODUCT || CD_QUANTITY === "" || VL_VALUE === "" || !CG_CITY) {
            console.log("Validação falhou: campos obrigatórios não preenchidos");
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            await createSale({
                DT_DATE,
                CO_CLIENT,
                CG_CITY,
                CO_PRODUCT,
                CD_QUANTITY,
                VL_VALUE,
                CO_SELLER,
            });
            console.log("Venda criada com sucesso");

            setDT_DATE(getCurrentDate());
            setCO_CLIENT("");
            setCO_PRODUCT("");
            setCG_CITY("");
            setCD_QUANTITY("");
            setVL_VALUE("");
            setCO_SELLER("");
            closeModalNewSale();
        } catch (error) {
            console.error("Erro ao criar venda:", error);
            alert("Ocorreu um erro ao criar a venda.");
        }
    };

    console.log("Renderizando ModalNewSale com tbSales:", tbSales.length, "itens");

    return (
        <Modal
            id="modal-new-sale"
            isOpen={isOpen}
            onRequestClose={closeModalNewSale}
            contentLabel="Nova Venda"
            className="ReactModal__Content"
            overlayClassName="ReactModal__Overlay"
        >
            <div className="modal-header">
                <h2>Nova Venda</h2>
                <button className="modal-close" onClick={closeModalNewSale}>
                    ×
                </button>
            </div>
            <div className="modal-body">
                <label htmlFor="DT_DATE">Data:</label>
                <input
                    type="date"
                    id="DT_DATE"
                    value={DT_DATE}
                    onChange={(e) => {
                        console.log("DT_DATE alterado para:", e.target.value);
                        setDT_DATE(e.target.value);
                    }}
                />

                <label htmlFor="CO_CLIENT">Cliente:</label>
                <select
                    id="CO_CLIENT"
                    value={CO_CLIENT}
                    onChange={(e) => {
                        console.log("CO_CLIENT alterado para:", e.target.value);
                        setCO_CLIENT(e.target.value);
                    }}
                >
                    <option value="">Selecione um cliente</option>
                    {tbClients.map((client) => (
                        <option key={client.CO_ID} value={client.CO_NAME}>
                            {client.CO_NAME}
                        </option>
                    ))}
                </select>

                <label htmlFor="CG_CITY">Cidade:</label>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <select
                        id="city-select"
                        value={CG_CITY}
                        onChange={(e) => {
                            console.log("CG_CITY alterado para (select):", e.target.value);
                            setCG_CITY(e.target.value);
                        }}
                        style={{ marginBottom: "10px" }}
                    >
                        <option value="">Selecione uma cidade</option>
                        {Array.from(new Set(tbSales.map((sale) => sale.CG_CITY))).map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        id="city-input"
                        value={CG_CITY}
                        onChange={(e) => {
                            console.log("CG_CITY alterado para (input):", e.target.value);
                            setCG_CITY(e.target.value);
                        }}
                        placeholder="Digite a cidade se não encontrada"
                    />
                </div>

                <label htmlFor="CO_PRODUCT">Produto:</label>
                <select
                    id="CO_PRODUCT"
                    value={CO_PRODUCT}
                    onChange={(e) => {
                        console.log("CO_PRODUCT alterado para:", e.target.value);
                        setCO_PRODUCT(e.target.value);
                    }}
                >
                    <option value="">Selecione um produto</option>
                    {tbProducts.map((product) => (
                        <option key={product.CO_ID} value={product.CO_NAME}>
                            {product.CO_NAME}
                        </option>
                    ))}
                </select>

                <label htmlFor="CD_QUANTITY">Quantidade:</label>
                <input
                    type="number"
                    id="CD_QUANTITY"
                    value={CD_QUANTITY}
                    onChange={(e) => {
                        console.log("CD_QUANTITY alterado para:", e.target.value);
                        setCD_QUANTITY(e.target.value === "" ? "" : Number(e.target.value));
                    }}
                    placeholder="Digite a quantidade"
                />

                <label htmlFor="VL_VALUE">Valor:</label>
                <input
                    type="number"
                    id="VL_VALUE"
                    value={VL_VALUE}
                    onChange={(e) => {
                        console.log("VL_VALUE alterado para:", e.target.value);
                        setVL_VALUE(e.target.value === "" ? "" : Number(e.target.value));
                    }}
                    placeholder="Digite o valor"
                />

                <label htmlFor="CO_SELLER">Vendedor:</label>
                <input
                    type="text"
                    id="CO_SELLER"
                    value={CO_SELLER}
                    onChange={(e) => {
                        console.log("CO_SELLER alterado para:", e.target.value);
                        setCO_SELLER(e.target.value);
                    }}
                    placeholder="Digite o nome do vendedor"
                />
            </div>
            <div className="modal-footer">
                <button
                    type="button"
                    className="cancel"
                    onClick={closeModalNewSale}
                >
                    Cancelar
                </button>
                <button
                    type="button"
                    className="confirm"
                    onClick={handleCreateSale}
                >
                    Confirmar
                </button>
            </div>
        </Modal>
    );
}