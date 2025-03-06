import sys
import os
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from datetime import datetime

# Configuração do app
app = Flask(__name__)

# Configuração do SQLite com caminho dinâmico
if getattr(sys, 'frozen', False):
    # Caminho para o diretório de trabalho atual (onde o executável está sendo executado)
    base_path = os.path.dirname(sys.executable)
    db_path = f"sqlite:///{os.path.join(base_path, 'projeto.db')}"
else:
    # Caminho relativo ao diretório atual quando rodando como script
    db_path = "sqlite:///projeto.db"

app.config['SQLALCHEMY_DATABASE_URI'] = db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# Modelos das tabelas (sem alterações)
class Sale(db.Model):
    __tablename__ = 'tb_sale'
    CO_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    DT_DATE = db.Column(db.Date)
    CO_CLIENT = db.Column(db.String(255))
    CG_CITY = db.Column(db.String(255))
    CO_PRODUCT = db.Column(db.String(255))
    CD_QUANTITY = db.Column(db.Integer)
    VL_VALUE = db.Column(db.Float)
    CO_SELLER = db.Column(db.String(255))
    VL_PAID = db.Column(db.Float, default=0.0)

class Client(db.Model):
    __tablename__ = 'tb_client'
    CO_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CO_NAME = db.Column(db.String(255))
    CG_ADDRESS = db.Column(db.String(255))
    CG_CITY = db.Column(db.String(255))
    CO_PHONE = db.Column(db.String(20))
    VL_BALANCE = db.Column(db.Float)

class Product(db.Model):
    __tablename__ = 'tb_product'
    CO_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    CO_NAME = db.Column(db.String(255))
    CD_QUANTITY = db.Column(db.Integer)
    VL_VALUE = db.Column(db.Float)
    CO_DESCRIPTION = db.Column(db.Text)

class Spent(db.Model):
    __tablename__ = 'tb_spent'
    CO_ID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    DT_DATE = db.Column(db.Date)
    VL_VALUE = db.Column(db.Float)
    CO_DESCRIPTION = db.Column(db.Text)
    CO_TYPE = db.Column(db.String(255))

# Cria o banco de dados e tabelas (se não existirem)
with app.app_context():
    db.create_all()

# Função para limpar todas as tabelas
def clear_all_tables():
    try:
        with app.app_context():
            db.session.query(Sale).delete()
            db.session.query(Client).delete()
            db.session.query(Product).delete()
            db.session.query(Spent).delete()
            db.session.execute(
                text("CREATE TABLE IF NOT EXISTS sqlite_sequence (name TEXT, seq INTEGER);")
            )
            db.session.execute(
                text("DELETE FROM sqlite_sequence WHERE name IN ('tb_sale', 'tb_client', 'tb_product', 'tb_spent');")
            )
            db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        print(f"Erro ao limpar tabelas: {str(e)}")
        return False

# Rotas da API
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/sales', methods=['GET'])
def get_sales():
    sales = Sale.query.all()
    result = [{
        'CO_ID': s.CO_ID,
        'DT_DATE': s.DT_DATE.strftime('%Y-%m-%d') if s.DT_DATE else None,
        'CO_CLIENT': s.CO_CLIENT,
        'CG_CITY': s.CG_CITY,
        'CO_PRODUCT': s.CO_PRODUCT,
        'CD_QUANTITY': s.CD_QUANTITY,
        'VL_VALUE': s.VL_VALUE,
        'CO_SELLER': s.CO_SELLER,
        'VL_PAID': s.VL_PAID
    } for s in sales]
    return jsonify({'tbSales': result})

