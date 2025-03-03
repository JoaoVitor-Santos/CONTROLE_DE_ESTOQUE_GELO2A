from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL

# Criar e configurar o app Flask
app = Flask(__name__)

# Parâmetros fixos para conexão com o banco de dados
app.config['MYSQL_HOST'] = 'localhost'  # Endereço do servidor MySQL
app.config['MYSQL_USER'] = 'root'  # Usuário do MySQL
app.config['MYSQL_PASSWORD'] = 'Elefantevoador100%'  # Senha do MySQL
app.config['MYSQL_DB'] = 'projetos'  # Nome do banco de dados

# Criar a instância MySQL
mysql = MySQL(app)

# Habilita CORS para todas as rotas
CORS(app)

# Função auxiliar para obter o cursor de maneira segura
def get_cursor():
    return mysql.connection.cursor()

# Rotas da API
@app.route('/api/sales', methods=['GET'])
def get_sales():
    try:
        cur = get_cursor()  # Obtém o cursor de maneira segura
        cur.execute("SELECT * FROM tb_sales")
        sales = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        result = [dict(zip(columns, row)) for row in sales]
        cur.close()
        return jsonify({'tbSales': result})
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar vendas: {str(e)}'}), 500

@app.route('/api/sales', methods=['POST'])
def create_sale():
    try:
        data = request.get_json()
        cur = get_cursor()  # Obtém o cursor de maneira segura
        query = """
            INSERT INTO tb_sales (dt_date, co_client, cg_city, co_product, cd_quantity, vl_value, co_seller)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data['dt_date'], data['co_client'], data['cg_city'], data['co_product'],
            data['cd_quantity'], data['vl_value'], data['co_seller']
        )
        cur.execute(query, values)
        mysql.connection.commit()  # Commit na transação
        cur.close()
        return jsonify({'client': data}), 201  # Padroniza a chave como 'client'
    except Exception as e:
        return jsonify({'error': f'Erro ao criar venda: {str(e)}'}), 500

@app.route('/api/spents', methods=['GET'])
def get_spents():
    try:
        cur = get_cursor()  # Obtém o cursor de maneira segura
        cur.execute("SELECT * FROM tb_spents")
        spents = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        result = [dict(zip(columns, row)) for row in spents]
        cur.close()
        return jsonify({'tbSpents': result})
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar despesas: {str(e)}'}), 500

@app.route('/api/spents', methods=['POST'])
def create_spent():
    try:
        data = request.get_json()
        cur = get_cursor()  # Obtém o cursor de maneira segura
        query = """
            INSERT INTO tb_spents (dt_date, vl_value, co_description, co_type)
            VALUES (%s, %s, %s, %s)
        """
        values = (data['dt_date'], data['vl_value'], data['co_description'], data['co_type'])
        cur.execute(query, values)
        mysql.connection.commit()  # Commit na transação
        cur.close()
        return jsonify({'spent': data}), 201
    except Exception as e:
        return jsonify({'error': f'Erro ao criar despesa: {str(e)}'}), 500

@app.route('/api/clients', methods=['GET'])  # Padronizei como /api/clients
def get_clients():
    try:
        cur = get_cursor()  # Obtém o cursor de maneira segura
        cur.execute("SELECT * FROM tb_clients")
        clients = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        result = [dict(zip(columns, row)) for row in clients]
        cur.close()
        return jsonify({'tbClients': result})
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar clientes: {str(e)}'}), 500

@app.route('/api/clients', methods=['POST'])
def create_client():
    try:
        data = request.get_json()
        cur = get_cursor()  # Obtém o cursor de maneira segura
        query = """
            INSERT INTO tb_clients (co_name, cg_address, cg_city, co_phone, vl_balance)
            VALUES (%s, %s, %s, %s, %s)
        """
        values = (
            data['co_name'], data['cg_address'], data['cg_city'],
            data['co_phone'], data['vl_balance']
        )
        cur.execute(query, values)
        mysql.connection.commit()  # Commit na transação
        cur.close()
        return jsonify({'client': data}), 201  # Padroniza a chave como 'client'
    except Exception as e:
        return jsonify({'error': f'Erro ao criar cliente: {str(e)}'}), 500

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        cur = get_cursor()  # Obtém o cursor de maneira segura
        cur.execute("SELECT * FROM tb_products")
        products = cur.fetchall()
        columns = [desc[0] for desc in cur.description]
        result = [dict(zip(columns, row)) for row in products]
        cur.close()
        return jsonify({'tbProducts': result})
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar produtos: {str(e)}'}), 500

@app.route('/api/products', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        cur = get_cursor()  # Obtém o cursor de maneira segura
        query = """
            INSERT INTO tb_products (co_name, cd_quantity, vl_value, co_description)
            VALUES (%s, %s, %s, %s)
        """
        values = (data['co_name'], data['cd_quantity'], data['vl_value'], data['co_description'])
        cur.execute(query, values)
        mysql.connection.commit()  # Commit na transação
        cur.close()
        return jsonify({'product': data}), 201
    except Exception as e:
        return jsonify({'error': f'Erro ao criar produto: {str(e)}'}), 500

# Rodando o servidor
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
