module.exports = (app)=>{
    app.post('/chat',(req,res)=>{
        res.render('chat');
    });
}