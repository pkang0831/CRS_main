
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
var total = Core + Spouse + Skill + Bonus

var original_score = [total, Core, Spouse, Skill, Bonus, q3_age, q4_education, q5_fol_point, q5_sol_point, q6_canada_xp,
    q11_spouse_education, q12_spouse_xp, q13_spouse_fol, q4_q5, q4_q6i, q6ii_q5, q6ii_q6i, q7_q5, q10_sibling, french,
    canada_education, job, nomination]

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

var languages = [celpip, ielts, tef]

var option_tables_filtered = []

for (i = 0; i <= option_tables.length - 1; i++) {
    option_tables_filtered.push(option_tables[i].filter(item => item[0] != 'badvalue'));
}
// language test filters
var language_tables_filtered = []
var variables_that_needs_answer = [];
for (i = 0; i <= languages.length - 1; i++) {
    language_tables_filtered.push(languages[i].filter(item => item[0] != 'badvalue'));
}

window.onload = function NA_opac() {
    table_vars.forEach((response, idx) => {
        var html_id = table_vars_id[idx];
        if (response == "Not Applicable") {
            document.getElementById(html_id).style.opacity = 0.4;
        }
    });
    // Add_options
    option_select_ids.forEach((response, idx) => {
        var option_tables_vals = option_tables_filtered[idx]
        $("#" + response).append(get_option(option_tables_vals, 0, 1));
    });
    $(function () {
        option_select_ids.forEach((response, idx) => {
            var option_vals = table_vars[idx]
            $('#' + response).val(option_vals).change()
            if (option_vals == "Not Applicable") {
                document.getElementById(response).style.opacity = 0.4;
                document.getElementById(response).style.pointerEvents = "none";
            }
            if (response == "q5ii") {
                document.getElementById(response).style.opacity = 1;
                document.getElementById(response).style.pointerEvents = "fill";
            }
        });
    });
    // Section for the default setting changes
    function second_language_reset() {
        var q5ia_ans = $('#q5ia').val();
        var q5ii_ans = $('#q5ii option:selected').val()
        if (q5ia_ans == "CELPIP") {
            var q5ii_reformed_table = [];
            q5ii_reformed_table.push(q5ii_response_conv[3]);
            q5ii_reformed_table.push(q5ii_response_conv[4]);
            $("#q5ii").empty().append(get_option(q5ii_reformed_table, 0, 1));
        } else if (q5ia_ans == "IELTS") {
            var q5ii_reformed_table = [];
            q5ii_reformed_table.push(q5ii_response_conv[3]);
            q5ii_reformed_table.push(q5ii_response_conv[4]);
            $("#q5ii").empty().append(get_option(q5ii_reformed_table, 0, 1));
        } else if (q5ia_ans == "TEF") {
            var q5ii_reformed_table = [];
            q5ii_reformed_table.push(q5ii_response_conv[1]);
            q5ii_reformed_table.push(q5ii_response_conv[2]);
            q5ii_reformed_table.push(q5ii_response_conv[4]);
            $("#q5ii").empty().append(get_option(q5ii_reformed_table, 0, 1));
        }
        if (q5ii_ans == "Not Applicable") {
            $("#q5ii").val("Not Applicable").change()
        }
    }
    second_language_reset()
    perform_calculation()
    $("#q1").change(function () {
        var marital_status_simul = $("#q1 option:selected").val();
        // Not Single
        if (marital_status_simul == "Common-Law" || marital_status_simul == "Married") {
            hide_show(["q2i"], "show");
            hide_show(["q2ii"], "hide");
            $('#q2ii').val("Not Applicable").change()
        }
        // Single
        else {
            with_spouse = false;
            hide_show(["q2i", "q2ii", "q11", "q12", "q13i", "q13ii_s", "q13ii_l", "q13ii_r", "q13ii_w"], "hide");
            $('#q2i, #q2ii, #q11, #q12, #q13i, #q13ii_s, #q13ii_l, #q13ii_r, #q13ii_w').val("Not Applicable").change()
        }
        perform_calculation()
    });
    // Get value from q2i-spouse-cit (q2i)
    $("#q2i").change(function () {
        var spouse_cit_simul = $("#q2i option:selected").val();
        selected("q2i")
        if (spouse_cit_simul == "No") {
            hide_show(["q2ii"], "show");
        }
        else {
            with_spouse = false;
            hide_show(["q2ii", "q11", "q12", "q13i", "q13ii_s", "q13ii_l", "q13ii_r", "q13ii_w"], "hide");
            $('#q2ii, #q11, #q12, #q13i, #q13ii_s, #q13ii_l, #q13ii_r, #q13ii_w').val("Not Applicable").change()
        }
        perform_calculation()
    });
    // Get value from q2ii-spouse-joining (q2ii)
    $("#q2ii").change(function () {
        var spouse_joining_simul = $("#q2ii option:selected").val();
        selected("q2ii")
        if (spouse_joining_simul == "Yes") {
            with_spouse = true;
            hide_show(["q11", "q12", "q13i", "q13ii_s", "q13ii_l", "q13ii_r", "q13ii_w"], "show");
        } else {
            with_spouse = false;
            hide_show(["q11", "q12", "q13i", "q13ii_s", "q13ii_l", "q13ii_r", "q13ii_w"], "hide");
            $('#q11, #q12, #q13i, #q13ii_s, #q13ii_l, #q13ii_r, #q13ii_w').val("Not Applicable").change()
        }
        perform_calculation()
    });
    $('#q3').change(function () {
        var q3_ans_simul = $('#q3 option:selected').val();
        selected("q3")
        perform_calculation()
    });
    $('#q4').change(function () {
        var q4_ans_simul = $('#q4 option:selected').val();
        selected("q4")
        perform_calculation()
    });
    $("#q4b").change(function () {
        var q4b_ans_simul = $("#q4b option:selected").val();
        selected("q4b")
        if (q4b_ans_simul == "Yes") {
            hide_show(["q4c"], "show");
        }
        else {
            hide_show(["q4c"], "hide");
            $('#q4c').val("Not Applicable").change()
        }
        perform_calculation()
    });
    $('#q4c').change(function () {
        var q4c_ans_simul = $('#q4c option:selected').val();
        selected("q4c")
        perform_calculation()
    })
    $('#q5i').change(function () {
        var q5i_ans_simul = $("#q5i option:selected").val();
        selected("q5i")
        if (q5i_ans_simul == "Yes") {
            hide_show(["q1", "q2i", 'q2ii', 'q3',
                'q4', 'q4b', 'q4c', 'q5ia', 'q5ib_s',
                'q5ib_l', 'q5ib_r', 'q5ib_w', 'q5ii_s',
                'q5ii_l', 'q5ii_r', 'q5ii_w', 'q6i', 'q6ii',
                'q7', 'q8', 'q8a', 'q9', 'q10', 'q11',
                'q12', 'q13i', 'q13ii_s', 'q13ii_l', 'q13ii_r',
                'q13ii_w'], "show");
            option_select_ids.forEach((response, idx) => {
                var current_selection = $("#" + response + " option:selected").val();
                if (current_selection == "Not Applicable" || current_selection == null) {
                    hide_show([response], "hide")
                }
                if (response == 'q5ii') {
                    hide_show([response], "show")
                }
            });
        } else {
            hide_show(["q1", "q2i", 'q2ii', 'q3',
                'q4', 'q4b', 'q4c', 'q5ia', 'q5ib_s',
                'q5ib_l', 'q5ib_r', 'q5ib_w', 'q5ii_s',
                'q5ii_l', 'q5ii_r', 'q5ii_w', 'q6i', 'q6ii',
                'q7', 'q8', 'q8a', 'q9', 'q10', 'q11',
                'q12', 'q13i', 'q13ii_s', 'q13ii_l', 'q13ii_r',
                'q13ii_w'], "hide");
            window.alert('English result less than 2 years not applicable for the PR')
        }
        perform_calculation()
    });
    $('#q5ia').change(function () {
        var q5ia_ans_simul = $('#q5ia option:selected').val();
        selected('q5ia')
        if (q5ia_ans_simul == "CELPIP") {
            $("#q5ib_s").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q5ib_l").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q5ib_r").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q5ib_w").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q5ib_s,#q5ib_l,#q5ib_r,#q5ib_w").val("Not Applicable").change()
            french_fol = false;
            english_fol = true;
            second_language_reset()
            hide_show(['q5ib_s', 'q5ib_l', 'q5ib_r', 'q5ib_w'], "show")
        } else if (q5ia_ans_simul == "IELTS") {
            $("#q5ib_s").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q5ib_l").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q5ib_r").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q5ib_w").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q5ib_s,#q5ib_l,#q5ib_r,#q5ib_w").val("Not Applicable").change()
            french_fol = false;
            english_fol = true;
            second_language_reset()
            hide_show(['q5ib_s', 'q5ib_l', 'q5ib_r', 'q5ib_w'], "show")
            // should identify for the q5ii - option is only TEF or Not Applicable
        } else if (q5ia_ans_simul == "TEF") {
            $("#q5ib_s").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q5ib_l").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q5ib_r").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q5ib_w").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q5ib_s,#q5ib_l,#q5ib_r,#q5ib_w").val("Not Applicable").change()
            french_fol = true;
            english_fol = false;
            second_language_reset()
            hide_show(['q5ib_s', 'q5ib_l', 'q5ib_r', 'q5ib_w'], "show")
            // should identify for the q5ii - option is only CELPIP or IELTS or Not Applicable
        }
        perform_calculation()
    });
    $('#q5ib_s').change(function () {
        var q5ib_s_ans_simul = $('#q5ib_s option:selected').val()
        selected('q5ib_s')
        perform_calculation()
    });
    $('#q5ib_l').change(function () {
        var q5ib_l_ans_simul = $('#q5ib_l option:selected').val()
        selected('q5ib_l')
        perform_calculation()
    });
    $('#q5ib_r').change(function () {
        var q5ib_r_ans_simul = $('#q5ib_r option:selected').val()
        selected('q5ib_r')
        perform_calculation()
    });
    $('#q5ib_w').change(function () {
        var q5ib_w_ans_simul = $('#q5ib_w option:selected').val()
        selected('q5ib_w')
        perform_calculation()
    });
    $('#q5ii').change(function () {
        var q5ii_ans_simul = $('#q5ii option:selected').val();
        selected('q5ii')
        //hide show funtion comes in
        hide_show(['q5ii_s', 'q5ii_l', 'q5ii_r', 'q5ii_w'], "show");
        if (q5ii_ans_simul == "CELPIP") {
            $("#q5ii_s").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q5ii_l").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q5ii_r").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q5ii_w").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q5ii_s,#q5ii_l,#q5ii_r,#q5ii_w").val("Not Applicable").change()
            french_sol = false;
            english_sol = true;
            hide_show(['q5ii_s', 'q5ii_l', 'q5ii_r', 'q5ii_w'], "show")
        } else if (q5ii_ans_simul == "IELTS") {
            $("#q5ii_s").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q5ii_l").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q5ii_r").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q5ii_w").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q5ii_s,#q5ii_l,#q5ii_r,#q5ii_w").val("Not Applicable").change()
            french_sol = false;
            english_sol = true;
            hide_show(['q5ii_s', 'q5ii_l', 'q5ii_r', 'q5ii_w'], "show")
        } else if (q5ii_ans_simul == "TEF") {
            $("#q5ii_s").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q5ii_l").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q5ii_r").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q5ii_w").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q5ii_s,#q5ii_l,#q5ii_r,#q5ii_w").val("Not Applicable").change()
            french_sol = true;
            english_sol = false;
            hide_show(['q5ii_s', 'q5ii_l', 'q5ii_r', 'q5ii_w'], "show")
        } else {
            $("#q5ii_s").val("Not Applicable").change();
            $("#q5ii_l").val("Not Applicable").change();
            $("#q5ii_r").val("Not Applicable").change();
            $("#q5ii_w").val("Not Applicable").change();
            hide_show(['q5ii_s', 'q5ii_l', 'q5ii_r', 'q5ii_w'], "hide");
        }
        perform_calculation()
    });
    $('#q5ii_s').change(function () {
        var q5ii_s_ans_simul = $('#q5ii_s option:selected').val()
        selected('q5ii_s')
        perform_calculation()
    });
    $('#q5ii_l').change(function () {
        var q5ii_l_ans_simul = $('#q5ii_l option:selected').val()
        selected('q5ii_l')
        perform_calculation()
    });
    $('#q5ii_r').change(function () {
        var q5ii_r_ans_simul = $('#q5ii_r option:selected').val()
        selected('q5ii_r')
        perform_calculation()
    });
    $('#q5ii_w').change(function () {
        var q5ii_w_ans_simul = $('#q5ii_w option:selected').val()
        selected('q5ii_w')
        perform_calculation()
    });
    $('#q6i').change(function () {
        var q6i_ans_simul = $('#q6i option:selected').val()
        selected('q6i')
        perform_calculation()
    });
    $('#q6ii').change(function () {
        var q6ii_ans_simul = $('#q6ii option:selected').val()
        selected('q6ii')
        perform_calculation()
    });
    $('#q7').change(function () {
        var q7_ans_simul = $('#q7 option:selected').val()
        selected('q7')
        perform_calculation()
    });
    // LMIA?
    $('#q8').change(function () {
        var q8_ans_simul = $('#q8 option:selected').val()
        selected('q8')
        if (q8_ans_simul == "Yes") {
            // hideshow function
            hide_show(['q8a'], "show")
        } else {
            hide_show(['q8a'], "hide")
            $("#q8a").val("Not Applicable").change()
        }
        perform_calculation()
    });
    $('#q8a').change(function () {
        var q8a_ans_simul = $('#q8a option:selected').val()
        selected('q8a')
        perform_calculation()
    });
    $('#q9').change(function () {
        var q9_ans_simul = $('#q9 option:selected').val()
        selected('q9')
        perform_calculation()
    });
    $('#q10').change(function () {
        var q10_ans_simul = $('#q10 option:selected').val()
        selected('q10')
        perform_calculation()
    });
    $('#q11').change(function () {
        var q11_ans_simul = $('#q11 option:selected').val()
        selected('q11')
        perform_calculation()
    });
    $('#q12').change(function () {
        var q12_ans_simul = $('#q12 option:selected').val()
        selected('q12')
        perform_calculation()
    });
    $('#q13i').change(function () {
        var q13i_ans_simul = $('#q13i option:selected').val()
        selected('q13i')
        if (q13i_ans_simul == "CELPIP") {
            $("#q13ii_s").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q13ii_l").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q13ii_r").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q13ii_w").empty().append(get_option(language_tables_filtered[0], 0, 1));
            $("#q13ii_s,#q13ii_l,#q13ii_r,#q13ii_w").val("Not Applicable").change()
            hide_show(['q13ii_s', 'q13ii_l', 'q13ii_r', 'q13ii_w'], "show")
        } else if (q13i_ans_simul == "IELTS") {
            $("#q13ii_s").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q13ii_l").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q13ii_r").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q13ii_w").empty().append(get_option(language_tables_filtered[1], 0, 1));
            $("#q13ii_s,#q13ii_l,#q13ii_r,#q13ii_w").val("Not Applicable").change()
            hide_show(['q13ii_s', 'q13ii_l', 'q13ii_r', 'q13ii_w'], "show")
        } else if (q13i_ans_simul == "TEF") {
            $("#q13ii_s").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q13ii_l").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q13ii_r").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q13ii_w").empty().append(get_option(language_tables_filtered[2], 0, 1));
            $("#q13ii_s,#q13ii_l,#q13ii_r,#q13ii_w").val("Not Applicable").change()
            hide_show(['q13ii_s', 'q13ii_l', 'q13ii_r', 'q13ii_w'], "show")
        } else {
            $("#q13ii_s").val("Not Applicable").change();
            $("#q13ii_l").val("Not Applicable").change();
            $("#q13ii_r").val("Not Applicable").change();
            $("#q13ii_w").val("Not Applicable").change();
            hide_show(['q13ii_s', 'q13ii_l', 'q13ii_r', 'q13ii_w'], "hide")
        }
        perform_calculation()
    });
    $('#q13ii_s').change(function () {
        var q13ii_s_ans_simul = $('#q13ii_s option:selected').val()
        selected('q13ii_s')
        perform_calculation()
    });
    $('#q13ii_l').change(function () {
        var q13ii_l_ans_simul = $('#q13ii_l option:selected').val()
        selected('q13ii_l')
        perform_calculation()
    });
    $('#q13ii_r').change(function () {
        var q13ii_r_ans_simul = $('#q13ii_r option:selected').val()
        selected('q13ii_r')
        perform_calculation()
    });
    $('#q13ii_w').change(function () {
        var q13ii_w_ans_simul = $('#q13ii_w option:selected').val()
        selected('q13ii_w')
        perform_calculation()
    });
}

