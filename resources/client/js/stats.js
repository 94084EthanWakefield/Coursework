"use strict";

function start() {
    getData(1);
    getData(2);
    getData(3);
}

window.addEventListener("scroll", function(){
    let nav = document.querySelector("nav");
    nav.classList.toggle("sticky", window.scrollY > 127);
});

function getData(which) {
    console.log("Invoked getData() with" + which);
    const url = "/listenings/get/";
    fetch(url + which, {
        method: "GET",
    }).then(response => {
        return response.json();
    }).then(response => {
        if (response.hasOwnProperty("Error")) {
            alert(JSON.stringify(response));
        } else {
            draw(response, which);
        }
    });
}

function draw(response, which) {

    if (which === 1) {
        let SongArray = [];
        let weekData = [];
        let i = 0;
        for (let item of response) {
            SongArray.push(item.SongName);
            weekData.push(item.TimesWeek);
            i++;
            if (i > 4) {
                break
            }
        }

        let ctx1 = document.getElementById('chartweek').getContext('2d');
        let myChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: SongArray,
                datasets: [{
                    label: 'Listens per week',
                    data: weekData,
                    backgroundColor: [
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                    ],
                    borderColor: [
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });
    }

    if (which === 2) {
        let SongArray = [];
        let monthData = [];
        let i = 0;
        for (let item of response) {
            SongArray.push(item.SongName);
            monthData.push(item.TimesMonth);
            i++;
            if (i > 4) {
                break
            }
        }

        let ctx1 = document.getElementById('chartmonth').getContext('2d');
        let myChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: SongArray,
                datasets: [{
                    label: 'Listens per month',
                    data: monthData,
                    backgroundColor: [
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                    ],
                    borderColor: [
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });
    }

    if (which === 3) {
        let SongArray = [];
        let yearData = [];
        let i = 0;
        for (let item of response) {
            SongArray.push(item.SongName);
            yearData.push(item.TimesYear);
            i++;
            if (i > 4) {
                break
            }
        }

        let ctx1 = document.getElementById('chartyear').getContext('2d');
        let myChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: SongArray,
                datasets: [{
                    label: 'Listens per year',
                    data: yearData,
                    backgroundColor: [
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                        'rgb(78,166,130)',
                    ],
                    borderColor: [
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                        'rgb(107,235,182)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });
    }
}

