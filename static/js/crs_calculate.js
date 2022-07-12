
console.log(crs_form_answers)


// function calculate() {
// Core Factors:
var core_factors = 0;
var q3_age = 0;
var q4_education = 0;
var q5_fol_point = 0;
var q5_sol_point = 0;
var q6_canada_xp = 0;

// Spouse Factors:
var spouse_factors = 0;
var q11_spouse_education = 0;
var q12_spouse_xp = 0;
var q13_spouse_fol = 0;

// Skill Factors:
var skill_factors = 0;
var q4_q5 = 0; // Education + Language
var q4_q6i = 0; // Education + Cad Work Xp
var q6ii_q5 = 0; // For Work Xp + Language
var q6ii_q6i = 0; // For Work Xp + Cad Work Xp
var q7_q5 = 0; // Certificate + Language

// Bonus Factors:
var bonus_factors = 0;
var q10_sibling = 0;
var french = 0;
var canada_education = 0;
var job = 0;
var nomination = 0;

// Total:
var total = 0;

// Variables:
var answer;
var column_index;
var clb_s, clb_l, clb_r, clb_w;
var education, cad_xp_answer, for_xp_answer, certificate_answer;

// with_spouse_check

// Get value from q1-marital-status (q1)
var marital_status = crs_form_answers['q1']
if (marital_status == "B" || marital_status == "E") {
    hide_show(["q2i-spouse-cit"], "show");
    var spouse_cit = crs_form_answers['q2i']
    if (spouse_cit == "A") {
        var spouse_joining = crs_form_answers['q2ii']
        if (spouse_joining == "B") {
            with_spouse = true;
        } else{
            with_spouse = false;
        }
    } else {
        with_spouse = false;
    }
} else { // single
    with_spouse = false;
}

// A. Core Factors:
// q3_age
var answer_3 = crs_form_answers['q3']
if (with_spouse) {
    q3_age = find_point_from_table(answer_3, age_table, 2);
    var q3_age_max = 100;
}
else {
    q3_age = find_point_from_table(answer_3, age_table, 3);
    var q3_age_max = 110;
}

// q4_education:
var answer_4 = crs_form_answers['q4'];
if (with_spouse) {
    q4_education = find_point_from_table(answer_4, education_table, 2);
    var q4_education_max = 140;
}
else {
    q4_education = find_point_from_table(answer_4, education_table, 3);
    var q4_education_max = 150;
};

// q5_fol_point:
var answer_5i = crs_form_answers['q5i'];

var language_s = crs_form_answers['q5i-b-speaking'];
var language_l = crs_form_answers['q5i-b-listening'];
var language_r = crs_form_answers['q5i-b-reading'];
var language_w = crs_form_answers['q5i-b-writing'];


// Determine point when with/without spouse
if (with_spouse) {
    column_index = 6;
    var q5_fol_point_max = 128;
}
else {
    column_index = 7;
    var q5_fol_point_max = 136;
}

// CELPIP
if (answer_5i == "A") {
    q5_fol_point = find_point_from_table(language_s, celpip, column_index) +
                    find_point_from_table(language_l, celpip, column_index) +
                    find_point_from_table(language_r, celpip, column_index) +
                    find_point_from_table(language_w, celpip, column_index);
    clb_s = find_point_from_table(language_s, celpip, 5);
    clb_l = find_point_from_table(language_l, celpip, 5);
    clb_r = find_point_from_table(language_r, celpip, 5);
    clb_w = find_point_from_table(language_w, celpip, 5);
}
// IELTS
else if (answer_5i == "B") {
    q5_fol_point = find_point_from_table(language_s, ielts, column_index) +
                    find_point_from_table(language_l, ielts, column_index) +
                    find_point_from_table(language_r, ielts, column_index) +
                    find_point_from_table(language_w, ielts, column_index);
    clb_s = find_point_from_table(language_s, ielts, 5);
    clb_l = find_point_from_table(language_l, ielts, 5);
    clb_r = find_point_from_table(language_r, ielts, 5);
    clb_w = find_point_from_table(language_w, ielts, 5);
}

