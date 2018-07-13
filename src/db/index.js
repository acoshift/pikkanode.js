const mysql = require('mysql2/promise')
const { db } = require('../../config')

const pool = mysql.createPool({
  user: db.user,
  password: db.password,
  host: db.host,
  database: db.database
})

module.exports = pool
