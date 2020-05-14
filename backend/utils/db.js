var mysql = require("mysql");
const { promisify } = require("util");
//Connect to MySQL DB
var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    //port: 3306,
    port: 8889,
    user: "root",
    // password: "phillip.1407",
    // password: "123456",
    password: "root",
    database: "kidsafe",
});

// //Check connection
// con.connect(function(err){
//     if (err) throw err
//     console.log("Connected!!")
// })

const pool_query = promisify(pool.query).bind(pool);

module.exports = {
    find: (table, condition) =>
        pool_query(`select * from ${table} where ${condition}`),
    //{
    //     const sql = `select * from ${table} where ${condition}`
    //     return new Promise((resolve,reject)=>{con.query(sql, function(err, result){
    //         console.log(result)
    //         if(err) reject({status: 400, msg: 'Error while finding'})
    //         resolve({status: 200, result})
    //     })})

    // },
    findAll: (table) => pool_query(`select * from ${table}`),
    // {
    //     const sql = `select * from ${table}`
    //     return new Promise((resolve,reject)=>{con.query(sql, function(err, result){
    //         if(err) reject({status:400, msg: 'Error while finding'})
    //         resolve({status: 200, msg:''})
    //     })})
    // },
    create: (entity, tableName) =>
        pool_query(`insert into ${tableName} set ?`, entity),
    // {
    //     const sql = `insert into ${table} (${field}) values (?)`
    //     return new Promise((resolve,reject)=>{con.query(sql,[values], function(err){
    //         console.log('err ', err)
    //         if(err) reject ({status:400, msg: err })
    //         resolve ({status:200, msg: '' })
    //     })})
    // },
    update: (entity, tableName, idField, id) =>
        pool_query(`update into ${tableName} set ? where ${idField} = ?`, [
            entity,
            id,
        ]),
    // {
    //     const sql = `update into ${table} set ? where ?`
    //     return new Promise((resolve,reject)=>{con.query(sql,[values,condition], function(err, result){
    //         if(err) reject ({status:400, msg: err })
    //         resolve ({status:200, msg: '' })
    //     })})
    // },

    delete: (tableName, idField, id) =>
        pool_query(`delete from ${tableName} where ${idField} = ?`, id),
    // {
    //     const sql = `delete from ${table} where ?`
    //     return new Promise((resolve,reject)=>{con.query(sql,[condition], function(err, result){
    //         if(err) reject ({status:400, msg: err })
    //         resolve ({status:200, msg: '' })
    //     })})
    // }
};
