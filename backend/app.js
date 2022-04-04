const express = require('express');
const bodyParser =require('body-parser');
const path = require('path');

const app= express();
const route = require('./apiRouters.js');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use("/images",express.static(path.join(__dirname, "images")));
app.use('/', route);



module.exports = app;