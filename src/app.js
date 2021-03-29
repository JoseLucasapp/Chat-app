const express = require('express');
const app = express();
const http = require('http').createServer(app);
let io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));

require('./app/routes/home')(app);

const DAO = require('./app/models/IO')();
const IO = new DAO;
IO.ioModel(io);

http.listen(PORT);