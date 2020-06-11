let mongoose = require('mongoose')

let location = new mongoose.Schema({
    x: String,
    y: String,
    timestamp: Date
})

let userSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstname: String,
    lastname: String,
    role: {type:String, default:'Parents'},
    path: [location]
}) 

module.exports = mongoose.model('User', userSchema)