import redis from "../index"

export default {
  setCertificationCode: (email: string, code: string) => {
    return new Promise((resolve, reject) => {
      const createdAt = Date.now()
      redis.hmset(email, 'code', code, 'createdAt', createdAt, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },
  confirmCertificationCode: (email: string, code: string): Promise<boolean> => {
    return new Promise((resolve,reject) => {
      redis.hgetall(email, (err, data) => {
        if (err) {
          reject(err)
        }
        if (!data || !data['code']) {
          resolve(false)
        }
        if (data['code'] === code) {
          resolve(true)
        }
      })
    })
  },
  deleteCertificationCode: (email: string) => {
    return new Promise((resolve, reject) => {
      redis.del(email, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }
}


