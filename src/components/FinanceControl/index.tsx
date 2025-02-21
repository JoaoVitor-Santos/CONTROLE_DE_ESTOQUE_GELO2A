import React from "react";
import './styles.css';
import { useFinanceControl } from "../../context/FinanceControlContext";
import { useTableTransactions } from "../../context/tableTransactionsContext";

export function FinanceControl() {
    const { isOpenFinanceControl, setIsOpenFinanceControl } = useFinanceControl();
    // Calcular o total de entradas
    
    return (
        <div className="finance-control-container" onClick={() => setIsOpenFinanceControl(!isOpenFinanceControl)}>
            <div className="finance-control-content" >
                <div id="Entries">
                    <h1>Entradas</h1>
                </div>
            </div>
        </div>
    );
}