
'''
{%...%} for statements
{{...}} for expressions to print output
{#...#} for comments
'''


from flask import Flask, redirect, url_for, render_template, request, jsonify, make_response
from flask.templating import render_template_string
import mysql_connect, crs_scraper
import mysql
from werkzeug import datastructures
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import re, json

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


def mysql_connection_data_db():
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='@Rkdrmsdn0831',
        database='data_db'
    )
    return connection


@app2.route('/login', methods=['POST'])
def login():
    # TODO: Write a script to get the data from data_table_questionaires to calculate the crs score.
    connection = mysql_connection_data_db()
    msg = ''
    if request.method == 'POST' and 'uname' in request.form and 'psw' in request.form:
        global username_, new_user, email_
        new_user = 'False'
        username_ = request.form['uname']
        password = request.form['psw']
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM user_accounts WHERE username = %s AND password = %s", ([username_, password]))
        account = cursor.fetchone()
        session = dict()
        if account:
            session['loggedin'] = True
            session['id'] = account[0]
            session['username'] = account[1]
            session['password'] = account[2]
            session['email'] = account[3]
            msg = 'Log in successful!'
            return render_template('question.html', username=username_, new_user=new_user)
        else:
            msg = "Incorrect username or password"

    return render_template('start.html', msg=msg)


@app2.route('/signup', methods=['POST'])
def signup():
    connection = mysql_connection_data_db()
    msg = ''
    if request.method == 'POST' and 'uname_signup' in request.form and 'psw_signup' in request.form and 'email_signup' in request.form:
        global username_, email_, new_user
        new_user = 'True'
        username_ = request.form['uname_signup']
        password = request.form['psw_signup']
        email_ = request.form['email_signup']
        cursor = connection.cursor()
        cursor.execute(
            'SELECT * FROM user_accounts WHERE email = %s OR username = %s', ([email_, username_]))
        account = cursor.fetchone()

        # Logic to find if the registration failure is coming from email or the username:
        if account:
            error_code = ''
            if username_ == account[1] and email_ == account[3]:
                error_code = 'registered username and email'
            elif username_ == account[1]:
                error_code = 'registered username'
            elif email_ == account[3]:
                error_code = 'registered email'

        if account:
            if error_code == 'regisered username and email' or error_code == 'registered username':
                msg = 'Username already exists'
                return render_template('start.html', msg=msg)
            elif error_code == 'registered email':
                msg = 'Registered email'
                return render_template('start.html', msg=msg)
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email_):
            msg = 'Invalid email address!'
            return render_template('start.html', msg=msg)
        elif not re.match(r'[A-Za-z0-9]+', username_):
            msg = 'Username must contain only characters and numbers!'
            return render_template('start.html', msg=msg)
        else:
            cursor.execute('INSERT INTO user_accounts VALUES (NULL, %s, %s, %s)', ([
                           username_, password, email_]))
            connection.commit()
            cursor.close()
            connection.close()
            msg = 'You have successfully registered !'
            return render_template('question.html', username=username_, msg=msg, new_user=new_user)


@app2.route('/question')
def question():
    return render_template('question.html')


