const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', '.app/views');

app.use(express.static('./app/public'));

module.exports = app;