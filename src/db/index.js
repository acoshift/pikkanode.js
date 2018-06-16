const mysql = require('mysql2/promise')

const pool = mysql.createPool({
	user: 'root',
	host: '127.0.0.1',
	database: 'pikkanode'
})

module.exports = pool
