// let express = require('express');
// let morgan = require('morgan');
const express = require('express');
const morgan = require('morgan');

const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const api = require('./routes');
//=====================================
const app = express();
const port = 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

const db = mongoose.connection;

db.on('error', console.error);
db.once('open', _=> console.log('Connected to mongodb server') );
mongoose.connect('mongodb://localhost/node_tdd');

app.use('/api', api)

//=====================================
app.listen(port, ()=>{
    console.log(`express on ${port}`)
})

module.exports = app;