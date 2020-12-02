let application = require('./config/server');
const http = require('http').createServer(application);
let io = require('socket.io')(http);
const port = process.env.PORT || 3000;

application.app.models.index.ioModel(io);

http.listen(port);