// TEF
else if (answer_5i == "C") {
    q5_fol_point = find_point_from_table(language_s, tef, column_index) +
                    find_point_from_table(language_l, tef, column_index) +
                    find_point_from_table(language_r, tef, column_index) +
                    find_point_from_table(language_w, tef, column_index);
    clb_s = find_point_from_table(language_s, tef, 5);
    clb_l = find_point_from_table(language_l, tef, 5);
    clb_r = find_point_from_table(language_r, tef, 5);
    clb_w = find_point_from_table(language_w, tef, 5);
}
// q5_sol_point:

var answer_5ii = crs_form_answers['q5ii']

// Determine point when with/without spouse
if (with_spouse) {
    column_index = 8;
    var q5_sol_point_max = 22;
}
else {
    column_index = 9;
    var q5_sol_point_max = 24;
}

if (answer_5ii != "Z") {
    language_s = crs_form_answers['q5ii-sol-speaking'];
    language_l = crs_form_answers['q5ii-sol-listening'];
    language_r = crs_form_answers['q5ii-sol-reading'];
    language_w = crs_form_answers['q5ii-sol-writing'];
    // CELPIP
    if (answer_5ii == "A") {
        q5_sol_point = find_point_from_table(language_s, celpip, column_index) +
            find_point_from_table(language_l, celpip, column_index) +
            find_point_from_table(language_r, celpip, column_index) +
            find_point_from_table(language_w, celpip, column_index);
    }
    // IELTS
    else if (answer_5ii == "B") {
        q5_sol_point = find_point_from_table(language_s, ielts, column_index) +
            find_point_from_table(language_l, ielts, column_index) +
            find_point_from_table(language_r, ielts, column_index) +
            find_point_from_table(language_w, ielts, column_index);
    }
    // TEF
    else if (answer_5ii == "C") {
        q5_sol_point = find_point_from_table(language_s, tef, column_index) +
            find_point_from_table(language_l, tef, column_index) +
            find_point_from_table(language_r, tef, column_index) +
            find_point_from_table(language_w, tef, column_index);
    }
    if (with_spouse) { q5_sol_point = Math.min(22, q5_sol_point); }
} else { q5_sol_point = 0; }

// q6_canada_xp
var answer_q6i = crs_form_answers['q6i']

if (with_spouse) {
    q6_canada_xp = find_point_from_table(answer_q6i, cad_xp, 2);
    var q6_canada_xp_max = 70;
}
else {
    q6_canada_xp = find_point_from_table(answer_q6i, cad_xp, 3);
    var q6_canada_xp_max = 80;
}

core_factors = q3_age + q4_education + q5_fol_point + q5_sol_point + q6_canada_xp;

