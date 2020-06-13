let mongoose = require('mongoose')

let location = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: Date,
    Kids: String,
})


module.exports = mongoose.model('location', location)