
// parsed_data: has following structures:
// 'crs_score': ['752', ...],
// 'date_form': ['22-06-2022', ...]
// 'date_str': ['June 22, 2022', ...]
// 'id': ['225', ...]
// 'inv_num': ['636', ...]
// 'prgm_name': ['Provincial Nominee Program', ...]

var Core = crs_form_answers['Core_factors'];
var Spouse = crs_form_answers['Spouse_factors'];
var Skill = crs_form_answers['Skill_factors'];
var Bonus = crs_form_answers['Bonus_factors'];
var total = Core + Spouse + Skill + Bonus;

var CRS_Predict = parseInt(crs_predictions['next_prediction'][0])
var last_CRS = parseInt(passed_data['crs_score'][passed_data['crs_score'].length - 1])
var data_table_timeline_chart = [
    ['Date', '# of ITA issued', 'CRS cut off', 'CRS Prediction']
];
for (let i = 0; i <= passed_data['crs_score'].length - 1; i++) {
    data_table_timeline_chart.push(
        [
            new Date(
                parseInt(passed_data['year_num'][i]),
                parseInt(passed_data['month_num'][i]) - 1,
                parseInt(passed_data['day_num'][i])
            ),
            parseInt(passed_data['inv_num'][i]),
            parseInt(passed_data['crs_score'][i]),
            parseInt(passed_data['prediction'][i])
        ]
    )
};
var last_date = new Date(data_table_timeline_chart[data_table_timeline_chart.length - 1][0]);
for (let i = 0; i <= crs_predictions['next_prediction'].length - 1; i++) {
    var new_date_to_add = new Date(last_date.setDate(last_date.getDate() + 14));
    data_table_timeline_chart.push(
        [
            last_date,
            ,
            ,
            parseInt(crs_predictions['next_prediction'][i])
        ]
    )
    last_date = new_date_to_add
}

var data_table_for_div5 = [['Date', '# of ITA issued', 'Program Category', 'CRS cut off']];
for (let i = 0; i <= passed_data['crs_score'].length - 1; i++) {
    data_table_for_div5.push(
        [passed_data['date_str'][i], passed_data['inv_num'][i], passed_data['prgm_name'][i], passed_data['crs_score'][i]]
    )
};