function hide_show(variable, order) {
    for (i = 0; i < variable.length; i++) {
        if (order == "hide") {
            document.getElementById(variable[i]).style.opacity = 0.4;
            document.getElementById(variable[i]).style.pointerEvents = "none";
            selected(variable[i]);
        }
        else {
            if ($("#" + variable[i]).val() == null) {
                document.getElementById(variable[i]).style.pointerEvents = "fill";
                document.getElementById(variable[i]).style.opacity = 1;
                document.getElementById(variable[i]).style.borderWidth = "3px";
                document.getElementById(variable[i]).style.borderStyle = "solid";
                document.getElementById(variable[i]).style.borderColor = "#FF0000";
                variables_that_needs_answer.push(variable[i])

            } else {
                document.getElementById(variable[i]).style.pointerEvents = "fill";
                document.getElementById(variable[i]).style.opacity = 1;
            }
        }
    }
    variables_that_needs_answer = variables_that_needs_answer.reduce(function (a, b) { if (a.indexOf(b) < 0) a.push(b); return a; }, []);
}

function selected(variable) {
    document.getElementById(variable).style.borderWidth = "1px";
    document.getElementById(variable).style.borderStyle = "solid";
    document.getElementById(variable).style.borderColor = "#636363";
    document.getElementById(variable).style.borderRadius = "2px";
    try {
        variables_that_needs_answer = variables_that_needs_answer.filter(function (e) { return e !== variable })
    }
    catch {
        variables_that_needs_answer = variables_that_needs_answer
    }
}

