const express = require('express');
const app = express();
const consign = require('consign');

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));

consign().include('app/routes')
    .then('app/models')
    .into(app);

module.exports = app;