@app.route('/sales', methods=['POST'])
def create_sale():
    try:
        data = request.get_json()
        vl_paid = data.get('VL_PAID', 0.0)
        dt_date = datetime.strptime(data['DT_DATE'], '%Y-%m-%d').date() if data['DT_DATE'] else None
        new_sale = Sale(
            DT_DATE=dt_date,
            CO_CLIENT=data['CO_CLIENT'],
            CG_CITY=data['CG_CITY'],
            CO_PRODUCT=data['CO_PRODUCT'],
            CD_QUANTITY=data['CD_QUANTITY'],
            VL_VALUE=data['VL_VALUE'],
            CO_SELLER=data['CO_SELLER'],
            VL_PAID=vl_paid
        )
        difference = vl_paid - data['VL_VALUE']
        client = Client.query.filter_by(CO_NAME=data['CO_CLIENT']).first()
        if client:
            client.VL_BALANCE = client.VL_BALANCE or 0
            if difference < 0:
                client.VL_BALANCE += difference
            elif difference > 0:
                client.VL_BALANCE += difference
        db.session.add(new_sale)
        db.session.commit()
        return jsonify({'sale': {
            'CO_ID': new_sale.CO_ID,
            'DT_DATE': new_sale.DT_DATE.strftime('%Y-%m-%d') if new_sale.DT_DATE else None,
            'CO_CLIENT': new_sale.CO_CLIENT,
            'CG_CITY': new_sale.CG_CITY,
            'CO_PRODUCT': new_sale.CO_PRODUCT,
            'CD_QUANTITY': new_sale.CD_QUANTITY,
            'VL_VALUE': new_sale.VL_VALUE,
            'CO_SELLER': new_sale.CO_SELLER,
            'VL_PAID': new_sale.VL_PAID
        }}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@app.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    result = [{
        'CO_ID': c.CO_ID,
        'CO_NAME': c.CO_NAME,
        'CG_ADDRESS': c.CG_ADDRESS,
        'CG_CITY': c.CG_CITY,
        'CO_PHONE': c.CO_PHONE,
        'VL_BALANCE': c.VL_BALANCE
    } for c in clients]
    return jsonify({'tbClients': result})

@app.route('/clients', methods=['POST'])
def create_client():
    data = request.get_json()
    new_client = Client(
        CO_NAME=data['CO_NAME'],
        CG_ADDRESS=data['CG_ADDRESS'],
        CG_CITY=data['CG_CITY'],
        CO_PHONE=data['CO_PHONE'],
        VL_BALANCE=data.get('VL_BALANCE', 0.0)
    )
    db.session.add(new_client)
    db.session.commit()
    return jsonify({'client': {
        'CO_ID': new_client.CO_ID,
        'CO_NAME': new_client.CO_NAME,
        'CG_ADDRESS': new_client.CG_ADDRESS,
        'CG_CITY': new_client.CG_CITY,
        'CO_PHONE': new_client.CO_PHONE,
        'VL_BALANCE': new_client.VL_BALANCE
    }}), 201

@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    result = [{
        'CO_ID': p.CO_ID,
        'CO_NAME': p.CO_NAME,
        'CD_QUANTITY': p.CD_QUANTITY,
        'VL_VALUE': p.VL_VALUE,
        'CO_DESCRIPTION': p.CO_DESCRIPTION
    } for p in products]
    return jsonify({'tbProducts': result})

@app.route('/products', methods=['POST'])
def create_product():
    data = request.get_json()
    new_product = Product(
        CO_NAME=data['CO_NAME'],
        CD_QUANTITY=data['CD_QUANTITY'],
        VL_VALUE=data['VL_VALUE'],
        CO_DESCRIPTION=data.get('CO_DESCRIPTION', '')
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify({'product': {
        'CO_ID': new_product.CO_ID,
        'CO_NAME': new_product.CO_NAME,
        'CD_QUANTITY': new_product.CD_QUANTITY,
        'VL_VALUE': new_product.VL_VALUE,
        'CO_DESCRIPTION': new_product.CO_DESCRIPTION
    }}), 201

@app.route('/spents', methods=['GET'])
def get_spents():
    spents = Spent.query.all()
    result = [{
        'CO_ID': s.CO_ID,
        'DT_DATE': s.DT_DATE.strftime('%Y-%m-%d') if s.DT_DATE else None,
        'VL_VALUE': s.VL_VALUE,
        'CO_DESCRIPTION': s.CO_DESCRIPTION,
        'CO_TYPE': s.CO_TYPE
    } for s in spents]
    return jsonify({'tbSpents': result})

@app.route('/spents', methods=['POST'])
def create_spent():
    data = request.get_json()
    try:
        dt_date = datetime.strptime(data['DT_DATE'], '%Y-%m-%d').date() if data['DT_DATE'] else None
        new_spent = Spent(
            DT_DATE=dt_date,
            VL_VALUE=data['VL_VALUE'],
            CO_DESCRIPTION=data['CO_DESCRIPTION'],
            CO_TYPE=data['CO_TYPE']
        )
        db.session.add(new_spent)
        db.session.commit()
        return jsonify({'spent': {
            'CO_ID': new_spent.CO_ID,
            'DT_DATE': new_spent.DT_DATE.strftime('%Y-%m-%d') if new_spent.DT_DATE else None,
            'VL_VALUE': new_spent.VL_VALUE,
            'CO_DESCRIPTION': new_spent.CO_DESCRIPTION,
            'CO_TYPE': new_spent.CO_TYPE
        }}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/clear_tables', methods=['POST'])
def clear_tables_route():
    if clear_all_tables():
        return jsonify({'message': 'Todas as tabelas foram limpas com sucesso'}), 200
    else:
        return jsonify({'error': 'Erro ao limpar as tabelas'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)