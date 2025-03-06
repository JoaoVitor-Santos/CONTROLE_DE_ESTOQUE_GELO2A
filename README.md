Aqui está a descrição atualizada para o GitHub, ajustando a seção "Como Executar" para refletir as três formas de rodar o projeto: usando o executável empacotado, instalando as dependências e rodando o backend manualmente, ou rodando o backend e o frontend React juntos.

---

**Controle de Estoque Gelo 2A**  
Um sistema de gerenciamento de estoque e vendas desenvolvido para pequenas empresas. O backend, construído com Flask (Python) e SQLite, oferece uma API RESTful para gerenciar vendas, clientes, produtos e despesas, com suporte a pagamentos parciais ou acima do valor, ajustando automaticamente o saldo dos clientes. O frontend, em React, proporciona uma interface intuitiva, incluindo modais para registro de vendas. Empacotado como um executável standalone com PyInstaller para fácil distribuição.

**Funcionalidades**:
- Cadastro e consulta de vendas, clientes, produtos e despesas.
- Suporte a pagamentos flexíveis com atualização de saldo.
- Banco de dados SQLite leve e portátil.
- Limpeza de tabelas via API.
- Interface web responsiva em React.

**Tecnologias**:
- Backend: Flask, Flask-SQLAlchemy, Flask-Cors, SQLite
- Frontend: React
- Empacotamento: PyInstaller
![image](https://github.com/user-attachments/assets/fd704119-0eac-48a0-be83-f041103e8e9e)

**Estrutura**:
- `static/`: Arquivos JS e imagens.
- `templates/`: HTML servido pelo Flask.
- `instance/`: Configurações adicionais.
- `app.py`: Código principal do backend.

**Como Executar**:
1. **Usando o Executável (Backend)**:
   - Baixe o executável `app.exe` da seção de releases.
   - Execute: `app.exe` (no Windows) ou `./app` (Linux/Mac, se empacotado para essas plataformas).
   - Acesse: `http://127.0.0.1:5000/`.

2. **Rodando o Backend Manualmente**:
   - Clone o repositório: `git clone https://github.com/seu_usuario/controle-de-estoque-gelo2a.git`
   - Entre no diretório: `cd controle-de-estoque-gelo2a/back-end`
   - Instale as dependências: `pip install -r requirements.txt`
   - Execute: `python app.py`
   - Acesse: `http://127.0.0.1:5000/`.

3. **Rodando Backend e Frontend (React)**:
   - **Backend**: Siga os passos acima para rodar `python app.py`.
   - **Frontend**: 
     - Entre no diretório do frontend: `cd ../front-end`
     - Instale as dependências: `npm install`
     - Inicie o React: `npm start`
   - Acesse: `http://localhost:3000/` (ou a porta padrão do React), com o backend rodando em `http://127.0.0.1:5000/` para as chamadas da API.
