const { picture } = require('../repository')
const gcs = require('./gcs')

async function create (caption, pictureFile, createBy) {
  const filename = await gcs.upload(pictureFile)
  await picture.insert(filename, caption, createBy)
  return filename
}

module.exports = {
  create
}
