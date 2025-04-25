const form = document.getElementById('form');
const tableBody = document.querySelector('#dataTable tbody');
const searchInput = document.getElementById('search');
let data = [];
let sortCol = '';
let sortAsc = true;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value;
    const city = document.getElementById('city').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name || !age || !city || !email) return;

    data.push({ name, age, city, email });
    form.reset();
    renderTable();
});

function renderTable() {
    const filter = searchInput.value.toLowerCase();
    let filtered = data.filter(row =>
        Object.values(row).some(val => val.toString().toLowerCase().includes(filter))
    );

    if (sortCol) {
        filtered.sort((a, b) => {
            if (a[sortCol] < b[sortCol]) return sortAsc ? -1 : 1;
            if (a[sortCol] > b[sortCol]) return sortAsc ? 1 : -1;
            return 0;
        });
    }

    tableBody.innerHTML = '';
    filtered.forEach((row, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.name}</td>
            <td>${row.age}</td>
            <td>${row.city}</td>
            <td>${row.email}</td>
            <td>
                <button onclick="editRow(${index})">✏️</button>
                <button onclick="deleteRow(${index})">❌</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function editRow(index) {
    const row = data[index];
    document.getElementById('name').value = row.name;
    document.getElementById('age').value = row.age;
    document.getElementById('city').value = row.city;
    document.getElementById('email').value = row.email;
    deleteRow(index);
}

function deleteRow(index) {
    data.splice(index, 1);
    renderTable();
}

document.querySelectorAll('th[data-col]').forEach(th => {
    th.addEventListener('click', () => {
        const col = th.getAttribute('data-col');
        if (sortCol === col) {
            sortAsc = !sortAsc;
        } else {
            sortCol = col;
            sortAsc = true;
        }
        renderTable();
    });
});

searchInput.addEventListener('input', renderTable);
