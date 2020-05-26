let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstname: String,
    lastname: String,
    role: {type: Number, default: 0}
}) 

module.exports = mongoose.model('User', userSchema)