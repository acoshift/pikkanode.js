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

async function findByPictureId (pictureId) {
  const [rows] = await pool.query(`
    select
      id, text, created_at as createdAt
    from comments
    where picture_id = ?
  `, [ pictureId ])
  return rows
}

async function getCreatedAtById (commentId) {
  const [rows] = await pool.query(`
    select
      created_at
    from comments
    where id = ?
  `, [ commentId ])
  return rows[0] && rows[0].created_at
}

module.exports = {
  insert,
  findByPictureId,
  getCreatedAtById
}
