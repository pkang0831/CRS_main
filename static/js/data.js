var with_spouse = false;
var french_fol = false;
var french_sol = false;
var english_fol = false;
var english_sol = false;

var age_table = [
    ["A", "17 years of age or less", "0", "0"],
    ["B", "18 years of age", "90", "99"],
    ["C", "19 years of age", "95", "105"],
    ["D", "20 years of age", "100", "110"],
    ["E", "21 years of age", "100", "110"],
    ["F", "22 years of age", "100", "110"],
    ["G", "23 years of age", "100", "110"],
    ["H", "24 years of age", "100", "110"],
    ["I", "25 years of age", "100", "110"],
    ["J", "26 years of age", "100", "110"],
    ["K", "27 years of age", "100", "110"],
    ["L", "28 years of age", "100", "110"],
    ["M", "29 years of age", "100", "110"],
    ["N", "30 years of age", "95", "105"],
    ["O", "31 years of age", "90", "99"],
    ["P", "32 years of age", "85", "94"],
    ["Q", "33 years of age", "80", "88"],
    ["R", "34 years of age", "75", "83"],
    ["S", "35 years of age", "70", "77"],
    ["T", "36 years of age", "65", "72"],
    ["U", "37 years of age", "60", "66"],
    ["V", "38 years of age", "55", "61"],
    ["W", "39 years of age", "50", "55"],
    ["X", "40 years of age", "45", "50"],
    ["Y", "41 years of age", "35", "39"],
    ["Z", "42 years of age", "25", "28"],
    ["AA", "43 years of age", "15", "17"],
    ["AB", "44 years of age", "5", "6"],
    ["AC", "45 years of age or more", "0", "0"]
];

var education_table = [
    ["A", "None, or less than secondary (high school)", "0", "0", "0"],
    ["B", "Secondary diploma (high school graduation)", "28", "30", "2"],
    ["C", "One-year program at a university, college, trade or technical school, or other institute", "84", "90", "6"],
    ["D", "Two-year program at a university, college, trade or technical school, or other institute", "91", "98", "7"],
    ["E", "Bachelor's degree (three or more year program at a university, college, trade or technical school, or other institute)", "112", "120", "8"],
    ["F", "Two or more certificates, diplomas or degrees. One must be for a program of three or more years", "119", "128", "9"],
    ["G", "Master's degree, or professional degree needed to practice in a licensed profession (see Help)", "126", "135", "10"],
    ["H", "Doctoral level university degree (PhD)", "140", "150", "10"]
];

//Code, Speaking, Listening, Reading, Writing, CLB Level, With Spouse Table (FOL), Without Spouse Table (FOL),  With Spouse Table (SOL), Without Spouse Table (SOL), Spouse points
var celpip = [
    ["H", "10 - 12", "10 - 12", "10 - 12", "10 - 12", "10", "32", "34", "6", "6", "5"],
    ["G", "9", "9", "9", "9", "9", "29", "31", "6", "6", "5"],
    ["F", "8", "8", "8", "8", "8", "22", "23", "3", "3", "3"],
    ["E", "7", "7", "7", "7", "7", "16", "17", "3", "3", "3"],
    ["D", "6", "6", "6", "6", "6", "8", "9", "1", "1", "1"],
    ["C", "5", "5", "5", "5", "5", "6", "6", "1", "1", "1"],
    ["B", "4", "4", "4", "4", "4", "6", "6", "0", "0", "0"],
    ["A", "M, 0 - 3", "M, 0 - 3", "M, 0 - 3", "M, 0 - 3", "0", "0", "0", "0", "0", "0"]];

//Code, Speaking, Listening, Reading, Writing, CLB Level, With Spouse Table (FOL), Without Spouse Table (FOL),  With Spouse Table (SOL), Without Spouse Table (SOL), Spouse points  
var ielts = [
    ["H", "7.5 – 9.0", "8.5 – 9.0", "8.0 – 9.0", "7.5 – 9.0", "10", "32", "34", "6", "6", "5"],
    ["G", "7.0", "8.0", "7.0 - 7.5", "7.0", "9", "29", "31", "6", "6", "5"],
    ["F", "6.5", "7.5", "6.5", "6.5", "8", "22", "23", "3", "3", "3"],
    ["E", "6.0", "6 .0- 7.0", "6.0", "6.0", "7", "16", "17", "3", "3", "3"],
    ["D", "5.5", "5.5", "5.0 - 5.5", "5.5", "6", "8", "9", "1", "1", "1"],
    ["C", "5.0", "5.0", "4.0 - 4.5", "5.0", "5", "6", "6", "1", "1", "1"],
    ["B", "4.0 - 4.5", "4.5", "3.5", "4.0 - 4.5", "4", "6", "6", "0", "0", "0"],
    ["A", "0 - 3.5", "0- 4.0", "0 - 3.0", "0 - 3.5", "0", "0", "0", "0", "0", "0"]];

//Code, Speaking, Listening, Reading, Writing, CLB Level, With Spouse Table (FOL), Without Spouse Table (FOL),  With Spouse Table (SOL), Without Spouse Table (SOL), Spouse points    
var tef = [
    ["H", "393-450", "316-360", "263-300", "393-450", "10", "32", "34", "6", "6", "5"],
    ["G", "371-392", "298-315", "248-262", "371-392", "9", "29", "31", "6", "6", "5"],
    ["F", "349-370", "280-297", "233-247", "349-370", "8", "22", "23", "3", "3", "3"],
    ["E", "310-348", "249-279", "207-232", "310-348", "7", "16", "17", "3", "3", "3"],
    ["D", "271-309", "217-248", "181-206", "271-309", "6", "8", "9", "1", "1", "1"],
    ["C", "226-270", "181-216", "151-180", "226-270", "5", "6", "6", "1", "1", "1"],
    ["B", "181-225", "145-180", "121-150", "181-225", "4", "6", "6", "0", "0", "0"],
    ["A", "0 - 180", "0 - 144", "0 - 120", "0 - 180", "0", "0", "0", "0", "0", "0"]
];  

// Code, Experience, With spouse point, Without spouse point, spouse point
var cad_xp = [
    ["A", "None or less than a year", "0", "0", "0"],
    ["B", "1 year", "35", "40", "5"],
    ["C", "2 years", "46", "53", "7"],
    ["D", "3 years", "56", "64", "8"],
    ["E", "4 years", "63", "72", "9"],
    ["F", "5 years or more", "70", "80", "10"]
];
