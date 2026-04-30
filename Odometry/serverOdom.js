const { getRandomValues } = require('crypto');
const express = require('express');
const path = require('path');
const app = express();
const PORT = 45050;

app.use(express.static(path.join(__dirname, 'public')));

app.get('', (req, res) => res.sendFile(path.join(__dirname, 'public', 'odom_dashboard.html')));

let ticketsL = 0;
let ticketsR = 0;

function validarIncremento(num) {
  return num < 50 ? (num % 2 !== 0) : (num % 2 === 0);
}

function generarSemilla(x) {
  let semilla = x;
  return function() {
    semilla = (semilla * 1664525 + 1013904223) % 4294967296;
    return (semilla / 4294967296);
  }
}

function aleatorio(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

const randomL = generarSemilla(Math.max(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)));
const randomR = generarSemilla(aleatorio((Math.random() * 100), (Math.random() * 100)));

setInterval(() => {
  const num = Math.floor(randomL() * 100) + 1;
  if (validarIncremento(num)) ticketsL++;
  console.log('Tickets para la rueda izquierda: ' + ticketsL)
}, 50);

setInterval(() => {
  const num = Math.floor(randomR() * 100) + 1;
  if (validarIncremento(num)) ticketsR++;
  console.log('Tickets para la rueda derecha: ' + ticketsR)
}, 50);

app.get('/ticketsL', (req, res) => res.json({ ticketsL }));
app.get('/ticketsR', (req, res) => res.json({ ticketsR }));

app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:' + PORT);
})
