
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
   - Clone o repositório: `git clone https://github.com/JoaoVitor-Santos/controle-de-estoque-gelo2a.git`
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
  
4. **Imagens**
   - Novo Cliente
     ![image](https://github.com/user-attachments/assets/0dddcef8-c30d-4182-b362-160ba2f59906)
   - Novo Produto
     ![image](https://github.com/user-attachments/assets/6fc7e1aa-da11-442c-844b-fcfb336d7776)
   - Cadastrar Venda
     ![image](https://github.com/user-attachments/assets/fb541950-e0c2-45fe-b7cb-7f28bb878aac)
   - Cadastrar Despesa
     ![image](https://github.com/user-attachments/assets/c02c398a-f675-480f-a01b-63f278b0520d)
   - Tabela de Clientes
     ![image](https://github.com/user-attachments/assets/d35472c2-cf96-44ae-b77f-1b5790cc0452)
   - Tabela de Produtos
     ![image](https://github.com/user-attachments/assets/ae032e2e-5aca-446a-bc1b-429e45f8cc88)
   - Tabela de Vendas
     ![image](https://github.com/user-attachments/assets/f2c9af6a-5e4c-4d29-9f9e-64772383349c)
   - Tela de gestão (O gráfico só é criado a partir de gastos e/ou vendas em meses diferentes, somente dados fictícios para demonstração)
     ![image](https://github.com/user-attachments/assets/13d38ab6-692d-4a75-a056-1b4062ebc2ef)
     ![image](https://github.com/user-attachments/assets/e82e9d3d-b99c-427b-b116-19ac852922ce)


 

