import { getImageFromBlob } from "@utils/stringUtils"
import { s3 } from './index'
import storageConfig from '@src/config/storage'

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