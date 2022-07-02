
'''
{%...%} for statements
{{...}} for expressions to print output
{#...#} for comments
'''

from flask import Flask, redirect, url_for,render_template,request, jsonify, make_response
from flask.templating import render_template_string
from werkzeug import datastructures
from flask_sqlalchemy import SQLAlchemy

app2 = Flask(__name__)

@app2.route('/')
def welcome():
    return render_template('start.html')

@app2.route('/question')
def question():
    return render_template('question.html')

@app2.route('/summary')
def summary():
    return render_template('summary.html')

@app2.route('/Improve_My_CRS')
def Improve_My_CRS():
    return render_template('Improve_My_CRS.html')

# @app2.route('/')
# def practice_passing_num():
#     data = {'dummydata':'Hellolllll'}
#     return render_template('index_practice.html', data = make_response(jsonify(data),201))

# conn = pyodbc.connect(
#     'Driver = {SQL Server};'
#     'Server= sqldevarmsvruw2002.database.windows.net;'
#     'Database = edsdevarmsqluw2005;'
#     'Trusted_Connection=yes;'
# )
# cursor = conn.cursor()

if __name__=="__main__":
    app2.run(debug=True)
