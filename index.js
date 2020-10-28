const express = require('express');
const app = express();
const http = require('http').createServer(app);
let io = require('socket.io')(http);
const port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});


users = []
messages = []

io.on('connection',(socket)=>{
    socket.on('message',(msgObject)=>{
        io.emit('message', msgObject);
        messages.push(msgObject);
    });
    socket.on('user',(user)=>{
        io.emit('user',user);
        users.push(user);
    });
    socket.emit('previous', messages);
    socket.emit('previoususers',users);
});

http.listen(port);