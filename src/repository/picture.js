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
  const [rows] = await pool.query(`
    select
      created_at
    from pictures
    where id = ?
  `, [ pictureId ])
  return rows[0] && rows[0].created_at
}

async function list (userId) {
  const [rows] = await pool.query(`
    select
      p.id as id, p.caption, u.email as createdBy, p.created_at as createdAt,
      (select count(*) from comments where picture_id = p.id) as commentCount,
      (select count(*) from likes where picture_id = p.id) as likeCount,
      (case when t.picture_id is null then false else true end) as liked
    from pictures p
      left join users u on u.id = p.created_by
      left join (
        select picture_id
        from likes
        where user_id = ?
      ) t on t.picture_id = p.id
    order by p.created_at desc
  `, [userId])
  return rows.map(r => ({
    ...r, liked: r.liked === 1
  }))
}

async function get (pictureId, userId) {
  const [rows] = await pool.query(`
    select
      id, caption, created_by as createdBy, created_at as createdAt,
      (select count(*) from likes where picture_id = id) as likeCount,
      (select exists(select 1 from likes where picture_id = ? and user_id = ? limit 1)) as liked
    from pictures
    where id = ?
  `, [ pictureId, userId, pictureId ])
  return rows[0]
}

async function isExists (pictureId) {
  const [rows] = await pool.query(`
    select exists(select 1 from pictures where id = ? limit 1) as b
  `, [ pictureId ])
  return rows[0].b === 1
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
