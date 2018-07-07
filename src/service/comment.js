const { comment, picture } = require('../repository')
const AppError = require('../util/appError')

async function create (text, pictureId, createBy) {
  const isExists = await picture.isExists(pictureId)
  if (!isExists) {
    throw new AppError('invalid request', 400)
  }

  const id = await comment.insert(text, pictureId, createBy)
  return id
}

module.exports = {
  create
}
