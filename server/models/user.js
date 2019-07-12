const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    id: Number,
    name: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('user', User);