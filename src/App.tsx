import React from 'react';
import { TopBar } from './componnents/topBar';
import { SideBar } from './componnents/sideBar';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <TopBar title="Controle de Estoque e Finanças" />
      <SideBar title="Menu" />
      <div id='content'>
      </div>      
    </div>
  );
}

export default App;
