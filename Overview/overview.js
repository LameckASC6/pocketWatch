let pieChart = document.getElementById("pieChart").getContext("2d");


let spendingChart = new Chart(pieChart, {
    type: 'doughnut',
    data: {
        labels:['progress', 'goal',],
        datasets: [{
            label: 'Amount',
            data: [
                500,
                100,
            ],
            backgroundColor: [
                'rgba(12,204, 85, 1)',
                '#e5e5e5'
            ]
        }]
    },
    options:{}
})