@app2.route('/crs_form', methods=['POST'])
def crs_form():
    global username_, email_, new_user
    # questionaries
    q1, q2i, q2ii, q3, q4, q4b, q4c, q5i, q5i_a = '', '', '', '', '', '', '', '', ''
    q5i_b_speaking, q5i_b_listening, q5i_b_reading = '', '', ''
    q5i_b_writing, q5ii, q5ii_sol_speaking, q5ii_sol_listening = '', '', '', ''
    q5ii_sol_reading, q5ii_sol_writing, q6i, q6ii, q7 = '', '', '', '', ''
    q8, q8a, q9, q10, q11, q12, q13i, q13ii_fol_speaking = '', '', '', '', '', '', '', ''
    q13ii_fol_listening, q13ii_fol_reading, q13ii_fol_writing = '', '', ''

    # questions in string
    questions_in_string = ['q1', 'q2i', 'q2ii', 'q3', 'q4', 'q4b', 'q4c', 'q5i', 'q5i-a',
                           'q5i-b-speaking', 'q5i-b-listening', 'q5i-b-reading',
                           'q5i-b-writing', 'q5ii', 'q5ii-sol-speaking', 'q5ii-sol-listening',
                           'q5ii-sol-reading', 'q5ii-sol-writing', 'q6i', 'q6ii', 'q7',
                           'q8', 'q8a', 'q9', 'q10', 'q11', 'q12', 'q13i', 'q13ii-fol-speaking',
                           'q13ii-fol-listening', 'q13ii-fol-reading', 'q13ii-fol-writing']

    crs_form_dict = dict()
    crs_form_dict['username'] = username_
    crs_form_dict['email'] = email_
    for strs in questions_in_string:
        try:
            crs_form_dict.update({strs: request.form[strs]})
        except:
            crs_form_dict.update({strs: 'badvalue'})

    output = request.get_json()
    print(output)
    print(type(output))
    result = json.loads(output)
    print(result)
    print(type(result))
    # return result
    

    # Gotta check if the username and email has any match with the existing table from the database:
    connection = mysql_connection_data_db()
    cursor = connection.cursor()
    cursor.execute(
        'SELECT * FROM data_table_questionaires WHERE email_ = %s OR username_ = %s', ([email_, username_]))
    account = cursor.fetchone()
    if not account:  # if user does not exists: if it is a new user
        # Insert to the data_table_questionaires
        new_user = 'False'
        connection = mysql_connection_data_db()
        cursor = connection.cursor()
        cursor.execute(
            'INSERT INTO data_table_questionaires \
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s,\
                    %s, %s, %s, %s, %s, %s, %s, %s,\
                    %s, %s, %s, %s, %s, %s, %s, %s,\
                    %s, %s, %s, %s, %s, %s, %s, %s)',
            (list(crs_form_dict.values())))
        connection.commit()
        cursor.close()
        connection.close()
    else:  # If returning user or the username_ and email_ exists in the database
        # Update to the data_table_questionaires
        new_user = 'False'
        crs_form_dict_values = list(crs_form_dict.values())
        crs_form_dict_values = crs_form_dict_values[2:]
        crs_form_dict_values = crs_form_dict_values + [username_, email_]
        print(crs_form_dict_values)
        connection = mysql_connection_data_db()
        cursor = connection.cursor()
        cursor.execute(
            'UPDATE data_table_questionaires \
            SET q1 = %s, q2i = %s, q2ii = %s, q3 = %s, q4 = %s, q4b = %s, q4c = %s, q5i = %s, \
                q5i_a = %s, q5i_b_speaking = %s, q5i_b_listening = %s, q5i_b_reading = %s,\
                q5i_b_writing = %s, q5ii = %s, q5ii_sol_speaking = %s, q5ii_sol_listening = %s, \
                q5ii_sol_reading = %s, q5ii_sol_writing = %s, q6i = %s, q6ii = %s, q7 = %s, \
                q8 = %s, q8a = %s, q9 = %s, q10 = %s, q11 = %s, q12 = %s, q13i = %s, q13ii_fol_speaking = %s, \
                q13ii_fol_listening = %s, q13ii_fol_reading = %s, q13ii_fol_writing = %s \
            WHERE username_ = %s AND email_ = %s', (crs_form_dict_values))
    mysql_connect.crs_insert_data()
    scraped_data = mysql_connect.get_data()
    
    return render_template('summary.html', crs_form_data = crs_form_dict, scraped_data = scraped_data, new_user = new_user)


@app2.route('/summary')
def summary():
    global scraped_data
    mysql_connect.crs_insert_data()
    scraped_data = mysql_connect.get_data()
    return render_template('summary.html', scraped_data = scraped_data)


@app2.route('/Improve_My_CRS')
def Improve_My_CRS():
    return render_template('Improve_My_CRS.html')

@app2.context_processor
def context_processor():
    return dict(username=username_, email=email_, new_user=new_user)


if __name__ == "__main__":
    app2.run(debug=True)
