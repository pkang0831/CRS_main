USE data_db;

CREATE TABLE IF NOT EXISTS user_accounts (
	id varchar(200) NOT NULL,
    username varchar(200) NOT NULL,
    password varchar(200) NOT NULL,
    email varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS data_table_qna (
    q1 varchar(200) NOT NULL,
    q2i varchar(200) NOT NULL,
    q2ii varchar(200) NOT NULL,
    q3 varchar(200) NOT NULL,
    q4 varchar(200) NOT NULL,
    q4b varchar(200) NOT NULL,
    q4c varchar(200) NOT NULL,
    q5i varchar(200) NOT NULL,
    q5i_a varchar(200) NOT NULL,
    q5i_b_speaking varchar(200) NOT NULL,
    q5i_b_listening varchar(200) NOT NULL,
    q5i_b_reading varchar(200) NOT NULL,
    q5i_b_writing varchar(200) NOT NULL,
    q5ii varchar(200) NOT NULL,
    q5ii_sol_speaking varchar(200) NOT NULL,
    q5ii_sol_listening varchar(200) NOT NULL,
    q5ii_sol_reading varchar(200) NOT NULL,
    q5ii_sol_writing varchar(200) NOT NULL,
    q6i varchar(200) NOT NULL,
    q6ii varchar(200) NOT NULL,
    q7 varchar(200) NOT NULL,
    q8 varchar(200) NOT NULL,
    q8a varchar(200) NOT NULL,
    q9 varchar(200) NOT NULL,
    q10 varchar(200) NOT NULL,
    q11 varchar(200) NOT NULL,
    q12 varchar(200) NOT NULL,
    q13i varchar(200) NOT NULL,
    q13ii_fol_speaking varchar(200) NOT NULL,
    q13ii_fol_listening varchar(200) NOT NULL,
    q13ii_fol_reading varchar(200) NOT NULL,
    q13ii_fol_writing varchar(200) NOT NULL,
    Core_factors varchar(200) NOT NULL,
    Spouse_factors varchar(200) NOT NULL,
    Skill_factors varchar(200) NOT NULL,
    Bonus_factors varchar(200) NOT NULL,
    q3_age varchar(200) NOT NULL,
    q4_education varchar(200) NOT NULL,
    q5_fol_point varchar(200) NOT NULL,
    q5_sol_point varchar(200) NOT NULL,
    q6_canada_xp varchar(200) NOT NULL,
    q11_spouse_education varchar(200) NOT NULL,
    q12_spouse_xp varchar(200) NOT NULL,
    q13_spouse_fol varchar(200) NOT NULL,
    q4_q5 varchar(200) NOT NULL,
    q4_q6i varchar(200) NOT NULL,
    q6ii_q5 varchar(200) NOT NULL,
    q6ii_q6i varchar(200) NOT NULL,
    q7_q5 varchar(200) NOT NULL,
    q10_sibling varchar(200) NOT NULL,
    french varchar(200) NOT NULL,
    canada_education varchar(200) NOT NULL,
    job varchar(200) NOT NULL,
    nomination varchar(200) NOT NULL,
    email_ varchar(200) NOT NULL,
	username_ varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS data_with_predictions (
	id varchar(200) NOT NULL,
    date_str varchar(200) NOT NULL,
    prgm_name varchar(200) NOT NULL,
    crs_score varchar(200) NOT NULL,
    inv_num varchar(200) NOT NULL,
    date_form varchar(200) NOT NULL,
    prgm_name2 varchar(200) NOT NULL,
    day_num varchar(200) NOT NULL,
    month_num varchar(200) NOT NULL,
    year_num varchar(200) NOT NULL,
    prediction varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS prediction (
	id varchar(200) NOT NULL,
    actual varchar(200) NOT NULL,
    prediction varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS data_table (
	id varchar(200) NOT NULL,
    date_str varchar(200) NOT NULL,
    prgm_name varchar(200) NOT NULL,
    crs_score varchar(200) NOT NULL,
    inv_num varchar(200) NOT NULL,
    date_form varchar(200) NOT NULL,
    prgm_name2 varchar(200) NOT NULL,
    day_num varchar(200) NOT NULL,
    month_num varchar(200) NOT NULL,
    year_num varchar(200) NOT NULL
);