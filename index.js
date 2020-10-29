const express = require('express');
const app = express();
const http = require('http').createServer(app);
let io = require('socket.io')(http);
const port = process.env.port || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});


messages = [];
usersnames = [];
users = 0;

io.on('connection',(socket)=>{
    users++;
    socket.on('message',(msgObject)=>{
        io.emit('message', msgObject);
        messages.push(msgObject);
    });
    socket.on('disconnect',(user)=>{
        users--;
        if(users <= 0){
            users = 0;
        }
        console.log(usersnames.indexOf(user));
        io.emit('userOn', users);
    });
    socket.on('user', (user)=>{
        usersnames.push(user);
        io.emit('usersnames',user);
    });
    socket.emit('previoususersname',usersnames);
    socket.emit('previous', messages);
    socket.emit('previoususers',users);
    socket.broadcast.emit('userOn',users);
});

http.listen(port);