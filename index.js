const express = require('express');
const app = express();
const http = require('http').createServer(app);
let io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});


messages = [];
users = 0;

io.on('connection',(socket)=>{
    users++;
    socket.on('message',(msgObject)=>{
        io.emit('message', msgObject);
        messages.push(msgObject);
        if(messages.length >= 20){
            messages.splice(0,1);
        }
    });
    socket.on('disconnect',()=>{
        users--;
        if(users <= 0){
            users = 0;
            let all = messages.length;
            messages.splice(0,all);
        }
        io.emit('userOn', users);
    });
    socket.emit('previous', messages);
    socket.emit('previoususers',users);
    socket.broadcast.emit('userOn',users);
});

http.listen(port);