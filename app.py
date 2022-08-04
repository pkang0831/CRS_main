'''
{%...%} for statements
{{...}} for expressions to print output
{#...#} for comments
'''
from flask import Flask, redirect, url_for, render_template, request, jsonify
import mysql_connect
import mysql
import ml_model
import joblib
import re, json, os
import pandas as pd
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager,login_required,logout_user,current_user

app = Flask(__name__)

# Create a session
app.config['SECRET_KEY'] = os.urandom(32)

username_ = ''
password_ = ''
email_ = ''
new_user = 'False'
crs_form_dict = ''

# Initialize login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Loading the user, check if the user is active or not
@login_manager.user_loader
def load_user(username):
    return User(username, True)

# User class

class User(UserMixin):
    def __init__(self, username, active = True):
        self.username_ = username
        self.active = active
    
    def is_active(self):
        return self.active

    def is_anonymous(self):
        return False

    def is_authenticated(self):
        return True

    def get_id(self):
        return self.username_


def mysql_connection_data_db():
    connection = mysql.connector.connect(
        host = 'crs-data-db.cl1rhrzzpuez.us-east-2.rds.amazonaws.com',
        user = 'pkang0831',
        password = 'Rkdrmsdn0831',
        database = 'data_db'
    )
    return connection

def retrieve_profile_data(username, email):
    connection = mysql_connection_data_db()
    cursor = connection.cursor()
    query = """
    SELECT * FROM data_db.data_table_qna WHERE email_ = %s OR username_ = %s
    """
    cursor.execute(query, ([email, username]))
    columns = [fields_name for fields_name in cursor.description]
    returnData = cursor.fetchone()
    returndicts = dict()
    for i, val in zip(columns, returnData):
        returndicts.update({i[0]:val})
    if not returnData:
        return None
    else:
        return returndicts

@app.route('/')
def welcome():
    mysql_connect.crs_insert_data()
    return render_template('start.html')


@app.route('/login', methods=['GET','POST'])
def login():
    connection = mysql_connection_data_db()
    msg = ''
    if request.method == 'POST' and 'uname' in request.form and 'psw' in request.form:
        global username_, new_user, email_, crs_form_dict
        new_user = 'False'
        username_ = request.form['uname']
        password = request.form['psw']
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM user_accounts WHERE username = %s AND password = %s", ([username_, password]))
        account = cursor.fetchone()
        if account:
            email_ = account[3]
            crs_form_dict = retrieve_profile_data(username_, email_)
            msg = 'Log in successful!'
            user_obj = User(username_, True)
            login_user(user_obj)
            # return render_template('question.html', username=username_, new_user=new_user)
            return redirect(url_for('summary', username = username_, email = email_))
        else:
            msg = "Incorrect username or password"

    return render_template('start.html', msg=msg)


@app.route('/signup', methods=['GET','POST'])
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
            if error_code == 'registered username and email' or error_code == 'registered username':
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
            cursor.execute('INSERT INTO user_accounts VALUES (%s, %s, %s)', ([username_, password, email_]))
            connection.commit()
            cursor.close()
            connection.close()
            msg = 'You have successfully registered !'
            user_obj = User(username_, True)
            login_user(user_obj)
            return render_template('question.html', username=username_, msg=msg, new_user=new_user)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return render_template('start.html')


@app.route('/question')
@login_required
def question():
    return render_template('question.html')


