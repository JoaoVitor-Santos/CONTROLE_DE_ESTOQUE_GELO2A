import React, { useState } from "react";
import Modal from "react-modal";
import './styles.css';
import { useModal } from "../../context/modalNewClientContext";

Modal.setAppElement("#root"); 

interface ModalProps {
    onConfirm?: () => void; 
}

export function ModalNewClient({ onConfirm }: ModalProps) {
    const { isOpen, closeModal, registerClient } = useModal(); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email || !phone) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const clientData = { name, email, phone };

            await registerClient(clientData);

            setName("");
            setEmail("");
            setPhone("");

            closeModal();

            if (onConfirm) {
                onConfirm();
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Cadastrar Novo Cliente"
            className="ReactModal__Content" 
            overlayClassName="ReactModal__Overlay" 
        >
            <div className="modal-header">
                <h2>Cadastrar Novo Cliente</h2>
                <button className="modal-close" onClick={closeModal}>
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
            <div className="modal-footer">
                <button type="button" className="cancel" onClick={closeModal}>
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