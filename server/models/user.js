import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    id: Number,
    name: String,
    created: {type: Date, default: Date.now}
});

export default mongoose.model('user', User);