@app.route('/crs_form', methods=['GET','POST'])
@login_required
def crs_form():
    global username_, email_, new_user, crs_form_dict
    output = request.get_json()
    result_dict = json.loads(output)
    
    result_dict['email'] = email_
    result_dict['username'] =   username_

    crs_form_dict = result_dict

    # Gotta check if the username and email has any match with the existing table from the database:
    connection = mysql_connection_data_db()
    cursor = connection.cursor()
    cursor.execute(
        'SELECT * FROM data_table_qna WHERE email_ = %s OR username_ = %s', ([email_, username_]))
    account = cursor.fetchone()
    if not account:  # if user does not exists: if it is a new user
        # Insert to the data_table_qna
        new_user = 'True'
        connection = mysql_connection_data_db()
        cursor = connection.cursor()
        cursor.execute(
            'INSERT INTO data_table_qna \
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, \
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, \
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, \
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, \
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, \
                    %s, %s, %s, %s, %s, %s)',
            (list(crs_form_dict.values())))
        connection.commit()
        cursor.close()
        connection.close()
    else:  # If returning user or the username_ and email_ exists in the database
        # Update to the data_table_qna
        new_user = 'False'
        connection = mysql_connection_data_db()
        cursor = connection.cursor()
        cursor.execute(
            'UPDATE data_table_qna \
            SET q1 = %s,\
                q2i = %s,\
                q2ii = %s,\
                q3 = %s,\
                q4 = %s,\
                q4b = %s,\
                q4c = %s,\
                q5i = %s,\
                q5i_a = %s,\
                q5i_b_speaking = %s,\
                q5i_b_listening = %s,\
                q5i_b_reading = %s,\
                q5i_b_writing = %s,\
                q5ii = %s,\
                q5ii_sol_speaking = %s,\
                q5ii_sol_listening = %s,\
                q5ii_sol_reading = %s,\
                q5ii_sol_writing = %s,\
                q6i = %s,\
                q6ii = %s,\
                q7 = %s,\
                q8 = %s,\
                q8a = %s,\
                q9 = %s,\
                q10 = %s,\
                q11 = %s,\
                q12 = %s,\
                q13i = %s,\
                q13ii_fol_speaking = %s,\
                q13ii_fol_listening = %s,\
                q13ii_fol_reading = %s,\
                q13ii_fol_writing = %s,\
                Core_factors = %s,\
                Spouse_factors = %s,\
                Skill_factors = %s,\
                Bonus_factors = %s,\
                q3_age = %s,\
                q4_education = %s,\
                q5_fol_point = %s,\
                q5_sol_point = %s,\
                q6_canada_xp = %s,\
                q11_spouse_education = %s,\
                q12_spouse_xp = %s,\
                q13_spouse_fol = %s,\
                q4_q5 = %s,\
                q4_q6i = %s,\
                q6ii_q5 = %s,\
                q6ii_q6i = %s,\
                q7_q5 = %s,\
                q10_sibling = %s,\
                french = %s,\
                canada_education = %s,\
                job = %s,\
                nomination = %s \
                WHERE email_ = %s AND username_ = %s', (list(crs_form_dict.values())))
        connection.commit()
        cursor.close()
        connection.close()
    
    return redirect(url_for('summary'))


@app.route('/summary')
@login_required
def summary():
    
    scraped_data = mysql_connect.get_data()
    # Statsmodels Holt's linear trend to implement time series MA calculations
    forecast_inv = ml_model.invitation_timeseries(scraped_data)
    # Assuming the program is "No program specified" and date difference is 14 days, we use the model pickles
    # to scale this data and use ml pickle to generate prediction on next CRS.
    program_assumption = [0 for i in range(len(forecast_inv))] # No program specified
    datedelta = [14.0 for i in range(len(forecast_inv))]
    predict_dataset = pd.DataFrame(
            {
                'prgm_name': program_assumption,
                'inv_num': forecast_inv,
                'dateDelta': datedelta
            }
        )
    scaler = joblib.load('std_scaler.bin')
    regressor = joblib.load('regressor.pkl')
    correction_factor = joblib.load('correction_factor.pkl')
    scaled_dataset = scaler.transform(predict_dataset)
    next_prediction = [i + correction_factor for i in regressor.predict(scaled_dataset)]
    next_prediction_to_pass = {
        'next_prediction': next_prediction
    }
    return render_template('summary.html', scraped_data = scraped_data, crs_form_data = crs_form_dict, crs_predict = next_prediction_to_pass)


@app.route('/Improve_My_CRS')
@login_required
def Improve_My_CRS():
    # TODO: AWS cloud EC2 그리고 web app deployment 어떻게 하는지 찾아보기
    return render_template('Improve_My_CRS.html', crs_form_data = crs_form_dict)

@app.context_processor
def context_processor():
    return dict(username=username_, email=email_, new_user=new_user)


if __name__ == "__main__":
    app.run(debug=True)
