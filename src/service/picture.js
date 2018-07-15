const repo = require('../repository')
const AppError = require('../util/appError')
const gcs = require('./gcs')

const allowFileType = {
  'image/png': true,
  'image/jpeg': true
}

async function create (caption, picture, createBy) {
  if (!allowFileType[picture.type]) {
    throw new AppError('file type not allow', 400)
  }

  const filename = await gcs.upload(picture.path)
  await repo.picture.insert(filename, caption, createBy)
  return filename
}

async function like (userId, pictureId) {
  const isExists = await repo.picture.isExists(pictureId)
  if (!isExists) {
    throw new AppError('invalid request', 400)
  }

  await repo.like.insert(userId, pictureId)
}

async function unlike (userId, pictureId) {
  const isExists = await repo.picture.isExists(pictureId)
  if (!isExists) {
    throw new AppError('invalid request', 400)
  }

  await repo.like.remove(userId, pictureId)
}

module.exports = {
  create,
  like,
  unlike
}
