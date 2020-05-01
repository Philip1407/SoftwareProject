let db = require('../utils/db')

let User={}

User.find = async(condition) =>{
    return await db.find('user', condition)
}

User.findAll = async()=>{
        return db.findAll('user')
    }
User.create= async(user)=>{
        const query = await db.create('user','username, password, firstname, lastname, role', user)
        query.msg = "Sign in successful"
        return query
    }
User.update = async(user, condition)=>{
    return db.update('user',user,condition)
}
User.delete = async(condition)=>{
    return db.delete('user', condition)
}

module.exports= User

