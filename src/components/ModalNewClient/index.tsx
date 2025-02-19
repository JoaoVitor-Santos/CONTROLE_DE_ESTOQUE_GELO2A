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
    const { isOpen, closeModalNewClient } = useModalNewClient();      
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState<number | "">("");
    const { createClient } = useTableClients();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validação básica
        if (!name || !email || !phone || !address || balance === "") {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            // Criar objeto de cliente
            const clientData = {
                name,
                email,
                phone,
                address,
                balance: Number(balance), // Convertendo para número
            };

            // Chamar a função createClient do contexto
            await createClient(clientData);

            // Limpar os campos do formulário
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setBalance("");

            // Fechar o modal
            closeModalNewClient();

            // Executar callback opcional
            if (onConfirm) {
                onConfirm();
            }

            // Feedback ao usuário
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
                    placeholder="Digite o nome do cliente"
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o email do cliente"
                />

                <label htmlFor="phone">Telefone:</label>
                <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Digite o telefone do cliente"
                />

                <label htmlFor="address">Endereço:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Digite o endereço do cliente"
                />

                <label htmlFor="balance">Saldo:</label>
                <input
                    type="number"
                    id="balance"
                    value={balance}
                    onChange={(e) => setBalance(Number(e.target.value))}
                    placeholder="Digite o saldo do cliente"
                />

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