google.charts.load('current', { 'packages': ['line', 'corechart', 'bar', 'gantt', 'table'] });
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    //Misc variable creation

    function DTM(Days) { //DTM = Days to Milliseconds
        return Days * 24 * 60 * 60 * 1000;
    }
    var today = new Date();
    var ITA_start = new Date(today.setDate(today.getDate()) + DTM(3));
    var Document_start = new Date(today.setDate(today.getDate()) + DTM(3));
    var PR_decision_start = new Date(ITA_start.setDate(ITA_start.getDate()) + DTM(14));
    var Med_exam_start = new Date(PR_decision_start.setDate(PR_decision_start.getDate()) + DTM(182.5));
    var PR_landing_total = new Date(Med_exam_start.setDate(Med_exam_start.getDate()) + DTM(7));
    // Create the data table.
    var data1 = new google.visualization.arrayToDataTable([
        ['Comparison', 'CRS_points', { role: "style" }],
        ['Latest CRS point', last_CRS, 'blue'],
        ['Next CRS Prediction', CRS_Predict, 'green'],
        ['Your CRS point', total, 'red']
    ]);
    var dataview1 = new google.visualization.DataView(data1);
    dataview1.setColumns([0, 1, { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" }, 2]);
    var data2 = new google.visualization.arrayToDataTable([
        ['Category', 'Points'],
        ['A. Core Human', Core],
        ['B. Spouse', Spouse],
        ['C. Skill', Skill],
        ['D. Bonus', Bonus]
    ]);
    var data3 = new google.visualization.arrayToDataTable(data_table_timeline_chart);

    // var data3 = new google.visualization.arrayToDataTable(temp1);

    var data4 = new google.visualization.DataTable();
    data4.addColumn('string', 'Task ID');
    data4.addColumn('string', 'Task Name');
    data4.addColumn('date', 'Start Date');
    data4.addColumn('date', 'End Date');
    data4.addColumn('number', 'Duration');
    data4.addColumn('number', 'Percent Complete');
    data4.addColumn('string', 'Dependencies');
    data4.addRows([
        ['Step_1', '1. Profile Submission', today, null, DTM(3), 0, null],
        ['Step_2', '2. ITA Issuance', ITA_start, null, DTM(14), 0, null],
        ['Step_3', '3. Document Preparation', ITA_start, null, DTM(25), 0, null],
        ['Step_4', '4. PR Decision Period', PR_decision_start, null, DTM(182.5), 0, null],
        ['Step_5', '5. Medical Exam', Med_exam_start, null, DTM(7), 0, null],
        ['Step_6', '6. PR landing', PR_landing_total, null, DTM(7), 0, null]
    ]);

    var data5 = new google.visualization.arrayToDataTable(data_table_for_div5);

    // Set chart options
    var options1 = {
        height: 400,
        width: 600,
        backgroundColor: '#f1f1f1',
        title: 'Recent CRS comparison',
        bar: { groupWidth: "40%" },
        legend: { position: "none" },
        vAxis: {
            minValue: 420,
            maxValue: 460
        }
    };
    var options2 = {
        title: 'My CRS Category Contribution',
        is3D: true,
        height: 400,
        width: 600,
        backgroundColor: '#f1f1f1',
        legend: { position: 'right' },
        pieSliceTextStyle: { color: 'white' },
        slices: {
            0: { color: 'blue' },
            1: { color: '#808000' },
            2: { color: 'red' },
            3: { color: 'green' }
        }
    };
    var options3 = {
        title: 'Past CRS cut off data with next 2 draw prediction',
        height: 400,
        width: 1200,
        backgroundColor: '#f1f1f1',
        legend: { position: 'top' },
        series: {
            // Gives each series an axis name that matches the Y-axis below.
            0: { targetAxisIndex: 1, color: 'blue' },
            1: { targetAxisIndex: 0, color: 'red' },
            2: { targetAxisIndex: 0, lineDashStyle: [4, 4], color: 'green' },
            3: { targetAxisIndex: 1, lineDashStyle: [4, 4], color: 'blue' },
            4: { targetAxisIndex: 0, lineDashStyle: [14, 7, 7, 2], color: 'purple' }
        },
        vAxes: {
            1: { title: 'ITA issued' },
            0: { title: 'CRS points' }
        },
        vAxis: {
            minValue: 435,
            maxValue: 460
        },
        crosshair: {
            trigger: 'both'
        },
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
            keepInBounds: true,
            maxZoomIn: 4.0
        }
    };
    var options4 = {
        height: 275,
        width: 1150,
        backgroundColor: '#f1f1f1',
        title: 'Your plan'
    };
    var options5 = {
        height: 275,
        width: 1150,
        backgroundColor: '#f1f1f1',
        title: 'Past Invitation Records'
    }
    // Instantiate and draw our chart, passing in some options.
    var Chart1 = new google.visualization.ColumnChart(document.getElementById('chart_div1'));
    var Chart2 = new google.visualization.PieChart(document.getElementById('chart_div2'));
    var Chart3 = new google.visualization.LineChart(document.getElementById('chart_div3'));
    var Chart5 = new google.visualization.Table(document.getElementById('chart_div5'))
    if (total <= CRS_Predict - 2) {
        var Chart4 = new google.visualization.Gantt(document.getElementById('chart_div4'));
        Chart4.draw(data4, options4);
    } else {
        var Chart4 = new google.visualization.Gantt(document.getElementById('chart_div4'));
        Chart4.draw(data4, options4);
    }
    Chart1.draw(dataview1, options1)
    Chart2.draw(data2, options2);
    Chart3.draw(data3, options3);
    Chart5.draw(data5, options5);
};