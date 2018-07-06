const mysqlErrors = require('mysql2/lib/constants/errors')
const pool = require('../db')

async function register (email, password) {
  try {
    const [result] = await pool.query(`
      insert into users
        (email, password)
      values
        (?, ?)
    `, [ email, password ])
    return result.insertId
  } catch (err) {
    if (err.errno === mysqlErrors.ER_DUP_ENTRY) {
      throw new Error('err_dup_entry')
    }
    throw err
  }
}

async function getPasswordByEmail (email) {
  const [result] = await pool.query(`
    select password
    from users
    where email = ?
  `, [ email ])
  return result[0] && result[0].password
}

async function getIdByEmail (email) {
  const [result] = await pool.query(`
    select id
    from users
    where email = ?
  `, [ email ])
  return result[0] && result[0].id
}

module.exports = {
  register,
  getPasswordByEmail,
  getIdByEmail
}
