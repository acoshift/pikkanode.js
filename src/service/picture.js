const repo = require('../repository')
const AppError = require('../util/appError')
const gcs = require('./gcs')

async function create (caption, pictureFile, createBy) {
  const filename = await gcs.upload(pictureFile)
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
