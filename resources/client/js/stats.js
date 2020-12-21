"use strict";

function getData() {
    console.log("Invoked getData()");
    const url = "/listenings/get";
    fetch(url, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            draw(response)    ;
        }
    });
}

function draw(response) {
    let SongArray = [];
    let weekData = [];
    let monthData = [];
    let yearData = [];
    for (let item of response) {
        SongArray.push(item.SongName);
        weekData.push(item.TimesWeek);
        monthData.push(item.TimesMonth);
        yearData.push(item.TimesYear)
    }

    let ctx1 = document.getElementById('chartweek').getContext('2d');
    let myChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: SongArray,
            datasets: [{
                label: 'Listens per week',
                data: weekData,
                borderWidth: 1
            }]
        },
        options: {
            responsive: false
        }
    });

    let ctx2 = document.getElementById('chartmonth').getContext('2d');
    let myChart2 = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: SongArray,
            datasets: [{
                label: 'Listens per month',
                data: monthData,
                borderWidth: 1
            }]
        },
        options: {
            responsive: false
        }
    });

    let ctx3 = document.getElementById('chartyear').getContext('2d');
    let myChart3 = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: SongArray,
            datasets: [{
                label: 'Listens per year',
                data: yearData,
                borderWidth: 1
            }]
        },
        options: {
            responsive: false
        }
    });
}