// B. Spouse Factors:
if (with_spouse) {
    // q11_spouse_education
    var answer_q11 = crs_form_answers['q11']
    if (answer_q11 != 'badvalue') {
        q11_spouse_education = find_point_from_table(answer_q11, education_table, 4);
        var q11_spouse_education_max = 10;
    }
    // q12_spouse_xp
    var answer_q12 = crs_form_answers['q12']
    if (answer_q12 != 'badvalue') {
        q12_spouse_xp = find_point_from_table(answer_q12, cad_xp, 4);
        var q12_spouse_xp_max = 10;
    }
    var answer_q13i = crs_form_answers['q13i']
    // q13_spouse_fol
    if (answer_q13i != 'badvalue') {
        column_index = 10;
        var q13_spouse_fol_max = 20;
        var language_s = crs_form_answers['q13ii-fol-speaking']
        var language_l = crs_form_answers['q13ii-fol-listening']
        var language_r = crs_form_answers['q13ii-fol-reading']
        var language_w = crs_form_answers['q13ii-fol-writing']

        // CELPIP
        if (answer_q13i == "A") {
            q13_spouse_fol = find_point_from_table(language_s, celpip, column_index) +
                find_point_from_table(language_l, celpip, column_index) +
                find_point_from_table(language_r, celpip, column_index) +
                find_point_from_table(language_w, celpip, column_index);
        }

        // IELTS
        else if (answer_q13i == "B") {
            q13_spouse_fol = find_point_from_table(language_s, ielts, column_index) +
                find_point_from_table(language_l, ielts, column_index) +
                find_point_from_table(language_r, ielts, column_index) +
                find_point_from_table(language_w, ielts, column_index);
        }

        // TEF
        else if (answer_q13i == "C") {
            q13_spouse_fol = find_point_from_table(language_s, tef, column_index) +
                find_point_from_table(language_l, tef, column_index) +
                find_point_from_table(language_r, tef, column_index) +
                find_point_from_table(language_w, tef, column_index);
        }
    }
        spouse_factors = q11_spouse_education + q12_spouse_xp + q13_spouse_fol;
    }
    // C. Skill Factors:
    var clb_check = clb_level(clb_s, clb_l, clb_r, clb_w);

    education = crs_form_answers['q4']
    cad_xp_answer = crs_form_answers['q6i']
    for_xp_answer = crs_form_answers['q6ii']
    certificate_answer = crs_form_answers['q7']

    var q4_q5_max = 50;
    var q4_q6i_max = 50;
    // Education + Language, Education + Cad work xp
    if (education == "A" || education == "B") {
        q4_q5 = 0;
        q4_q6i = 0;
    }
    else if (education == "C" || education == "D" || education == "E") {
        if (clb_check == 3) { q4_q5 = 25; }
        else if (clb_check == 2) { q4_q5 = 13; }
        else { q4_q5 = 0; }

        if (cad_xp_answer == "C" || cad_xp_answer == "D" || cad_xp_answer == "E" || cad_xp_answer == "F") { q4_q6i = 25; }
        else if (cad_xp_answer == "B") { q4_q6i = 13; }
        else { q4_q6i = 0; }
    }
    else {
        if (clb_check == 3) { q4_q5 = 50; }
        else if (clb_check == 2) { q4_q5 = 25; }
        else { q4_q5 = 0; }

        if (cad_xp_answer == "C" || cad_xp_answer == "D" || cad_xp_answer == "E" || cad_xp_answer == "F") { q4_q6i = 50; }
        else if (cad_xp_answer == "B") { q4_q6i = 25; }
        else { q4_q6i = 0; }
    }

    // For work xp + Language, For work xp + Cad work xp
    var q6ii_q5_max = 50;
    var q6ii_q6i_max = 50;
    if (for_xp_answer == "A") {
        q6ii_q5 = 0;
        q6ii_q6i = 0;
    }
    else if (for_xp_answer == "B" || for_xp_answer == "C") {
        if (clb_check == 3) { q6ii_q5 = 25; }
        else if (clb_check == 2) { q6ii_q5 = 13; }
        else { q6ii_q5 = 0; }

        if (cad_xp_answer == "C" || cad_xp_answer == "D" || cad_xp_answer == "E" || cad_xp_answer == "F") { q6ii_q6i = 25; }
        else if (cad_xp_answer == "B") { q6ii_q6i = 13; }
        else { q6ii_q6i = 0; }
    }
    else {
        if (clb_check == 3) { q6ii_q5 = 50; }
        else if (clb_check == 2) { q6ii_q5 = 25; }
        else { q6ii_q5 = 0; }

        if (cad_xp_answer == "C" || cad_xp_answer == "D" || cad_xp_answer == "E" || cad_xp_answer == "F") { q6ii_q6i = 50; }
        else if (cad_xp_answer == "B") { q6ii_q6i = 25; }
        else { q6ii_q6i = 0; }
    }
    var q7_q5_max = 50;
    // Certificate + Language
    if (certificate_answer == "A") { q7_q5 = 0; }
    else {
        if (clb_check == 3 || clb_check == 2) { q7_q5 = 50; }
        else if (clb_check == 1) { q7_q5 = 25; }
        else { q7_q5 = 0; }
    }

    skill_factors = Math.min(100, q4_q5 + q4_q6i + q6ii_q5 + q6ii_q6i + q7_q5);

    // D. Bonus Factors:

    // Sibling in Canada
    answer_q10 = crs_form_answers['q10']
    var q10_sibling_max = 15;
    var french_max = 30;
    if (answer_q10 == "B") { q10_sibling = 15; }
    else { q10_sibling = 0}

    // French Test

    var q5ia_ans = crs_form_answers['q5i-a']
    
    if (q5ia_ans == "A") {
        french_fol = false;
        english_fol = true;
    }
    else if (q5ia_ans == "B") {
        french_fol = false;
        english_fol = true;
    }
    else if (q5ia_ans == "C") {
        french_fol = true;
        english_fol = false;
    }

