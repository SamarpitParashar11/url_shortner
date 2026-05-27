const mongoose = require('mongoose');
const { type } = require('node:os');

const urlSchema = new mongoose.Schema({
    shortID:{
        type: String,
        required: true,
        unique: true
    },
    redirectURL:{
        type: String,
        required: true
    },
    visitHistory:[
        {
            timestamp: {
                type: Number,
    }}],
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL; 