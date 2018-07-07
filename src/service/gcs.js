const Storage = require('@google-cloud/storage')
const uuidv4 = require('uuid/v4')
const path = require('path')
const { gcs } = require('../../config')

module.exports = (() => {
  const storage = new Storage({
    keyFilename: gcs.keyFile
  })
  const bucketName = gcs.bucketName

  return {
    storage,
    async upload (filename) {
      const uuid = uuidv4()
      await storage.bucket(bucketName).upload(filename, {
        destination: path.join(gcs.dest, uuid),
        public: true
      })
      return uuid
    },
    getUrl (filename) {
      return `https://storage.googleapis.com/${bucketName}/${gcs.dest}/${filename}`
    }
  }
})()
