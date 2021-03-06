const pool = require('../db')

async function insert (pictureId, caption, userId) {
  await pool.query(`
    insert into pictures
      (id, caption, created_by)
    values
      (?, ?, ?)
  `, [ pictureId, caption, userId ])
}

async function getCreatedAtById (pictureId) {
  const [result] = await pool.query(`
    select
      created_at
    from pictures
    where id = ?
  `, [ pictureId ])
  return result[0] && result[0].created_at
}

async function list () {
  const [result] = await pool.query(`
    select
      id, caption, created_by as createdBy, created_at as createdAt,
      (select count(*) from comments where picture_id = id) as commentCount,
      (select count(*) from likes where picture_id = id) as likeCount
    from pictures
    order by created_at desc
  `)
  return result
}

async function get (pictureId) {
  const [result] = await pool.query(`
    select
      id, caption, created_by as createdBy, created_at as createdAt,
      (select count(*) from likes where picture_id = id) as likeCount
    from pictures
    where id = ?
  `, [ pictureId ])
  return result[0]
}

async function isExists (pictureId) {
  const [result] = await pool.query(`
    select exists(select 1 from pictures where id = ? limit 1) as b
  `, [ pictureId ])
  return result[0].b === 1
}

async function remove (pictureId) {
  await pool.query(`
    delete from pictures
    where id = ?
  `, [ pictureId ])
}
module.exports = {
  insert,
  getCreatedAtById,
  list,
  get,
  isExists,
  remove
}
