import { PASSWORD_SALT_ROUND } from '@src/config/secret'
import bcrypt from 'bcrypt'

export const encryptPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, PASSWORD_SALT_ROUND, (err: any, hash: string) => {
      if (!err) {
        resolve(hash)
      } else {
        reject(err)
      }
    })
  })
}

export const confirmPassword = (encoded: string, plain: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, encoded, (err, res) => {
      if (!err) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
}