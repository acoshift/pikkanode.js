const pool = require('../db')

const register = async (email, password) => {
	const result = await pool.query(`
		insert into users
			(email, password)
		values
			(?, ?)
	`, [ email, password ])

	// ????
	return 1
}

module.exports = {
	register
}
