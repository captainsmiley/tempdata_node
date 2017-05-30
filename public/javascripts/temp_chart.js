
var ctx = document.getElementById("myChart");

/*
var chart_data = [ 
    {x: "2000-01-12", y: 25.5},
    {x: "2000-01-13", y: 23.1} 
];
*/




var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: '# of Votes',
            data: null ,
            backgroundColor: 
                'rgba(255, 99, 132, 0.2)',
            borderColor: 
                'rgba(255,99,132,1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: { 
                    displayFormats: {
                        quarter: 'YYYY MM HH:MM'
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

function getAllData(t) {
$(function(){
    var u = '/temp/tempdata';
    if (t != '')
        u = '/temp/tempdatafrom/'+t;
    $.ajax({
        url: u,
        type: 'GET',
        success : function(data) {
            myChart.data.datasets[0].data = data;
            console.log(data);
            myChart.update();;
        }
    });
});
}


