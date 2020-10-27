const app = require('express')();
const http = require('http').createServer(app);
const port = 3000;
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/pages/index.html');
});

http.listen(port);