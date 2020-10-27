const app = require('express')();
const http = require('http').createServer(app);
const port = 3000;
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/pages/index.html');
});
app.get('/chat', (req,res)=>{
    res.sendFile(__dirname + '/pages/chat.html');
});

http.listen(port);