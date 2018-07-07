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

async function get (id) {
  const [result] = await pool.query(`
    select
      id, caption, created_by as createdBy, created_at as createdAt,
      (select count(*) from likes where picture_id = id) as likeCount
    from pictures
    where id = ?
  `, [ id ])
  return result[0]
}

async function isExists (id) {
  const [result] = await pool.query(`
    select exists(select 1 from pictures where id = ? limit 1) as b
  `, [ id ])
  return result[0].b === 1
}

module.exports = {
  insert,
  getCreatedAtById,
  list,
  get,
  isExists
}
