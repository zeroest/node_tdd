// let express = require('express');
// let morgan = require('morgan');
import express from 'express';
import morgan from 'morgan';

import path from 'path';
import bodyParser from 'body-parser';

import mongoose from 'mongoose';

import api from './routes';
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