var q5ii_ans = crs_form_answers['q5ii']

    if (q5ii_ans == "Z") {
        french_sol = false;
    }
    else {
        if (q5ii_ans == "A") {
            french_sol = false;
            english_sol = true;
        }

        else if (q5ii_ans == "B") {
            $("#q5ii-sol-speaking").append(get_option(ielts, 0, 1));
            $("#q5ii-sol-listening").append(get_option(ielts, 0, 2));
            $("#q5ii-sol-reading").append(get_option(ielts, 0, 3));
            $("#q5ii-sol-writing").append(get_option(ielts, 0, 4));
            french_sol = false;
            english_sol = true;
        }
        else if (q5ii_ans == "C") {
            $("#q5ii-sol-speaking").append(get_option(tef, 0, 1));
            $("#q5ii-sol-listening").append(get_option(tef, 0, 2));
            $("#q5ii-sol-reading").append(get_option(tef, 0, 3));
            $("#q5ii-sol-writing").append(get_option(tef, 0, 4));
            french_sol = true;
            english_sol = false;
        }

    if (french_fol || french_sol) {

        if (french_fol && active("q5i-b-fol")) {
            language_s = $("#q5i-b-speaking option:selected").val();
            language_l = $("#q5i-b-listening option:selected").val();
            language_r = $("#q5i-b-reading option:selected").val();
            language_w = $("#q5i-b-writing option:selected").val();
        }
        else if (french_sol && active("q5ii-b-sol")) {
            language_s = $("#q5ii-sol-speaking option:selected").val();
            language_l = $("#q5ii-sol-listening option:selected").val();
            language_r = $("#q5ii-sol-reading option:selected").val();
            language_w = $("#q5ii-sol-writing option:selected").val();
        }
        clb_s = find_point_from_table(language_s, tef, 5);
        clb_l = find_point_from_table(language_l, tef, 5);
        clb_r = find_point_from_table(language_r, tef, 5);
        clb_w = find_point_from_table(language_w, tef, 5);
        clb_check = clb_level(clb_s, clb_l, clb_r, clb_w);

        if (clb_check >= 2) {

            if ((english_fol && active("q5i-b-fol")) || (english_sol && active("q5ii-b-sol"))) {

                var temp_s, temp_l, temp_r, temp_w, temp_clb, test_type;
                if (english_fol) {
                    if ($("#q5ia option:selected").val() == "A") { test_type = celpip; }
                    else { test_type = ielts; }
                    temp_s = $("#q5i-b-speaking option:selected").val();
                    temp_l = $("#q5i-b-listening option:selected").val();
                    temp_r = $("#q5i-b-reading option:selected").val();
                    temp_w = $("#q5i-b-writing option:selected").val();
                }
                else if (english_sol) {
                    if ($("#q5ii option:selected").val() == "A") { test_type = celpip; }
                    else { test_type = ielts; }
                    temp_s = $("#q5ii-sol-speaking option:selected").val();
                    temp_l = $("#q5ii-sol-listening option:selected").val();
                    temp_r = $("#q5ii-sol-reading option:selected").val();
                    temp_w = $("#q5ii-sol-writing option:selected").val();
                }

                clb_s = find_point_from_table(temp_s, test_type, 5);
                clb_l = find_point_from_table(temp_l, test_type, 5);
                clb_r = find_point_from_table(temp_r, test_type, 5);
                clb_w = find_point_from_table(temp_w, test_type, 5);
                temp_clb = clb_level(clb_s, clb_l, clb_r, clb_w);

                if (temp_clb >= 2) { french = 30; }
                else { french = 15; }
            }
            else { french = 0; }
        }
    }
    else { french = 0; } // 여기는 잘 모르겠음.. 이게 왜 잇는지 잘 모르겠다
    // Education in Canada

    answer = $("#q4c option:selected").val();
    var canada_education_max = 30;
    if (answer == "A") { canada_education = 0; }
    else if (answer == "B") { canada_education = 15; }
    else if (answer == "C") { canada_education = 30; }

    // Employment
    var job_max = 200;
    if (active("q8-noc")) {
        answer = $("#q8a option:selected").val();
        if (answer == "A") { job = 200; }
        else if (answer == "B") { job = 50; }
        else { job = 0; }
    }

    // Nomination
    var nomination_max = 600;
    answer = $("#q9 option:selected").val();
    if (answer == "B") { nomination = 600; }
    else { nomination = 0; }

    bonus_factors = Math.min(600, q10_sibling + french + canada_education + job + nomination);

    total = core_factors + spouse_factors + skill_factors + bonus_factors;

    localStorage.setItem("Core_factors", core_factors);
    localStorage.setItem("Spouse_factors", spouse_factors);
    localStorage.setItem("Skill_factors", skill_factors);
    localStorage.setItem("Bonus_factors", bonus_factors);
    // core factors details
    localStorage.setItem("q3_age", q3_age);
    localStorage.setItem("q4_education", q4_education);
    localStorage.setItem("q5_fol_point", q5_fol_point);
    localStorage.setItem("q5_sol_point", q5_sol_point);
    localStorage.setItem("q6_canada_xp", q6_canada_xp);
    // spouse factors details
    localStorage.setItem("q11_spouse_education", q11_spouse_education);
    localStorage.setItem("q12_spouse_xp", q12_spouse_xp);
    localStorage.setItem("q13_spouse_fol", q13_spouse_fol);
    // skill factors details
    localStorage.setItem("q4_q5", q4_q5);
    localStorage.setItem("q4_q6i", q4_q6i);
    localStorage.setItem("q6ii_q5", q6ii_q5);
    localStorage.setItem("q6ii_q6i", q6ii_q6i);
    localStorage.setItem("q7_q5", q7_q5);
    // bonus factors details
    localStorage.setItem("q10_sibling", q10_sibling);
    localStorage.setItem("french", french);
    localStorage.setItem("canada_education", canada_education);
    localStorage.setItem("job", job);
    localStorage.setItem("nomination", nomination);
    // Each Maxiumn set details
    localStorage.setItem("q3_age_max", q3_age_max);
    localStorage.setItem("q4_education_max", q4_education_max);
    localStorage.setItem("q5_fol_point_max", q5_fol_point_max);
    localStorage.setItem("q5_sol_point_max", q5_sol_point_max);
    localStorage.setItem("q6_canada_xp_max", q6_canada_xp_max);
    localStorage.setItem("q11_spouse_education_max", q11_spouse_education_max);
    localStorage.setItem("q12_spouse_xp_max", q12_spouse_xp_max);
    localStorage.setItem("q13_spouse_fol_max", q13_spouse_fol_max);
    localStorage.setItem("q4_q5_max", q4_q5_max);
    localStorage.setItem("q4_q6i_max", q4_q6i_max);
    localStorage.setItem("q6ii_q5_max", q6ii_q5_max);
    localStorage.setItem("q6ii_q6i_max", q6ii_q6i_max);
    localStorage.setItem("q7_q5_max", q7_q5_max);
    localStorage.setItem("q10_sibling_max", q10_sibling_max);
    localStorage.setItem("french_max", french_max);
    localStorage.setItem("canada_education_max", canada_education_max);
    localStorage.setItem("job_max", job_max);
    localStorage.setItem("nomination_max", nomination_max);
    var spouse_check = 0;
    var spouse_check_number = 0;

    var marital_status = $("#q1 option:selected").val();
    if (marital_status != "badvalue") {
        // Not Single
        if (marital_status == "B" || marital_status == "E") {
            spouse_check = "Couple";
            spouse_check_number = 1;
        }
        // Single
        else {
            spouse_check = "Single"
            spouse_check_number = 0;
        }
    }
    localStorage.setItem("spouse_check", spouse_check);
    localStorage.setItem("spouse_check_number", spouse_check_number);

}


function get_option(table, f_column_i, s_column_i) {
    var options;
    for (i = 0; i < table.length; i++) {
        options += '<option value="' + table[i][f_column_i] + '"">' + table[i][s_column_i] + '</option>';
    }

    return options;
}

function clear_option(value) {
    value.empty();
    value.append('<option value="badvalue" selected disabled hidden> Select... </option>');
}

function find_point_from_table(value, table, column_i) {
    for (i = 0; i < table.length; i++) {
        if (value == table[i][0]) { return parseInt(table[i][column_i]); }
    }
}


// return 3 if all 9 or more
// return 2 if all 7 or more
function clb_level(clb_s, clb_l, clb_r, clb_w) {
    if (clb_s >= 9 && clb_l >= 9 && clb_r >= 9 && clb_w >= 9) { return 3; }
    else if (clb_s >= 7 && clb_l >= 7 && clb_r >= 7 && clb_w >= 7) { return 2; }
    else if (clb_s >= 5 && clb_l >= 5 && clb_r >= 5 && clb_w >= 5) { return 1; }
    else { return 0; }
}