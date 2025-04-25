
function saveToStorage() {
    const input = document.getElementById('storageInput').value;
    localStorage.setItem('myData', input);
    document.getElementById('storageOutput').textContent = "Mentett adat: " + input;
}


let worker;
function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (!worker) {
            worker = new Worker(URL.createObjectURL(new Blob([`
                self.onmessage = function() {
                    let sum = 0;
                    for (let i = 0; i < 1e7; i++) sum += i;
                    self.postMessage(sum);
                }
            `], { type: "text/javascript" })));
        }
        worker.onmessage = function(e) {
            document.getElementById('workerOutput').textContent = "Összeg: " + e.data;
        };
        worker.postMessage('');
    } else {
        document.getElementById('workerOutput').textContent = "A böngésződ nem támogatja a web workereket.";
    }
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            document.getElementById('geoOutput').textContent =
                `Szélesség: ${position.coords.latitude}, Hosszúság: ${position.coords.longitude}`;
        }, () => {
            document.getElementById('geoOutput').textContent = "Nem sikerült lekérni a pozíciót.";
        });
    } else {
        document.getElementById('geoOutput').textContent = "A böngésződ nem támogatja a geolocation API-t.";
    }
}


const box = document.getElementById('dragBox');
const zone = document.getElementById('dropZone');
box.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', ''));
zone.addEventListener('dragover', e => e.preventDefault());
zone.addEventListener('drop', () => {
    zone.appendChild(box);
});


const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 75);
