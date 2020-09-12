import { S3_ACCESS_KEY, S3_SECRET_KEY } from '@src/config/secret'

import { getImageFromBlob } from "./stringUtils"
import storageConfig from '@src/config/storage'

const AWS = require('aws-sdk')

AWS.config.update({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  region: storageConfig.s3.region,
})

const s3 = new AWS.S3()

export const uploadProfileImage = async (imageBlob: string, profileImgId: string): Promise<string> => {
  const { buffer, type } = getImageFromBlob(imageBlob)
  const key = 'profileImages/' + profileImgId + '.' + type
  await s3.upload({
    Bucket: storageConfig.s3.bucket,
    ACL: 'public-read',
    Body: buffer,
    Key: key,
    ContentEncoding: 'base64',
    ContentType: `image/${type}`,
  }).promise()
  const imageUrl = storageConfig.s3.endpoint + key
  return imageUrl
}