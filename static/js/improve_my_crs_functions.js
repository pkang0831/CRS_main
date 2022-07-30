
google.charts.load('current', { 'packages': ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawChart);

var Core = crs_form_answers['Core_factors'];
var Spouse = crs_form_answers['Spouse_factors'];
var Skill = crs_form_answers['Skill_factors'];
var Bonus = crs_form_answers['Bonus_factors'];
// core factors details
var q3_age = crs_form_answers["q3_age"];
var q4_education = crs_form_answers["q4_education"];
var q5_fol_point = crs_form_answers["q5_fol_point"];
var q5_sol_point = crs_form_answers["q5_sol_point"];
var q6_canada_xp = crs_form_answers["q6_canada_xp"];
// spouse factors details
var q11_spouse_education = crs_form_answers["q11_spouse_education"];
var q12_spouse_xp = crs_form_answers["q12_spouse_xp"];
var q13_spouse_fol = crs_form_answers["q13_spouse_fol"];
// skill factors details
var q4_q5 = crs_form_answers["q4_q5"];
var q4_q6i = crs_form_answers["q4_q6i"];
var q6ii_q5 = crs_form_answers["q6ii_q5"];
var q6ii_q6i = crs_form_answers["q6ii_q6i"];
var q7_q5 = crs_form_answers["q7_q5"];
// bonus factors details
var q10_sibling = crs_form_answers["q10_sibling"];
var french = crs_form_answers["french"];
var canada_education = crs_form_answers["canada_education"];
var job = crs_form_answers["job"];
var nomination = crs_form_answers["nomination"];

// Recorded answers:
var q1_resp = crs_form_answers['q1'];
var q2i_resp = crs_form_answers['q2i'];
var q2ii_resp = crs_form_answers['q2ii'];
var q3_resp = crs_form_answers['q3'];
var q4_resp = crs_form_answers['q4'];
var q4b_resp = crs_form_answers['q4b'];
var q4c_resp = crs_form_answers['q4c'];
var q5i_resp = crs_form_answers['q5i'];
var q5ia_resp = crs_form_answers['q5i_a'];
var q5ib_s_resp = crs_form_answers['q5i_b_speaking'];
var q5ib_l_resp = crs_form_answers['q5i_b_listening'];
var q5ib_r_resp = crs_form_answers['q5i_b_reading'];
var q5ib_w_resp = crs_form_answers['q5i_b_writing'];
var q5ii_resp = crs_form_answers['q5ii'];
var q5ii_s_resp = crs_form_answers['q5ii_sol_speaking'];
var q5ii_l_resp = crs_form_answers['q5ii_sol_listening'];
var q5ii_r_resp = crs_form_answers['q5ii_sol_reading'];
var q5ii_w_resp = crs_form_answers['q5ii_sol_writing'];
var q6i_resp = crs_form_answers['q6i'];
var q6ii_resp = crs_form_answers['q6ii'];
var q7_resp = crs_form_answers['q7'];
var q8_resp = crs_form_answers['q8'];
var q8a_resp = crs_form_answers['q8a'];
var q9_resp = crs_form_answers['q9'];
var q10_resp = crs_form_answers['q10'];
var q11_resp = crs_form_answers['q11'];
var q12_resp = crs_form_answers['q12'];
var q13i_resp = crs_form_answers['q13i'];
var q13ii_s_resp = crs_form_answers['q13ii_fol_speaking'];
var q13ii_l_resp = crs_form_answers['q13ii_fol_listening'];
var q13ii_r_resp = crs_form_answers['q13ii_fol_reading'];
var q13ii_w_resp = crs_form_answers['q13ii_fol_writing'];

var q1_resp_converted = find_string_from_table(q1_resp, q1_response_conv, 1)
var q2i_resp_converted = find_string_from_table(q2i_resp, q2i_response_conv, 1)
var q2ii_resp_converted = find_string_from_table(q2ii_resp, q2ii_response_conv, 1)
var q3_resp_converted = find_string_from_table(q3_resp, q3_response_conv, 1)
var q4_resp_converted = find_string_from_table(q4_resp, q4_response_conv, 1)
var q4b_resp_converted = find_string_from_table(q4b_resp, q4b_response_conv, 1)
var q4c_resp_converted = find_string_from_table(q4c_resp, q4c_response_conv, 1)
var q5i_resp_converted = find_string_from_table(q5i_resp, q5i_response_conv, 1)
var q5ia_resp_converted = find_string_from_table(q5ia_resp, q5ia_response_conv, 1);
var q5ib_s_resp_converted = find_string_from_table(q5ib_s_resp, q5ib_speaking_response_conv, 1);
var q5ib_l_resp_converted = find_string_from_table(q5ib_l_resp, q5ib_listening_response_conv, 1);
var q5ib_r_resp_converted = find_string_from_table(q5ib_r_resp, q5ib_reading_response_conv, 1);
var q5ib_w_resp_converted = find_string_from_table(q5ib_w_resp, q5ib_writing_response_conv, 1);
var q5ii_resp_converted = find_string_from_table(q5ii_resp, q5ii_response_conv, 1);
var q5ii_s_resp_converted = find_string_from_table(q5ii_s_resp, q5ii_b_speaking_response_conv, 1);
var q5ii_l_resp_converted = find_string_from_table(q5ii_l_resp, q5ii_b_listening_response_conv, 1);
var q5ii_r_resp_converted = find_string_from_table(q5ii_r_resp, q5ii_b_reading_response_conv, 1);
var q5ii_w_resp_converted = find_string_from_table(q5ii_w_resp, q5ii_b_writing_response_conv, 1);
var q6i_resp_converted = find_string_from_table(q6i_resp, q6i_response_conv, 1);
var q6ii_resp_converted = find_string_from_table(q6ii_resp, q6ii_response_conv, 1);
var q7_resp_converted = find_string_from_table(q7_resp, q7_response_conv, 1);
var q8_resp_converted = find_string_from_table(q8_resp, q8_response_conv, 1);
var q8a_resp_converted = find_string_from_table(q8a_resp, q8a_response_conv, 1);
var q9_resp_converted = find_string_from_table(q9_resp, q9_response_conv, 1);
var q10_resp_converted = find_string_from_table(q10_resp, q10_response_conv, 1);
var q11_resp_converted = find_string_from_table(q11_resp, q11_response_conv, 1);
var q12_resp_converted = find_string_from_table(q12_resp, q12_response_conv, 1);
var q13i_resp_converted = find_string_from_table(q13i_resp, q13i_response_conv, 1);
var q13ii_s_resp_converted = find_string_from_table(q13ii_s_resp, q13ii_b_speaking_response_conv, 1);
var q13ii_l_resp_converted = find_string_from_table(q13ii_l_resp, q13ii_b_listening_response_conv, 1);
var q13ii_r_resp_converted = find_string_from_table(q13ii_r_resp, q13ii_b_reading_response_conv, 1);
var q13ii_w_resp_converted = find_string_from_table(q13ii_w_resp, q13ii_b_writing_response_conv, 1);

var table_vars = [q1_resp_converted, q2i_resp_converted, q2ii_resp_converted, q3_resp_converted,
    q4_resp_converted, q4b_resp_converted, q4c_resp_converted, q5i_resp_converted, q5ia_resp_converted, q5ib_s_resp_converted,
    q5ib_l_resp_converted, q5ib_r_resp_converted, q5ib_w_resp_converted, q5ii_resp_converted, q5ii_s_resp_converted,
    q5ii_l_resp_converted, q5ii_r_resp_converted, q5ii_w_resp_converted, q6i_resp_converted, q6ii_resp_converted,
    q7_resp_converted, q8_resp_converted, q8a_resp_converted, q9_resp_converted, q10_resp_converted, q11_resp_converted,
    q12_resp_converted, q13i_resp_converted, q13ii_s_resp_converted, q13ii_l_resp_converted, q13ii_r_resp_converted,
    q13ii_w_resp_converted
];
var table_vars_id = ["q1_ans", "q2i_ans", 'q2ii_ans', 'q3_ans',
    'q4_ans', 'q4b_ans', 'q4c_ans', 'q5i_ans', 'q5ia_ans', 'q5ib_s_ans',
    'q5ib_l_ans', 'q5ib_r_ans', 'q5ib_w_ans', 'q5ii_ans', 'q5ii_s_ans',
    'q5ii_l_ans', 'q5ii_r_ans', 'q5ii_w_ans', 'q6i_ans', 'q6ii_ans',
    'q7_ans', 'q8_ans', 'q8a_ans', 'q9_ans', 'q10_ans', 'q11_ans',
    'q12_ans', 'q13i_ans', 'q13ii_s_ans', 'q13ii_l_ans', 'q13ii_r_ans',
    'q13ii_w_ans'
];

var option_select_ids = ["q1", "q2i", 'q2ii', 'q3',
    'q4', 'q4b', 'q4c', 'q5i', 'q5ia', 'q5ib_s',
    'q5ib_l', 'q5ib_r', 'q5ib_w', 'q5ii', 'q5ii_s',
    'q5ii_l', 'q5ii_r', 'q5ii_w', 'q6i', 'q6ii',
    'q7', 'q8', 'q8a', 'q9', 'q10', 'q11',
    'q12', 'q13i', 'q13ii_s', 'q13ii_l', 'q13ii_r',
    'q13ii_w'
];

var option_tables = [q1_response_conv, q2i_response_conv, q2ii_response_conv, q3_response_conv,
    q4_response_conv, q4b_response_conv, q4c_response_conv, q5i_response_conv, q5ia_response_conv, q5ib_speaking_response_conv,
    q5ib_listening_response_conv, q5ib_reading_response_conv, q5ib_writing_response_conv, q5ii_response_conv, q5ii_b_speaking_response_conv,
    q5ii_b_listening_response_conv, q5ii_b_reading_response_conv, q5ii_b_writing_response_conv, q6i_response_conv, q6ii_response_conv,
    q7_response_conv, q8_response_conv, q8a_response_conv, q9_response_conv, q10_response_conv, q11_response_conv,
    q12_response_conv, q13i_response_conv, q13ii_b_speaking_response_conv, q13ii_b_listening_response_conv, q13ii_b_reading_response_conv,
    q13ii_b_writing_response_conv
];

window.onload = function NA_opac() {
    table_vars.forEach((response, idx) => {
        var html_id = table_vars_id[idx];
        if (response == "Not Applicable") {
            document.getElementById(html_id).style.opacity = 0.4;
        }
    });
    // Add_options
    option_select_ids.forEach((response, idx) => {
        var option_tables_vals = option_tables[idx]
        $("#" + response).append(get_option(option_tables_vals,0,1));
    });
    $(function() {
        option_select_ids.forEach((response, idx) => {
            var option_vals = table_vars[idx]
            $('#' + response).val(option_vals).change()
        });
    });
}

// check if there is a spouse or not
if (crs_form_answers['q2i'] == "badvalue") { // means this individual is single applicant
    var spouse_check_number = 1
} else {
    var spouse_check_number = 0
}

function drawChart() {

    var main_columns = new google.visualization.arrayToDataTable([
        ['Category', 'Point_contribution', { role: "style" }],
        ['A. Core Factors', Core, 'blue'],
        ['B. Spouse Factors', Spouse, 'green'],
        ['C. Skill Factors', Skill, 'red'],
        ['D. Bonus Factors', Bonus, 'orange']
    ]);
    var options_columns = {
        height: 500,
        width: 1200,
        backgroundColor: '#f1f1f1',
        title: 'How can I change?',
        bar: { groupWidth: "20%" },
        legend: { position: 'none' }
    };
    var main_comparison = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
    main_comparison.draw(main_columns, options_columns);
}

if (spouse_check_number == 1) {
    single_point = 460;
} else {
    single_point = 500;
}

// Spouse scorecard
var scorecard_str
if (spouse_check_number == 1) {
    var Spouse = crs_form_answers['Spouse_factors'];
    var scorecard_str = Spouse + '/40 Points'
} else {
    var Spouse = 'Not Applicable'
    var scorecard_str = scorecard_str
}

// spouse factors details
if (spouse_check_number == 1) {
    var q11_spouse_education = '-';
    var q12_spouse_xp = '-';
    var q13_spouse_fol = '-';
} else {
    var q11_spouse_education = crs_form_answers["q11_spouse_education"];
    var q12_spouse_xp = crs_form_answers["q12_spouse_xp"];
    var q13_spouse_fol = crs_form_answers["q13_spouse_fol"];
}


function core_open() {
    var core_button = document.getElementById('core_details');
    if (core_button.style.display == "none") {
        core_button.style.display = "block";
    } else {
        core_button.style.display = "none";
    }
}

function spouse_open() {
    var spouse_button = document.getElementById('spouse_details');
    if (spouse_button.style.display == "none") {
        spouse_button.style.display = "block";
    } else {
        spouse_button.style.display = "none";
    }
}

function skill_open() {
    var skill_button = document.getElementById('skill_details');
    if (skill_button.style.display == "none") {
        skill_button.style.display = "block";
    } else {
        skill_button.style.display = "none";
    }
}

function bonus_open() {
    var bonus_button = document.getElementById('bonus_details');
    if (bonus_button.style.display == "none") {
        bonus_button.style.display = "block";
    } else {
        bonus_button.style.display = "none";
    }
}
// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");
// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");
// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
    if (mySidebar.style.display === 'block') {
        mySidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        mySidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}
// Close the sidebar with the close button
function w3_close() {
    mySidebar.style.display = "none";
    overlayBg.style.display = "none";
}

function find_string_from_table(value, table, column_i) {
    for (i = 0; i < table.length; i++) {
        if (value == table[i][0]) { return table[i][column_i]; }
    }
}


function get_option(table, f_column_i, s_column_i) {
    var options;
    for (i = 0; i < table.length; i++) {
        options += '<option value="' + table[i][s_column_i] + '"">' + table[i][s_column_i] + '</option>';
    }

    return options;
}






// // jquery for the functionalities
// $(document).ready(function () {
//     if (spouse_check_number == 1) {
//         $("#singleOrCoupleOptionsdiv input[type=radio]:eq(0)").click(function () {
//             console.log("single clicked");
//         });
//         $("#singleOrCoupleOptionsdiv input[type=radio]:eq(1)").click(function () {
//             console.log("couple clicked");
//         });
//         $("input[type=radio]:eq(0)").prop("checked", true).trigger("click");
//     } else {
//         $("#singleOrCoupleOptionsdiv input[type=radio]:eq(0)").click(function () {
//             console.log("single clicked");
//         });
//         $("#singleOrCoupleOptionsdiv input[type=radio]:eq(1)").click(function () {
//             console.log("couple clicked");
//         });
//         $("input[type=radio]:eq(1)").prop("checked", true).trigger("click");
//     }
// });