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

if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const db = mongoose.connection;
db.on('error', console.error);
db.once('open', _=> {/*console.log('Connected to mongodb server')*/} );
mongoose.connect('mongodb://localhost/node_tdd');



app.use('/api', api)

//=====================================

module.exports = app;