import React, { useState } from "react";
import Modal from "react-modal";
import './styles.css';
import { useModalNewSpent } from "../../context/modalNewSpent";
import { useTableSpents } from "../../context/tableSpentContext";

Modal.setAppElement("#root");

export function ModalNewSpent() {
    const { isOpen, closeModalNewSpent } = useModalNewSpent();
    const { createSpent, setIsOpenSpents } = useTableSpents();

    const [formData, setFormData] = useState({
        DT_DATE: "",
        VL_VALUE: 0,
        CO_DESCRIPTION: "",
        CO_TYPE: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "VL_VALUE" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createSpent(formData);
        closeModalNewSpent();
        setIsOpenSpents(false);
        setFormData({
            DT_DATE: "",
            VL_VALUE: 0,
            CO_DESCRIPTION: "",
            CO_TYPE: "",
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
                    ×
                </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                    <label htmlFor="DT_DATE">Data:</label>
                    <input
                        type="date"
                        id="DT_DATE"
                        name="DT_DATE"
                        value={formData.DT_DATE}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="VL_VALUE">Valor:</label>
                    <input
                        type="number"
                        id="VL_VALUE"
                        name="VL_VALUE"
                        value={formData.VL_VALUE}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="CO_DESCRIPTION">Descrição:</label>
                    <input
                        type="text"
                        id="CO_DESCRIPTION"
                        name="CO_DESCRIPTION"
                        value={formData.CO_DESCRIPTION}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="CO_TYPE">Tipo:</label>
                    <select
                        id="CO_TYPE"
                        name="CO_TYPE"
                        value={formData.CO_TYPE}
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