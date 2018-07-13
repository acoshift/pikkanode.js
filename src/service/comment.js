const repo = require('../repository')
const AppError = require('../util/appError')

async function create (text, pictureId, createBy) {
  const isExists = await repo.picture.isExists(pictureId)
  if (!isExists) {
    throw new AppError('invalid request', 400)
  }

  const id = await repo.comment.insert(text, pictureId, createBy)
  return id
}

module.exports = {
  create
}
