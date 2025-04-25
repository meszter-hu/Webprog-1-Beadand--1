const API_URL = 'http://gamf.nhely.hu/ajax2/';
const code = 'TLUZ70xy'; 

function validateFields(name, height, weight) {
    if (!name || !height || !weight) return false;
    if (name.length > 30 || height.length > 30 || weight.length > 30) return false;
    return true;
}

function read() {
    fetch(`${API_URL}?op=read&code=${code}`)
        .then(res => res.json())
        .then(data => {
            const div = document.getElementById('dataList');
            let html = '<ul>';
            let sum = 0, max = 0;
            data.list.forEach(row => {
                html += `<li>ID: ${row.id}, Név: ${row.name}, Height: ${row.height}, Weight: ${row.weight}</li>`;
                let h = parseInt(row.height);
                if (!isNaN(h)) {
                    sum += h;
                    if (h > max) max = h;
                }
            });
            const avg = data.list.length ? (sum / data.list.length).toFixed(2) : 0;
            html += `</ul><p>Magasság összesen: ${sum}, Átlag: ${avg}, Max: ${max}</p>`;
            div.innerHTML = html;
        });
}

function create() {
    const name = document.getElementById('name').value.trim();
    const height = document.getElementById('height').value.trim();
    const weight = document.getElementById('weight').value.trim();
    if (!validateFields(name, height, weight)) {
        showMessage('Hibás mezők!');
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        body: new URLSearchParams({
            op: 'create',
            code,
            name,
            height,
            weight
        })
    })
    .then(res => res.text())
    .then(txt => showMessage('Create válasz: ' + txt));
}

function update() {
    const id = document.getElementById('id').value.trim();
    const name = document.getElementById('name').value.trim();
    const height = document.getElementById('height').value.trim();
    const weight = document.getElementById('weight').value.trim();
    if (!id || !validateFields(name, height, weight)) {
        showMessage('Hibás mezők!');
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        body: new URLSearchParams({
            op: 'update',
            id,
            code,
            name,
            height,
            weight
        })
    })
    .then(res => res.text())
    .then(txt => showMessage('Update válasz: ' + txt));
}

function deleteData() {
    const id = document.getElementById('id').value.trim();
    if (!id) {
        showMessage('ID szükséges a törléshez!');
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        body: new URLSearchParams({
            op: 'delete',
            id,
            code
        })
    })
    .then(res => res.text())
    .then(txt => showMessage('Delete válasz: ' + txt));
}

function getDataForId() {
    const id = document.getElementById('id').value.trim();
    if (!id) return;
    fetch(`${API_URL}?op=read&code=${code}`)
        .then(res => res.json())
        .then(data => {
            const found = data.list.find(item => item.id === id);
            if (found) {
                document.getElementById('name').value = found.name;
                document.getElementById('height').value = found.height;
                document.getElementById('weight').value = found.weight;
                showMessage('Adatok beolvasva');
            } else {
                showMessage('Nincs ilyen ID');
            }
        });
}

function showMessage(msg) {
    document.getElementById('message').textContent = msg;
}
