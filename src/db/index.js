const mysql = require('mysql2/promise')

const pool = mysql.createPool({
	user: 'root',
	password: 'codecamp',
	host: '35.240.133.57',
	database: 'pikkanode'
})

module.exports = pool
