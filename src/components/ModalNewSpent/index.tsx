import React, { useState } from "react";
import Modal from "react-modal";
import './styles.css';
import { useModalNewSpent } from "../../context/modalNewSpent";
import { useTableSpents } from "../../context/tableSpentContext";

// Configura o elemento raiz para acessibilidade no modal
Modal.setAppElement("#root");

export function ModalNewSpent() {
    const { isOpen, closeModalNewSpent } = useModalNewSpent();
    const { createSpent, setIsOpenSpents } = useTableSpents();

    // Estados locais para os campos do formulário
    const [formData, setFormData] = useState({
        date: "",
        value: 0,
        description: "",
        type: "",
    });

    // Função para lidar com as mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Cria o novo gasto usando o contexto
        await createSpent(formData);

        // Fecha o modal e atualiza a tabela de gastos
        closeModalNewSpent();
        setIsOpenSpents(false);

        // Limpa o formulário
        setFormData({
            date: "",
            value: 0,
            description: "",
            type: "",
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModalNewSpent}
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="modal-header">
                <h2>Novo Gasto</h2>
                <button className="close-button" onClick={closeModalNewSpent}>
                    &times;
                </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                    <label htmlFor="date">Data:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="value">Valor:</label>
                    <input
                        type="number"
                        id="value"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrição:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Tipo:</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um tipo</option>
                        <option value="fixo">Fixo</option>
                        <option value="variavel">Variável</option>
                    </select>
                </div>
                <div className="modal-actions">
                    <button type="button" className="cancel-button" onClick={closeModalNewSpent}>
                        Cancelar
                    </button>
                    <button type="submit" className="submit-button">
                        Salvar
                    </button>
                </div>
            </form>
        </Modal>
    );
}