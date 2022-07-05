# MySQL connection to database
import crs_scraper
import mysql.connector

def databaseCreate():
    # Configure connection
    connection = mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = '@Rkdrmsdn0831'
    )
    # Create database
    cursor = connection.cursor()
    cursor.execute("CREATE DATABASE data_db")
    print("Connection to MySQL Established!")
    insert_data()

def insert_data():
    # Configure connection
    connection = mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = '@Rkdrmsdn0831',
        database = 'data_db'
    )
    print("Connected to Database")
    cursor = connection.cursor()
    # Configuring data schema
    mySql_Drop_Table_Query = """
    DROP TABLE data_table
    """
    mySql_Create_Table_Query = """
    CREATE TABLE data_table(
    id varchar(200) NOT NULL,
    date_str varchar(200) NOT NULL,
    prgm_name varchar(200) NOT NULL,
    inv_num varchar(200) NOT NULL,
    crs_score varchar(200) NOT NULL,
    date_form varchar(200) NOT NULL,
    prgm_name2 varchar(200) NOT NULL,
    day_num varchar(200) NOT NULL,
    month_num varchar(200) NOT NULL,
    year_num varchar(200) NOT NULL
    )
    """
    cursor.execute(mySql_Drop_Table_Query)
    result = cursor.execute(mySql_Create_Table_Query)
    # Configuring Insert format with the value tyes (%s -> string)
    insert_query = """
    INSERT INTO data_table(id, date_str, prgm_name, inv_num, crs_score, date_form, prgm_name2, day_num, month_num, year_num)
    VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    for i in range(len(crs_scraper.id_inv)):
        records = (
            crs_scraper.id_inv[i],
            crs_scraper.date_str[i],
            crs_scraper.prgm_name[i],
            crs_scraper.inv_num[i],
            crs_scraper.crs_score[i],
            crs_scraper.date_form[i],
            crs_scraper.prgm_name2[i],
            crs_scraper.day_date_form[i],
            crs_scraper.month_date_form[i],
            crs_scraper.year_date_form[i]
        )
        cursor.execute(insert_query, records)
        connection.commit()
    cursor.close()
    connection.close()
    print('Data Inserted, Connection closed')

def get_data():
    connection = mysql.connector.connect(
        host = 'localhost',
        user = 'root',
        password = '@Rkdrmsdn0831',
        database = 'data_db'
    )
    cursor = connection.cursor()
    DDL_query = """
    SELECT * FROM data_table
    """
    cursor.execute(DDL_query)
    records = cursor.fetchall()

    # Parse the data to dictionary - list format:
    data_to_pass = dict()
    data_to_pass.update({
        'id': [row[0] for row in records],
        'date_str': [row[1] for row in records],
        'prgm_name': [row[2] for row in records],
        'inv_num': [row[3] for row in records],
        'crs_score': [row[4] for row in records],
        'date_form': [row[5] for row in records],
        'prgm_name2': [row[6] for row in records],
        'day_num': [row[7] for row in records],
        'month_num': [row[8] for row in records],
        'year_num': [row[9] for row in records],
    })

    cursor.close()
    connection.close()
    return data_to_pass

# Test the functions
if __name__ == "__main__":
    # insert_data()
    print(get_data())