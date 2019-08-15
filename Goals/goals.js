if (sessionStorage.getItem('user') == null || sessionStorage.getItem('user') == "null") {
    window.location.href = "../login/login.html";
}

document.querySelector("#signout").addEventListener('click', signout);

const database = firebase.database().ref();
let pieChart = document.getElementById("pieChart").getContext("2d");
let category = document.getElementById("category");

let amount = document.getElementById("amount");
let addButton = document.getElementById("addButton");
let reciepts = document.getElementById("reciepts");
let labels;
let datasets;
let colors;
let categoryVal;
let total = 0;

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let chartData = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Amount',
                data: [],
                backgroundColor: []
            }
        ]
    },
    options: {

    }
}

let chartData = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Amount',
                data: [],
                backgroundColor: []
            }
        ]
    },
    options: {

    }
}
let user = sessionStorage.getItem('user');
drawChart();
let duplicate;

function inArray(looking, array) {
    let count = array.length;
    for (let i = 0; i < count; i++) {
        if (array[i] == looking) {
            return true;
        }
    }
    return false;
}

async function addClick(event) {
    categoryVal = category.value;
    categoryVal = categoryVal.charAt(0).toUpperCase() + categoryVal.slice(1).toLowerCase();
    event.preventDefault();
    console.log(spendingChart)
    let reciept = document.createElement("h4");
    reciept.id = "reciept";
    reciept.style.backgroundColor = "#edf4ed";
    reciept.style.marginLeft = "1%";
    reciept.style.marginRight = "1%";
    reciept.style.width = "98%";
    reciept.style.color = "black";
    reciept.style.textTransform = "capitalize";
    reciept.innerText = `${categoryVal} Spending Budget: $${amount.value}`;
    reciepts.prepend(reciept);
    console.log(reciept.innerText);
    console.log(total);
    if (categoryVal != "" && amount.value != "" && inArray(categoryVal, chartData.data.labels) != true) {
        chartData.data.labels.push(categoryVal);
        chartData.data.datasets[0].data.push(parseInt(amount.value));
        chartData.data.datasets[0].backgroundColor.push(getRandomColor());

        //Pushing to Database
        pushChartData();
        //End of pushing to database

    } else if (categoryVal != "" && amount.value != "") {
        let newAmount = chartData.data.datasets[0].data[duplicate] += parseInt(amount.value);
        chartData.data.datasets[0].data.splice([duplicate], 1, newAmount);
    }
    drawChart();
}

async function drawChart(labels, datasets, colors) {
    chartData.data.datasets = [
        {
            label: 'Amount',
            data: [],
            backgroundColor: []
        }
    ];
    labels = await database.child(`users/${user}/chartData/labels`).once('value');
    datasets = await database.child(`users/${user}/chartData/datasets`).once('value');
    colors = await database.child(`users/${user}/chartData/color`).once('value');
    labels = labels.val();
    datasets = datasets.val();
    colors = colors.val();
    console.log(labels, datasets, colors)
    // Turning the database objects into arrays
    labels = Object.keys(labels).map(function (key) {
        return [labels[key]];
    });
    datasets = Object.keys(datasets).map(function (key) {
        return [datasets[key]];
    });
    colors = Object.keys(colors).map(function (key) {
        return [colors[key]];
    });

    let duplicate;
    // Adding stored infro from database into pie chart
    console.log(labels);
    console.log(datasets);
    console.log(colors)
    for (let i = 0; i < labels.length; i++) {
        if(!inArray(labels[i], chartData.data.labels)){
            chartData.data.labels.push(labels[i][0]);
            duplicate = i;
        }
    }
    for (let j = 0; j < datasets.length; j++) {
        chartData.data.datasets[0].data.push(datasets[j][0]);
    }
    for (let j = 0; j < colors.length; j++) {
        console.log(colors[j][0]);
        chartData.data.datasets[0].backgroundColor.push(colors[j][0]);
    }
    console.log(chartData);
    spendingChart.update();
    

    // if (categoryVal != "" && amount.value != "" && inArray(categoryVal, labels) != true) {
    //     chartData.data.labels.push(categoryVal);
    //     chartData.data.datasets[0].data.push(parseInt(amount.value));
    //     chartData.data.datasets[0].backgroundColor.push(getRandomColor());

    // } else if (categoryVal != "" && amount.value != "") {
    //     let newAmount = chartData.data.datasets[0].data[duplicate] += parseInt(amount.value);
    //     chartData.data.datasets[0].data.splice([duplicate], 1, newAmount);
    // }
}

addButton.addEventListener('click', addClick);

let spendingChart = new Chart(pieChart, chartData);

async function login(e) {
    e.preventDefault();
    const labels = await database.child(`users/${user}/chartData/labels`).once('value');
    const datasets = await database.child(`users/${user}/chartData/datasets`).once('value');
    const colors = await database.child(`users/${user}/chartData/color`).once('value');

    console.log(labels);
    console.log(datasets);
    console.log(colors);
}

async function pushChartData(labels, datasets, colors) {
    labels = await database.child(`users/${user}/chartData/labels`);
    datasets = await database.child(`users/${user}/chartData/datasets`);
    colors = await database.child(`users/${user}/chartData/color`);

    labels = labels.push(categoryVal);
    datasets = datasets.push(parseInt(amount.value));
    colors = colors.push(getRandomColor());

}


function signout(){
    sessionStorage.setItem('user', null);
    window.location.href = "../index.html";
}
