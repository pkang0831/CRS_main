
'''
{%...%} for statements
{{...}} for expressions to print output
{#...#} for comments
'''

from flask import Flask, redirect, url_for,render_template,request, jsonify, make_response
from flask.templating import render_template_string
import mysql_connect, crs_scraper
import mysql
from werkzeug import datastructures
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app2 = Flask(__name__)

def mysql_connection_data_db():
    connection = mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = '@Rkdrmsdn0831',
        database = 'data_db'
    )
    return connection

@app2.route('/')
def welcome():
    return render_template('start.html')

@app2.route('/signup', methods = ['POST'])
def signup():
    return None

@app2.route('/login', methods = ['POST'])
def login():
    return None

@app2.route('/question')
def question():
    return render_template('question.html')

@app2.route('/summary')
def summary():
    data = mysql_connect.get_data()
    return render_template('summary.html', data = data)

@app2.route('/Improve_My_CRS')
def Improve_My_CRS():
    return render_template('Improve_My_CRS.html')

# @app2.context_processor()
# def context_processor():
#     return dict()


if __name__=="__main__":
    app2.run(debug=True)
