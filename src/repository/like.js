const pool = require('../db')

async function insert (userId, pictureId) {
  await pool.query(`
    insert into likes
      (user_id, picture_id)
    values
      (?, ?)
    on duplicate key update user_id = user_id
  `, [ userId, pictureId ])
}

async function remove (userId, pictureId) {
  await pool.query(`
    delete from likes
    where user_id = ? and picture_id = ?
  `, [ userId, pictureId ])
}

module.exports = {
  insert,
  remove
}
