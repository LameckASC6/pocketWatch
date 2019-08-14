const database = firebase.database().ref();
let pieChart = document.getElementById("pieChart").getContext("2d");
let category = document.getElementById("category");
let amount = document.getElementById("amount");
let addButton = document.getElementById("addButton");
let totalText = document.getElementById("total");
let reciepts = document.getElementById("reciepts");

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
let total = 70;
let chartData = {
    type: 'pie',
    data: {
        labels: ['Food', 'Shopping'],
        datasets: [{
            label: 'Amount',
            data: [
                25,
                45,
            ],
        backgroundColor: [
                'green',
                'red'
            ]
        }]
    },
    options: {}
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



totalText.innerText = `Total: $${total}`;

function addClick(event) {
    event.preventDefault();
    if (category.value != "" && amount.value != "" && inArray(category.value, chartData.data.labels) != true) {
        chartData.data.labels.push(category.value);
        chartData.data.datasets[0].data.push(parseInt(amount.value));
        chartData.data.datasets[0].backgroundColor.push(getRandomColor());
    } else if (category.value != "" && amount.value != "") {
        let newAmount = chartData.data.datasets[0].data[duplicate] += parseInt(amount.value);
        chartData.data.datasets[0].data.splice([duplicate], 1, newAmount);
    }
    total = total + parseInt(amount.value);
    totalText.innerText = `Total: $${total}`;
    spendingChart.update();
    let reciept = document.createElement("h4");
    reciept.style.backgroundColor = "whitesmoke";
    reciept.style.marginLeft = "1%";
    reciept.style.marginRight = "1%";
    reciept.style.width = "98%";
    reciept.style.color = "black";
    reciept.innerText = `${category.value} : $${amount.value}`;
    reciepts.prepend(reciept);
    console.log(reciept.innerText);
    console.log(total);
}


addButton.addEventListener('click', addClick);

let spendingChart = new Chart(pieChart, chartData);




