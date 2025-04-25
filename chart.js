const rows = document.querySelectorAll('#dataTable tbody tr');
const ctx = document.getElementById('myChart').getContext('2d');

const labels = ['A', 'B', 'C', 'D', 'E'];

let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Kiválasztott sor adatai',
            data: [],
            borderWidth: 2,
            fill: false,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

rows.forEach(row => {
    row.addEventListener('click', () => {
        const values = Array.from(row.querySelectorAll('td')).map(td => Number(td.textContent));
        chart.data.datasets[0].data = values;
        chart.update();
    });
});