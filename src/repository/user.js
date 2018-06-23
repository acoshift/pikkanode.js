const pool = require('../db')

async function register (email, password) {
	const result = await pool.query(`
		insert into users
			(email, password)
		values
			(?, ?)
	`, [ email, password ])
	return result[0].insertId
}

async function getPasswordByEmail (email) {
	const result = await pool.query(`
		select
			password
		from users
		where email = ?
	`, [ email ])
	return result[0].password
}

module.exports = {
	register,
	getPasswordByEmail
}
