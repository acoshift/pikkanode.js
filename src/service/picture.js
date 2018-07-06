const { picture } = require('../repository')
const gcs = require('./gcs')

async function createPikka (userId, caption, pictureFile) {
  console.log(userId, caption, pictureFile)
  const filename = await gcs.upload(pictureFile)
  await picture.insert(filename, caption, userId)
  return filename
}

module.exports = {
  createPikka
}
