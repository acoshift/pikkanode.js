const pool = require('../db')

async function insert (text, pictureId, userId) {
  const [result] = await pool.query(`
    insert into comments
      (text, picture_id, created_by)
    values
      (?, ?, ?)
  `, [ text, pictureId, userId ])
  return result.insertId
}

async function findByPictureId (id) {
  const [result] = await pool.query(`
    select
      id, text, created_at as createdAt
    from comments
    where picture_id = ?
  `, [ id ])
  return result
}

async function getCreatedAtById (id) {
  const [result] = await pool.query(`
    select
      created_at
    from comments
    where id = ?
  `, [ id ])
  return result[0] && result[0].created_at
}

module.exports = {
  insert,
  findByPictureId,
  getCreatedAtById
}
