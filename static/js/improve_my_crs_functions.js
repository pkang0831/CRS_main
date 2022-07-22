
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

// check if there is a spouse or not
if (crs_form_answers['q2i'] == "badvalue"){ // means this individual is single applicant
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