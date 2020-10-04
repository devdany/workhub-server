import { S3_ACCESS_KEY, S3_SECRET_KEY } from '@src/config/secret'

import AWS from 'aws-sdk'
import storageConfig from '@src/config/storage'

AWS.config.update({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  region: storageConfig.s3.region,
})

export const s3 = new AWS.S3()
export const dynamoDB = new AWS.DynamoDB.DocumentClient()
