var mysql = require('mysql');

//Connect to MySQL DB
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "phillip.1407",
    database: "kidsafe"
});

//Check connection
con.connect(function(err){
    if (err) throw err
    console.log("Connected!!")
})


module.exports = {
    find: (table, condition)=>{
        const sql = `select * from ${table} where ${condition}`
        return new Promise((resolve,reject)=>{con.query(sql, function(err, result){
            console.log(result)
            if(err) reject({status: 400, msg: 'Error while finding'})
            resolve({status: 200, result})
        })})
    },
    findAll: (table)=>{
        const sql = `select * from ${table}`
        return new Promise((resolve,reject)=>{con.query(sql, function(err, result){
            if(err) reject({status:400, msg: 'Error while finding'})
            resolve({status: 200, msg:''})
        })})
    },
    create: (table, field, values)=>{
        const sql = `insert into ${table} (${field}) values (?)`
        return new Promise((resolve,reject)=>{con.query(sql,[values], function(err){
            console.log('err ', err)
            if(err) reject ({status:400, msg: err })
            resolve ({status:200, msg: '' })
        })})
    },
    update:  (table, values, condition) =>{
        const sql = `update into ${table} set ? where ?`
        return new Promise((resolve,reject)=>{con.query(sql,[values,condition], function(err, result){
            if(err) reject ({status:400, msg: err })
            resolve ({status:200, msg: '' })
        })})
    },
    
    delete: (table, condition)=>{
        const sql = `delete from ${table} where ?`
        return new Promise((resolve,reject)=>{con.query(sql,[condition], function(err, result){
            if(err) reject ({status:400, msg: err })
            resolve ({status:200, msg: '' })
        })})
    }
}