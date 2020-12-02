let app = require('./config/server');
const http = require('http').createServer(app);
let io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.app.models.index.ioModel(io);

messages = [];
users = 0;

http.listen(port);