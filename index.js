const app = require('express')();
const http = require('http').createServer(app);
let io = require('socket.io')(http);
const port = 3000;
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/pages/index.html');
});

io.on('connection',(socket)=>{
    console.log('conect');
    socket.on('disconnect',()=>{
        console.log('disconect');
    });
    socket.on('message',(message,name)=>{
        io.emit('message',message,name);
    });
});

http.listen(port);