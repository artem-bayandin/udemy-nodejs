const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'udemynodejs',
})

module.exports = pool.promise()