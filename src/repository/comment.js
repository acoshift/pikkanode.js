const pool = require('../db')

async function findByPictureId (id) {
  const [result] = await pool.query(`
    select
      id, text, created_at as createdAt
    from comments
    where picture_id = ?
  `, [ id ])
  return result
}

module.exports = {
  findByPictureId
}
