import sys
import subprocess
import importlib

# Lista de dependências necessárias
DEPENDENCIES = ['flask', 'flask-cors', 'flask-mysqldb']


def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])


def check_dependencies():
    missing = []
    for package in DEPENDENCIES:
        try:
            importlib.import_module(package.replace('-', '_'))
        except ImportError:
            missing.append(package)

    if missing:
        print(f"Instalando dependências faltantes: {', '.join(missing)}")
        for package in missing:
            try:
                install(package)
            except subprocess.CalledProcessError as e:
                print(f"Erro ao instalar {package}: {e}")
                sys.exit(1)
        print("Dependências instaladas com sucesso!")


# Verifica e instala dependências antes de prosseguir
check_dependencies()

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL

# Criar e configurar o app Flask
app = Flask(__name__)

# Parâmetros fixos para conexão com o banco de dados
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Elefantevoador100%'
app.config['MYSQL_DB'] = 'projetos'

# Criar a instância MySQL
mysql = MySQL(app)

# Habilita CORS para todas as rotas
CORS(app)

# Função auxiliar para obter o cursor de maneira segura
def get_cursor():
    try:
        cursor = mysql.connection.cursor()
        return cursor
    except Exception as e:
        raise

# Rota de teste para verificar a conexão com o banco
@app.route('/test_db', methods=['GET'])
def test_db_connection():
    try:
        cursor = get_cursor()
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()
        cursor.close()
        return jsonify({
            'status': 'success',
            'message': 'Conexão com o banco de dados bem-sucedida!',
            'tables': [table[0] for table in tables]
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': f'Erro ao conectar ao banco de dados: {str(e)}'
        }), 500

# Rotas da API
@app.route('/sales', methods=['GET'])
def get_sales():
    try:
        print("Iniciando a busca de vendas no endpoint /sales")

        cursor = get_cursor()
        print("Cursor obtido com sucesso")

        cursor.execute("SELECT * FROM tb_sale")
        print("Consulta SQL executada: SELECT * FROM tb_sale")

        sales = cursor.fetchall()
        print(f"Dados brutos recuperados: {sales}")

        columns = [desc[0] for desc in cursor.description]
        print(f"Colunas da tabela: {columns}")

        result = [dict(zip(columns, row)) for row in sales]
        print(f"Resultado formatado como lista de dicionários: {result}")

        cursor.close()
        print("Cursor fechado")

        return jsonify({'tbSales': result})

    except Exception as e:
        print(f"Erro ao buscar vendas: {str(e)}")
        return jsonify({'error': f'Erro ao buscar vendas: {str(e)}'}), 500
@app.route('/sales', methods=['POST'])
def create_sale():
    try:
        data = request.get_json()
        cursor = get_cursor()
        query = """
            INSERT INTO tb_sale (DT_DATE, CO_CLIENT, CG_CITY, CO_PRODUCT, CD_QUANTITY, VL_VALUE, CO_SELLER)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data['DT_DATE'], data['CO_CLIENT'], data['CG_CITY'], data['CO_PRODUCT'],
            data['CD_QUANTITY'], data['VL_VALUE'], data['CO_SELLER']
        )
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return jsonify({'sale': data}), 201
    except Exception as e:
        return jsonify({'error': f'Erro ao criar venda: {str(e)}'}), 500

@app.route('/spents', methods=['GET'])
def get_spents():
    try:
        cursor = get_cursor()
        cursor.execute("SELECT * FROM tb_spent")
        spents = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        result = [dict(zip(columns, row)) for row in spents]
        cursor.close()
        return jsonify({'tbSpents': result})
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar despesas: {str(e)}'}), 500

@app.route('/spents', methods=['POST'])
def create_spent():
    try:
        data = request.get_json()
        cursor = get_cursor()
        query = """
            INSERT INTO tb_spent (DT_DATE, VL_VALUE, CO_DESCRIPTION, CO_TYPE)
            VALUES (%s, %s, %s, %s)
        """
        values = (data['DT_DATE'], data['VL_VALUE'], data['CO_DESCRIPTION'], data['CO_TYPE'])
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return jsonify({'spent': data}), 201
    except Exception as e:
        return jsonify({'error': f'Erro ao criar despesa: {str(e)}'}), 500

@app.route('/clients', methods=['GET'])
def get_clients():
    try:
        cursor = get_cursor()
        cursor.execute("SELECT * FROM tb_client")
        clients = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        result = [dict(zip(columns, row)) for row in clients]
        cursor.close()
        return jsonify({'tbClients': result})
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar clientes: {str(e)}'}), 500

@app.route('/clients', methods=['POST'])
def create_client():
    try:
        data = request.get_json()
        cursor = get_cursor()
        query = """
            INSERT INTO tb_client (CO_NAME, CG_ADDRESS, CG_CITY, CO_PHONE, VL_BALANCE)
            VALUES (%s, %s, %s, %s, %s)
        """
        values = (
            data['CO_NAME'], data['CG_ADDRESS'], data['CG_CITY'],
            data['CO_PHONE'], data['VL_BALANCE']
        )
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return jsonify({'client': data}), 201
    except Exception as e:
        return jsonify({'error': f'Erro ao criar cliente: {str(e)}'}), 500

@app.route('/products', methods=['GET'])
def get_products():
    try:
        cursor = get_cursor()
        cursor.execute("SELECT * FROM tb_product")
        products = cursor.fetchall()
        columns = [desc[0] for desc in cursor.description]
        result = [dict(zip(columns, row)) for row in products]
        cursor.close()
        return jsonify({'tbProducts': result})
    except Exception as e:
        return jsonify({'error': f'Erro ao buscar produtos: {str(e)}'}), 500

@app.route('/products', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        cursor = get_cursor()
        query = """
            INSERT INTO tb_product (CO_NAME, CD_QUANTITY, VL_VALUE, CO_DESCRIPTION)
            VALUES (%s, %s, %s, %s)
        """
        values = (data['CO_NAME'], data['CD_QUANTITY'], data['VL_VALUE'], data['CO_DESCRIPTION'])
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()
        return jsonify({'product': data}), 201
    except Exception as e:
        return jsonify({'error': f'Erro ao criar produto: {str(e)}'}), 500

# Rodando o servidor
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
