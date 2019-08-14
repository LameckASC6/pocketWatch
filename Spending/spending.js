const database = firebase.database().ref();
let pieChart = document.getElementById("pieChart").getContext("2d");
let category = document.getElementById("category");

let amount = document.getElementById("amount");
let addButton = document.getElementById("addButton");
let totalText = document.getElementById("total");
let reciepts = document.getElementById("reciepts");
let labels;
let datasets;
let colors;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

let total = 0;
let chartData = {
    type: 'pie',
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

let duplicate;

function inArray(looking, array) {
    var count = array.length;
    for (var i = 0; i < count; i++) {
        if (array[i] === looking) {
            duplicate = i;
            return true;
        }
    }
    return false;
}


let user = sessionStorage.getItem('user');
totalText.innerText = `Total: $${total}`;

drawChart();

async function addClick(event) {
    let categoryVal = category.value;
    categoryVal = categoryVal.charAt(0).toUpperCase() + categoryVal.slice(1).toLowerCase();
    event.preventDefault();
    total = total + parseInt(amount.value);
    totalText.innerText = `Total: $${total}`;
    spendingChart.update();
    let reciept = document.createElement("h4");
    reciept.id="reciept";
    reciept.style.backgroundColor = "#edf4ed";
    reciept.style.marginLeft = "1%";
    reciept.style.marginRight = "1%";
    reciept.style.width = "98%";
    reciept.style.color = "black";
    reciept.style.textTransform = "capitalize";
    reciept.innerText = `${categoryVal} : $${amount.value}`;
    reciepts.prepend(reciept);
    console.log(reciept.innerText);
    console.log(total);
    console.log(labels, datasets, colors);
    if (categoryVal != "" && amount.value != "" && inArray(categoryVal, chartData.data.labels) != true) {
        chartData.data.labels.push(categoryVal);
        chartData.data.datasets[0].data.push(parseInt(amount.value));
        chartData.data.datasets[0].backgroundColor.push(getRandomColor());
        
    } else if (categoryVal != "" && amount.value != "") {
        let newAmount = chartData.data.datasets[0].data[duplicate] += parseInt(amount.value);
        chartData.data.datasets[0].data.splice([duplicate], 1, newAmount);
    }
    drawChart();
}

async function drawChart(labels, datasets, colors) {
    labels = await database.child(`users/${user}/chartData/labels`).once('value');
    datasets = await database.child(`users/${user}/chartData/datasets`).once('value');
    colors = await database.child(`users/${user}/chartData/color`).once('value');
    labels = labels.val();
    datasets = datasets.val();
    colors = colors.val();
    for (i = 0; i < labels.length; i++){
        chartData.data.labels.push(labels[i]);
    }
    for (i = 0; i < datasets.length; i++){
        chartData.data.datasets[0].data.push(datasets[i]);
    }
    for (i = 0; i < colors.length; i++){
        chartData.data.datasets[0].backgroundColor.push(colors[i]);
    }
}

addButton.addEventListener('click', addClick);

let spendingChart = new Chart(pieChart, chartData);

async function login(e){
  e.preventDefault();
  const labels = await database.child(`users/${user}/chartData/labels`).once('value');
  const datasets = await database.child(`users/${user}/chartData/datasets`).once('value');
  const colors = await database.child(`users/${user}/chartData/color`).once('value');

  console.log(labels);
  console.log(datasets);
  console.log(colors);
}



