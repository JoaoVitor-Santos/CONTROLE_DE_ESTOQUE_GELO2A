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
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const [DT_DATE, setDT_DATE] = useState(getCurrentDate());
    const [CO_CLIENT, setCO_CLIENT] = useState("");
    const [CO_PRODUCT, setCO_PRODUCT] = useState("");
    const [CG_CITY, setCG_CITY] = useState("");
    const [CD_QUANTITY, setCD_QUANTITY] = useState<number | "">("");
    const [VL_VALUE, setVL_VALUE] = useState<number | "">("");
    const [CO_SELLER, setCO_SELLER] = useState("");
    const [PAYMENT_STATUS, setPAYMENT_STATUS] = useState<"none" | "partial" | "full">("none");
    const [VL_PAID, setVL_PAID] = useState<number | "">("");

    const handleCreateSale = async () => {
        if (!CO_CLIENT || !CO_PRODUCT || CD_QUANTITY === "" || VL_VALUE === "" || !CG_CITY) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (PAYMENT_STATUS === "partial" && (VL_PAID === "" || (typeof VL_PAID === "number" && (VL_PAID >= VL_VALUE! || VL_PAID <= 0)))) {
            alert("Por favor, informe um valor pago válido (maior que 0 e menor que o valor total).");
            return;
        }

        try {
            // Determina o valor pago com base no status
            const paidValue = PAYMENT_STATUS === "full" 
                ? VL_VALUE as number 
                : PAYMENT_STATUS === "partial" 
                ? VL_PAID as number 
                : 0;

            const saleData = {
                DT_DATE,
                CO_CLIENT,
                CG_CITY,
                CO_PRODUCT,
                CD_QUANTITY: CD_QUANTITY as number,
                VL_VALUE: VL_VALUE as number,
                CO_SELLER,
                VL_PAID: paidValue,
            };

            await createSale(saleData);

            setDT_DATE(getCurrentDate());
            setCO_CLIENT("");
            setCO_PRODUCT("");
            setCG_CITY("");
            setCD_QUANTITY("");
            setVL_VALUE("");
            setCO_SELLER("");
            setPAYMENT_STATUS("none");
            setVL_PAID("");
            closeModalNewSale();
        } catch (error) {
            alert("Ocorreu um erro ao criar a venda.");
        }
    };

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
                    onChange={(e) => setDT_DATE(e.target.value)}
                />

                <label htmlFor="CO_CLIENT">Cliente:</label>
                <select
                    id="CO_CLIENT"
                    value={CO_CLIENT}
                    onChange={(e) => setCO_CLIENT(e.target.value)}
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
                        onChange={(e) => setCG_CITY(e.target.value)}
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
                        onChange={(e) => setCG_CITY(e.target.value)}
                        placeholder="Digite a cidade se não encontrada"
                    />
                </div>

                <label htmlFor="CO_PRODUCT">Produto:</label>
                <select
                    id="CO_PRODUCT"
                    value={CO_PRODUCT}
                    onChange={(e) => setCO_PRODUCT(e.target.value)}
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
                    onChange={(e) => setCD_QUANTITY(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Digite a quantidade"
                />

                <label htmlFor="VL_VALUE">Valor:</label>
                <input
                    type="number"
                    id="VL_VALUE"
                    value={VL_VALUE}
                    onChange={(e) => setVL_VALUE(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Digite o valor"
                />

                <label htmlFor="CO_SELLER">Vendedor:</label>
                <input
                    type="text"
                    id="CO_SELLER"
                    value={CO_SELLER}
                    onChange={(e) => setCO_SELLER(e.target.value)}
                    placeholder="Digite o nome do vendedor"
                />

                <label htmlFor="PAYMENT_STATUS">Status do Pagamento:</label>
                <select
                    id="PAYMENT_STATUS"
                    value={PAYMENT_STATUS}
                    onChange={(e) => setPAYMENT_STATUS(e.target.value as "none" | "partial" | "full")}
                >
                    <option value="none">Não pago</option>
                    <option value="partial">Parcialmente pago</option>
                    <option value="full">Totalmente pago</option>
                </select>

                {PAYMENT_STATUS === "partial" && (
                    <>
                        <label htmlFor="VL_PAID">Valor Pago:</label>
                        <input
                            type="number"
                            id="VL_PAID"
                            value={VL_PAID}
                            onChange={(e) => setVL_PAID(e.target.value === "" ? "" : Number(e.target.value))}
                            placeholder="Digite o valor pago"
                            max={VL_VALUE || undefined}
                            min="0"
                        />
                    </>
                )}
            </div>
            <div className="modal-footer">
                <button type="button" className="cancel" onClick={closeModalNewSale}>
                    Cancelar
                </button>
                <button type="button" className="confirm" onClick={handleCreateSale}>
                    Confirmar
                </button>
            </div>
        </Modal>
    );
}