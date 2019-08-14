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
let total = 0;
let chartData = {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            label: 'Amount',
            data: [
            ],
        backgroundColor: [
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
    let categoryVal = category.value;
    categoryVal = categoryVal.charAt(0).toUpperCase() + categoryVal.slice(1).toLowerCase();
    event.preventDefault();
    if (categoryVal != "" && amount.value != "" && inArray(categoryVal, chartData.data.labels) != true) {
        chartData.data.labels.push(categoryVal);
        chartData.data.datasets[0].data.push(parseInt(amount.value));
        chartData.data.datasets[0].backgroundColor.push(getRandomColor());
    } else if (categoryVal != "" && amount.value != "") {
        let newAmount = chartData.data.datasets[0].data[duplicate] += parseInt(amount.value);
        chartData.data.datasets[0].data.splice([duplicate], 1, newAmount);
    }
    total = total + parseInt(amount.value);
    totalText.innerText = `Total: $${total}`;
    spendingChart.update();
    let reciept = document.createElement("h4");
    reciept.id="reciept";
    reciept.style.backgroundColor = "whitesmoke";
    reciept.style.marginLeft = "1%";
    reciept.style.marginRight = "1%";
    reciept.style.width = "98%";
    reciept.style.color = "black";
    reciept.style.textTransform = "capitalize";
    reciept.innerText = `${categoryVal} : $${amount.value}`;
    reciepts.prepend(reciept);
    console.log(reciept.innerText);
    console.log(total);
}


addButton.addEventListener('click', addClick);

let spendingChart = new Chart(pieChart, chartData);




