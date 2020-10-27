const app = require('express')();
const http = require('http').createServer(app);
let io = require('socket.io')(http);
const port = process.env.port || 3000;
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/pages/index.html');
});

io.on('connection',(socket)=>{
    socket.on('message',(message,name)=>{
        io.emit('message',message,name);
    });
    socket.on('user',(user)=>{
        io.emit('user',user);
    });
});

http.listen(port);