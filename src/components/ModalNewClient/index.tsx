import React, { useState } from "react";
import Modal from "react-modal";
import './styles.css';
import { useModalNewClient } from "../../context/modalNewClientContext";
import { useTableClients } from "../../context/tableClientsContext";

Modal.setAppElement("#root");

interface ModalProps {
    onConfirm?: () => void;
}

export function ModalNewClient({ onConfirm }: ModalProps) {
    const { tbClients } = useTableClients();
    const { isOpen, closeModalNewClient } = useModalNewClient();
    const [CO_NAME, setCO_NAME] = useState("");
    const [CO_EMAIL, setCO_EMAIL] = useState("");
    const [CO_PHONE, setCO_PHONE] = useState("");
    const [CG_ADDRESS, setCG_ADDRESS] = useState("");
    const [VL_BALANCE, setVL_BALANCE] = useState<number | "">("");
    const [CG_CITY, setCG_CITY] = useState("");
    const [isCustomCity, setIsCustomCity] = useState(false);

    const { createClient } = useTableClients();

    const uniqueCities = Array.from(new Set(tbClients.map((client) => client.CG_CITY)));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!CO_NAME || !CO_EMAIL || !CO_PHONE || !CG_ADDRESS || VL_BALANCE === "" || !CG_CITY) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const clientData = {
                CO_NAME,
                CO_EMAIL,
                CO_PHONE,
                CG_ADDRESS,
                VL_BALANCE: Number(VL_BALANCE),
                CG_CITY,
            };

            await createClient(clientData);

            setCO_NAME("");
            setCO_EMAIL("");
            setCO_PHONE("");
            setCG_ADDRESS("");
            setVL_BALANCE("");
            setCG_CITY("");
            setIsCustomCity(false);
            closeModalNewClient();

            if (onConfirm) {
                onConfirm();
            }

            alert("Cliente cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            alert("Ocorreu um erro ao cadastrar o cliente.");
        }
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModalNewClient}
            contentLabel="Cadastrar Novo Cliente"
            className="ReactModal__Content"
            overlayClassName="ReactModal__Overlay"
        >
            <div className="modal-header">
                <h2>Cadastrar Novo Cliente</h2>
                <button className="modal-close" onClick={closeModalNewClient}>
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
                    placeholder="Digite o nome do cliente"
                />

                <label htmlFor="CO_EMAIL">Email:</label>
                <input
                    type="email"
                    id="CO_EMAIL"
                    value={CO_EMAIL}
                    onChange={(e) => setCO_EMAIL(e.target.value)}
                    placeholder="Digite o email do cliente"
                />

                <label htmlFor="CO_PHONE">Telefone:</label>
                <input
                    type="text"
                    id="CO_PHONE"
                    value={CO_PHONE}
                    onChange={(e) => setCO_PHONE(e.target.value)}
                    placeholder="Digite o telefone do cliente"
                />

                <label htmlFor="CG_ADDRESS">Endereço:</label>
                <input
                    type="text"
                    id="CG_ADDRESS"
                    value={CG_ADDRESS}
                    onChange={(e) => setCG_ADDRESS(e.target.value)}
                    placeholder="Digite o endereço do cliente"
                />

                <label htmlFor="VL_BALANCE">Saldo:</label>
                <input
                    type="number"
                    id="VL_BALANCE"
                    value={VL_BALANCE}
                    onChange={(e) => setVL_BALANCE(e.target.value === "" ? "" : Number(e.target.value))}
                    placeholder="Digite o saldo do cliente"
                />

                <label htmlFor="CG_CITY">Cidade:</label>
                {!isCustomCity ? (
                    <select
                        id="CG_CITY"
                        value={CG_CITY}
                        onChange={(e) => setCG_CITY(e.target.value)}
                    >
                        <option value="">Selecione uma cidade</option>
                        {uniqueCities.map((cityOption) => (
                            <option key={cityOption} value={cityOption}>
                                {cityOption}
                            </option>
                        ))}
                        <option value="custom">Outra cidade...</option>
                    </select>
                ) : (
                    <input
                        type="text"
                        id="city-input"
                        value={CG_CITY}
                        onChange={(e) => setCG_CITY(e.target.value)}
                        placeholder="Digite a cidade"
                    />
                )}

                {CG_CITY === "custom" && (
                    <div className="city-actions">
                        <button
                            id="add-custom-city-new-client"
                            type="button"
                            onClick={() => {
                                setIsCustomCity(true);
                                setCG_CITY("");
                            }}
                        >
                            Inserir Cidade Manualmente
                        </button>
                    </div>
                )}

                <div className="modal-footer">
                    <button type="button" className="cancel" onClick={closeModalNewClient}>
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