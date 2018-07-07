const bcrypt = require('bcrypt')
const repo = require('../repository')
const AppError = require('../util/appError')

/**
 * signUp
 * sign up new user then return user id
 * @param {string} email
 * @param {string} password
 * @returns {Promise<number>}
 */
async function signUp (email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const insertId = await repo.user.register(email, hashedPassword)
    return insertId
  } catch (err) {
    if (err.message === 'err_dup_entry') {
      throw new AppError('email already used', 400)
    }
    throw err
  }
}

/**
 * verifyEmailAndPassword
 * verify user email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>}
 */
async function verifyEmailAndPassword (email, password) {
  const hashedPassword = await repo.user.getPasswordByEmail(email)

  if (!hashedPassword) {
    throw new AppError('wrong email or password', 400)
  }

  return bcrypt.compare(password, hashedPassword)
}

module.exports = {
  signUp,
  verifyEmailAndPassword
}
