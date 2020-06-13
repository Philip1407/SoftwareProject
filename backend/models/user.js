let mongoose = require('mongoose')


let userSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    Kids: String,
    role: {type:String, default:'Parents'},
    path: []
}) 

module.exports = mongoose.model('User', userSchema)