function perform_calculation() {
    if (variables_that_needs_answer.length != 0) {
        var htmlOutput = 'Please complete the red box:'
        for (i = 0; i <= variables_that_needs_answer.length - 1; i++) {
            htmlOutput = htmlOutput + "<p> <span style = 'color:#0400ffe0;'>" + variables_that_needs_answer[i].charAt(0).toUpperCase() + variables_that_needs_answer[i].slice(1) + " </span></p>"
        }
        document.getElementById('simulate_calculate').innerHTML = htmlOutput
    } else {
        tempdict = simul_calculate()
        simul_keys = Object.keys(tempdict)
        simul_values = Object.values(tempdict)
        var htmlOutput = ''
        for (i = 0; i <= simul_keys.length - 1; i++) {
            delta = simul_values[i] - original_score[i]
            if (delta > 0){
                htmlChanges = "(<span style = 'color:#217334'>" + Math.abs(delta) + "</span>)"
            } else{
                htmlChanges = "(<span style = 'color:#FF0000'>" + Math.abs(delta) + "</span>)"
            }
            htmlOutput = htmlOutput + "<p>" + simul_keys[i] + ": " + original_score[i] + "<span style = 'color:#0400ffe0;'> " + simul_values[i] + "</span> " + htmlChanges +"</p>"
        }
        document.getElementById('simulate_calculate').innerHTML = htmlOutput
    }
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

function find_point_from_table(value, table, column_i) {
    for (i = 0; i < table.length; i++) {
        if (value == table[i][1]) { return parseInt(table[i][column_i]); }
    }
}

function get_option(table, f_column_i, s_column_i) {
    var options;
    for (i = 0; i < table.length; i++) {
        options += '<option value="' + table[i][s_column_i] + '"">' + table[i][s_column_i] + '</option>';
    }
    return options;
}

function simul_calculate() {
    // Core Factors:
    var core_factors_simul = 0;
    var q3_age_simul = 0;
    var q4_education_simul = 0;
    var q5_fol_point_simul = 0;
    var q5_sol_point_simul = 0;
    var q6_canada_xp_simul = 0;

    // Spouse Factors:
    var spouse_factors_simul = 0;
    var q11_spouse_education_simul = 0;
    var q12_spouse_xp_simul = 0;
    var q13_spouse_fol_simul = 0;

    // Skill Factors:
    var skill_factors_simul = 0;
    var q4_q5_simul = 0; // Education + Language
    var q4_q6i_simul = 0; // Education + Cad Work Xp
    var q6ii_q5_simul = 0; // For Work Xp + Language
    var q6ii_q6i_simul = 0; // For Work Xp + Cad Work Xp
    var q7_q5_simul = 0; // Certificate + Language

    // Bonus Factors:
    var bonus_factors_simul = 0;
    var q10_sibling_simul = 0;
    var french_simul = 0;
    var canada_education_simul = 0;
    var job_simul = 0;
    var nomination_simul = 0;

    // Total:
    var total_simul = 0;

    // Variables:
    var answer_simul;
    var column_index_simul;
    var clb_s_simul, clb_l_simul, clb_r_simul, clb_w_simul;
    var education_simul, cad_xp_answer_simul, for_xp_answer_simul, certificate_answer_simul;

    // with_spouse_check

    // A. Core Factors:
    // q3_age
    answer = $("#q3 option:selected").val();
    if (with_spouse) {
        q3_age_simul = find_point_from_table(answer, age_table, 2);
        var q3_age_max_simul = 100;
    }
    else {
        q3_age_simul = find_point_from_table(answer, age_table, 3);
        var q3_age_max_simul = 110;
    }

    // q4_education:
    answer = $("#q4 option:selected").val();
    if (with_spouse) {
        q4_education_simul = find_point_from_table(answer, education_table, 2);
        var q4_education_max_simul = 140;
    }
    else {
        q4_education_simul = find_point_from_table(answer, education_table, 3);
        var q4_education_max_simul = 150;
    }

    // q5_fol_point:
    answer = $("#q5ia option:selected").val();

    var language_s_simul = $("#q5ib_s option:selected").val();
    var language_l_simul = $("#q5ib_l option:selected").val();
    var language_r_simul = $("#q5ib_r option:selected").val();
    var language_w_simul = $("#q5ib_w option:selected").val();


    // Determine point when with/without spouse
    if (with_spouse) {
        column_index_simul = 6;
        var q5_fol_point_max = 128;
    }
    else {
        column_index_simul = 7;
        var q5_fol_point_max = 136;
    }

    // CELPIP
    if (answer == "CELPIP") {
        q5_fol_point_simul = find_point_from_table(language_s_simul, celpip, column_index_simul) +
            find_point_from_table(language_l_simul, celpip, column_index_simul) +
            find_point_from_table(language_r_simul, celpip, column_index_simul) +
            find_point_from_table(language_w_simul, celpip, column_index_simul);
        clb_s_simul = find_point_from_table(language_s_simul, celpip, 5);
        clb_l_simul = find_point_from_table(language_l_simul, celpip, 5);
        clb_r_simul = find_point_from_table(language_r_simul, celpip, 5);
        clb_w_simul = find_point_from_table(language_w_simul, celpip, 5);
    }

    // IELTS
    else if (answer == "IELTS") {
        q5_fol_point_simul = find_point_from_table(language_s_simul, ielts, column_index_simul) +
            find_point_from_table(language_l_simul, ielts, column_index_simul) +
            find_point_from_table(language_r_simul, ielts, column_index_simul) +
            find_point_from_table(language_w_simul, ielts, column_index_simul);
        clb_s_simul = find_point_from_table(language_s_simul, ielts, 5);
        clb_l_simul = find_point_from_table(language_l_simul, ielts, 5);
        clb_r_simul = find_point_from_table(language_r_simul, ielts, 5);
        clb_w_simul = find_point_from_table(language_w_simul, ielts, 5);
    }

    // TEF
    else if (answer == "TEF") {
        q5_fol_point_simul = find_point_from_table(language_s_simul, tef, column_index_simul) +
            find_point_from_table(language_l_simul, tef, column_index_simul) +
            find_point_from_table(language_r_simul, tef, column_index_simul) +
            find_point_from_table(language_w_simul, tef, column_index_simul);
        clb_s_simul = find_point_from_table(language_s_simul, tef, 5);
        clb_l_simul = find_point_from_table(language_l_simul, tef, 5);
        clb_r_simul = find_point_from_table(language_r_simul, tef, 5);
        clb_w_simul = find_point_from_table(language_w_simul, tef, 5);
    }
    // q5_sol_point:

    answer = $("#q5ii option:selected").val();

    // Determine point when with/without spouse
    if (with_spouse) {
        column_index_simul = 8;
        var q5_sol_point_max_simul = 22;
    }
    else {
        column_index_simul = 9;
        var q5_sol_point_max_simul = 24;
    }

    if (answer != "Not Applicable") {
        language_s_simul = $("#q5ii_s option:selected").val();
        language_l_simul = $("#q5ii_l option:selected").val();
        language_r_simul = $("#q5ii_r option:selected").val();
        language_w_simul = $("#q5ii_w option:selected").val();
        // CELPIP
        if (answer == "CELPIP") {
            q5_sol_point_simul = find_point_from_table(language_s_simul, celpip, column_index_simul) +
                find_point_from_table(language_l_simul, celpip, column_index_simul) +
                find_point_from_table(language_r_simul, celpip, column_index_simul) +
                find_point_from_table(language_w_simul, celpip, column_index_simul);
        }
        // IELTS
        else if (answer == "IELTS") {
            q5_sol_point_simul = find_point_from_table(language_s_simul, ielts, column_index_simul) +
                find_point_from_table(language_l_simul, ielts, column_index_simul) +
                find_point_from_table(language_r_simul, ielts, column_index_simul) +
                find_point_from_table(language_w_simul, ielts, column_index_simul);
        }
        // TEF
        else if (answer == "TEF") {
            q5_sol_point_simul = find_point_from_table(language_s_simul, tef, column_index_simul) +
                find_point_from_table(language_l_simul, tef, column_index_simul) +
                find_point_from_table(language_r_simul, tef, column_index_simul) +
                find_point_from_table(language_w_simul, tef, column_index_simul);
        }
        if (with_spouse) { q5_sol_point_simul = Math.min(22, q5_sol_point_simul); }
    }

    else { q5_sol_point_simul = 0; }

    // q6_canada_xp
    answer = $("#q6i option:selected").val();

    if (with_spouse) {
        q6_canada_xp_simul = find_point_from_table(answer, cad_xp, 2);
        var q6_canada_xp_max_simul = 70;
    }
    else {
        q6_canada_xp_simul = find_point_from_table(answer, cad_xp, 3);
        var q6_canada_xp_max_simul = 80;
    }

    core_factors_simul = q3_age_simul + q4_education_simul + q5_fol_point_simul + q5_sol_point_simul + q6_canada_xp_simul;

    // B. Spouse Factors:
    if (with_spouse) {
        // q11_spouse_education

        if ($('#q11 option:selected').val() != null) {
            answer = $("#q11 option:selected").val();
            q11_spouse_education_simul = find_point_from_table(answer, education_table, 4);
            var q11_spouse_education_max_simul = 10;
        }


        // q12_spouse_xp

        if ($('#q12 option:selected').val() != null) {
            answer = $("#q12 option:selected").val();
            q12_spouse_xp_simul = find_point_from_table(answer, cad_xp, 4);
            var q12_spouse_xp_max_simul = 10;
        }


        // q13_spouse_fol
        if ($('#q13ii option:selected').val() != null) {
            answer = $("#q13i option:selected").val();
            column_index_simul = 10;
            var q13_spouse_fol_max_simul = 20;
            var language_s_simul = $("#q13ii_s option:selected").val();
            var language_l_simul = $("#q13ii_l option:selected").val();
            var language_r_simul = $("#q13ii_r option:selected").val();
            var language_w_simul = $("#q13ii_w option:selected").val();

            // CELPIP
            if (answer == "CELPIP") {
                q13_spouse_fol_simul = find_point_from_table(language_s_simul, celpip, column_index_simul) +
                    find_point_from_table(language_l_simul, celpip, column_index_simul) +
                    find_point_from_table(language_r_simul, celpip, column_index_simul) +
                    find_point_from_table(language_w_simul, celpip, column_index_simul);
            }

            // IELTS
            else if (answer == "IELTS") {
                q13_spouse_fol_simul = find_point_from_table(language_s_simul, ielts, column_index_simul) +
                    find_point_from_table(language_l_simul, ielts, column_index_simul) +
                    find_point_from_table(language_r_simul, ielts, column_index_simul) +
                    find_point_from_table(language_w_simul, ielts, column_index_simul);
            }

            // TEF
            else if (answer == "TEF") {
                q13_spouse_fol_simul = find_point_from_table(language_s_simul, tef, column_index_simul) +
                    find_point_from_table(language_l_simul, tef, column_index_simul) +
                    find_point_from_table(language_r_simul, tef, column_index_simul) +
                    find_point_from_table(language_w_simul, tef, column_index_simul);
            }
        }

        spouse_factors_simul = q11_spouse_education_simul + q12_spouse_xp_simul + q13_spouse_fol_simul;
    }
    // C. Skill Factors:
    var clb_check_simul = clb_level(clb_s_simul, clb_l_simul, clb_r_simul, clb_w_simul);

    education_simul = $("#q4 option:selected").val();
    cad_xp_answer_simul = $("#q6i option:selected").val();
    for_xp_answer_simul = $("#q6ii option:selected").val();
    certificate_answer_simul = $("#q7 option:selected").val();

    var q4_q5_max_simul = 50;
    var q4_q6i_max_simul = 50;
    // Education + Language, Education + Cad work xp
    if (education_simul == "None, or less than secondary (high school)" || education_simul == "Secondary diploma (high school graduation)") {
        q4_q5_simul = 0;
        q4_q6i_simul = 0;
    }
    else if (education_simul == "One-year program at a university, college, trade or technical school, or other institute" || education_simul == "Two-year program at a university, college, trade or technical school, or other institute" || education_simul == "Bachelor's degree (three or more year program at a university, college, trade or technical school, or other institute)") {
        if (clb_check_simul == 3) { q4_q5_simul = 25; }
        else if (clb_check_simul == 2) { q4_q5_simul = 13; }
        else { q4_q5_simul = 0; }

        if (cad_xp_answer_simul == "2 years" || cad_xp_answer_simul == "3 years" || cad_xp_answer_simul == "4 years" || cad_xp_answer_simul == "5 years or more") { q4_q6i_simul = 25; }
        else if (cad_xp_answer_simul == "1 year") { q4_q6i_simul = 13; }
        else { q4_q6i_simul = 0; }
    }
    else {
        if (clb_check_simul == 3) { q4_q5_simul = 50; }
        else if (clb_check_simul == 2) { q4_q5_simul = 25; }
        else { q4_q5_simul = 0; }

        if (cad_xp_answer_simul == "2 years" || cad_xp_answer_simul == "3 years" || cad_xp_answer_simul == "4 years" || cad_xp_answer_simul == "5 years or more") { q4_q6i_simul = 50; }
        else if (cad_xp_answer_simul == "1 year") { q4_q6i_simul = 25; }
        else { q4_q6i_simul = 0; }
    }

    // For work xp + Language, For work xp + Cad work xp
    var q6ii_q5_max_simul = 50;
    var q6ii_q6i_max_simul = 50;
    if (for_xp_answer_simul == "None or less than a year") {
        q6ii_q5_simul = 0;
        q6ii_q6i_simul = 0;
    }
    else if (for_xp_answer_simul == "1 year" || for_xp_answer_simul == "2 years") {
        if (clb_check_simul == 3) { q6ii_q5_simul = 25; }
        else if (clb_check_simul == 2) { q6ii_q5_simul = 13; }
        else { q6ii_q5_simul = 0; }

        if (cad_xp_answer_simul == "2 years" || cad_xp_answer_simul == "3 years" || cad_xp_answer_simul == "4 years" || cad_xp_answer_simul == "5 years or more") { q6ii_q6i_simul = 25; }
        else if (cad_xp_answer_simul == "1 year") { q6ii_q6i_simul = 13; }
        else { q6ii_q6i_simul = 0; }
    }
    else {
        if (clb_check_simul == 3) { q6ii_q5_simul = 50; }
        else if (clb_check_simul == 2) { q6ii_q5_simul = 25; }
        else { q6ii_q5_simul = 0; }

        if (cad_xp_answer_simul == "2 years" || cad_xp_answer_simul == "3 years" || cad_xp_answer_simul == "4 years" || cad_xp_answer_simul == "5 years or more") { q6ii_q6i_simul = 50; }
        else if (cad_xp_answer_simul == "1 year") { q6ii_q6i_simul = 25; }
        else { q6ii_q6i_simul = 0; }
    }
    var q7_q5_max_simul = 50;
    // Certificate + Language
    if (certificate_answer_simul == "No") { q7_q5_simul = 0; }
    else {
        if (clb_check_simul == 3 || clb_check_simul == 2) { q7_q5_simul = 50; }
        else if (clb_check_simul == 1) { q7_q5_simul = 25; }
        else { q7_q5_simul = 0; }
    }

    skill_factors_simul = Math.min(100, q4_q5_simul + q4_q6i_simul + q6ii_q5_simul + q6ii_q6i_simul + q7_q5_simul);

    // D. Bonus Factors:

    // Sibling in Canada
    answer = $("#q10 option:selected").val();
    var q10_sibling_max_simul = 15;
    var french_max_simul = 30;
    if (answer == "Yes") { q10_sibling_simul = 15; }
    else { q10_sibling_simul = 0; }

    // French Test
    if (french_fol || french_sol) {

        if (french_fol && $('#q5ia option:selected').val() != null) {
            language_s_simul = $("#q5ib_s option:selected").val();
            language_l_simul = $("#q5ib_l option:selected").val();
            language_r_simul = $("#q5ib_r option:selected").val();
            language_w_simul = $("#q5ib_w option:selected").val();
        }
        else if (french_sol && $('#q5ii option:selected').val() != null) {
            language_s_simul = $("#q5ii_s option:selected").val();
            language_l_simul = $("#q5ii_l option:selected").val();
            language_r_simul = $("#q5ii_r option:selected").val();
            language_w_simul = $("#q5ii_w option:selected").val();
        }
        clb_s_simul = find_point_from_table(language_s_simul, tef, 5);
        clb_l_simul = find_point_from_table(language_l_simul, tef, 5);
        clb_r_simul = find_point_from_table(language_r_simul, tef, 5);
        clb_w_simul = find_point_from_table(language_w_simul, tef, 5);
        clb_check_simul = clb_level(clb_s_simul, clb_l_simul, clb_r_simul, clb_w_simul);

        if (clb_check_simul >= 2) {

            if ((english_fol && $('#q5ia option:selected').val() != null) || (english_sol && $('#q5ii option:selected').val() != null)) {

                var temp_s_simul, temp_l_simul, temp_r_simul, temp_w_simul, temp_clb_simul, test_type_simul;
                if (english_fol) {
                    if ($("#q5ia option:selected").val() == "CELPIP") { test_type = celpip; }
                    else { test_type = ielts; }
                    temp_s_simul = $("#q5ib_s option:selected").val();
                    temp_l_simul = $("#q5ib_l option:selected").val();
                    temp_r_simul = $("#q5ib_r option:selected").val();
                    temp_w_simul = $("#q5ib_w option:selected").val();
                }
                else if (english_sol) {
                    if ($("#q5ii option:selected").val() == "CELPIP") { test_type = celpip; }
                    else { test_type = ielts; }
                    temp_s_simul = $("#q5ii_s option:selected").val();
                    temp_l_simul = $("#q5ii_l option:selected").val();
                    temp_r_simul = $("#q5ii_r option:selected").val();
                    temp_w_simul = $("#q5ii_w option:selected").val();
                }

                clb_s_simul = find_point_from_table(temp_s_simul, test_type, 5);
                clb_l_simul = find_point_from_table(temp_l_simul, test_type, 5);
                clb_r_simul = find_point_from_table(temp_r_simul, test_type, 5);
                clb_w_simul = find_point_from_table(temp_w_simul, test_type, 5);
                temp_clb_simul = clb_level(clb_s_simul, clb_l_simul, clb_r_simul, clb_w_simul);

                if (temp_clb_simul >= 2) { french_simul = 30; }
                else { french_simul = 15; }
            }
            else { french_simul = 0; }
        }
    }
    else { french_simul = 0; }
    // Education in Canada

    answer = $("#q4c option:selected").val();
    var canada_education_max_simul = 30;
    if (answer == q4c_response_conv[1][1]) { canada_education_simul = 0; }
    else if (answer == q4c_response_conv[2][1]) { canada_education_simul = 15; }
    else if (answer == q4c_response_conv[3][1]) { canada_education_simul = 30; }

    // Employment
    var job_max_simul = 200;
    if ($("#q8a option:selected").val() != null) {
        answer = $("#q8a option:selected").val();
        if (answer == q8a_response_conv[1][1]) { job_simul = 200; }
        else if (answer == q8a_response_conv[2][1]) { job_simul = 50; }
        else { job_simul = 0; }
    }

    // Nomination
    var nomination_max_simul = 600;
    answer = $("#q9 option:selected").val();
    if (answer == "Yes") { nomination_simul = 600; }
    else { nomination_simul = 0; }

    bonus_factors_simul = Math.min(600, q10_sibling_simul + french_simul + canada_education_simul + job_simul + nomination_simul);

    total_simul = core_factors_simul + spouse_factors_simul + skill_factors_simul + bonus_factors_simul;

    var spouse_check_simul = 0;
    var spouse_check_number_simul = 0;

    var marital_status_simul = $("#q1 option:selected").val();
    if (marital_status_simul != "badvalue") {
        // Not Single
        if (marital_status_simul == "Common-Law" || marital_status_simul == "Married") {
            spouse_check_simul = "Couple";
            spouse_check_number_simul = 1;
        }
        // Single
        else {
            spouse_check_simul = "Single"
            spouse_check_number_simul = 0;
        }
    }
    var return_dict = {
        'Total_score': total_simul,
        'Core score summary': core_factors_simul,
        'Spouse score summary': spouse_factors_simul,
        'Skills score summary': skill_factors_simul,
        'Bonus score summary': bonus_factors_simul,
        // core factors details
        'Age Score': q3_age_simul,
        'Education Score': q4_education_simul,
        'First Official Language Score': q5_fol_point_simul,
        'Second Official Language Score': q5_sol_point_simul,
        'Canadian Work Experience': q6_canada_xp_simul,
        // spouse factors details
        'Spouse Education Score': q11_spouse_education_simul,
        'Spouse Work Exp Score': q12_spouse_xp_simul,
        'Spouse First Official Language Score': q13_spouse_fol_simul,
        // skill factors details
        'Language & Education': q4_q5_simul,
        'Canadian Work Exp & Education': q4_q6i_simul,
        'Language & Foreign Work Exp': q6ii_q5_simul, // check calc
        'Canadian & Foreign Work Exp': q6ii_q6i_simul, // check calc
        'Certification of Qualification': q7_q5_simul,
        // bonus factors details
        'Siblings Bonus': q10_sibling_simul,
        'French Bonus': french_simul,
        'Canadian Education Bonus': canada_education_simul,
        'Job Bonus': job_simul,
        'Nomination Bonus': nomination_simul
    }
    return return_dict
}
function clb_level(clb_s, clb_l, clb_r, clb_w) {
    if (clb_s >= 9 && clb_l >= 9 && clb_r >= 9 && clb_w >= 9) { return 3; }
    else if (clb_s >= 7 && clb_l >= 7 && clb_r >= 7 && clb_w >= 7) { return 2; }
    else if (clb_s >= 5 && clb_l >= 5 && clb_r >= 5 && clb_w >= 5) { return 1; }
    else { return 0; }
}