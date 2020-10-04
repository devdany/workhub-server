import { dynamoDB } from './index'
import storageConfig from '@src/config/storage'

type Certification = {
  code: string
  createdAt: number
}

export const insertCertification = (email: string, certification: Certification) => {
  return new Promise((resolve, reject) => {
    dynamoDB.put({
      TableName: storageConfig.dynamoDB.tables.certification,
      Item: {
        email: email,
        code: certification.code,
        createdAt: certification.createdAt
      }
    }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export const findCertification = (email: string): Promise<Certification | null> => {
  return new Promise((resolve, reject) => {
    dynamoDB.get({
      TableName: storageConfig.dynamoDB.tables.certification,
      Key: {
        email: email
      }
    }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        if (data.Item) {
          resolve(<Certification>data.Item)
        } else {
          resolve(null)
        }
      }
    })
  })
}

export const updateCertifiaction = (email: string, certification: Certification) => {
  return new Promise((resolve, reject) => {
    dynamoDB.update({
      TableName: storageConfig.dynamoDB.tables.certification,
      Key: {
        email: email
      },
      UpdateExpression: 'set code = :c, createdAt = :a',
      ExpressionAttributeValues:{
        ":c":certification.code,
        ":a":certification.createdAt,
      },
      ReturnValues:'UPDATED_NEW'
    }, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}