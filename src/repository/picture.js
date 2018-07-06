const pool = require('../db')

async function insert (id, caption, userId) {
  await pool.query(`
    insert into pictures
      (id, caption, created_by)
    values
      (?, ?, ?)
  `, [ id, caption, userId ])
}

async function getCreatedAtById (id) {
  const [result] = await pool.query(`
    select
      created_at
    from pictures
    where id = ?
  `, [ id ])
  return result[0] && result[0].created_at
}

module.exports = {
  insert,
  getCreatedAtById
}
