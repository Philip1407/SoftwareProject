let mongoose = require('mongoose')


let dangerous = new mongoose.Schema({
    Idparent:String,
    del: Boolean,
    latitude: Number,
    longitude: Number,
    name:String
}) 

module.exports = mongoose.model('dangerous', dangerous)