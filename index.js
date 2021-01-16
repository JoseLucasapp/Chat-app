const express = require('express');
const app = express();
const consign = require('consign');
const http = require('http').createServer(app);
let io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));

consign().include('app/routes')
    .then('app/models')
    .into(app);

app.app.models.index.ioModel(io);

http.listen(PORT);