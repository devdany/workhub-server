import { JWT_SECRET_KEY } from '@src/config/secret'
import jwt from 'jsonwebtoken'

export const generateJwtToken = (id: number) => {
  return jwt.sign({ id: id }, JWT_SECRET_KEY, {
    expiresIn: '7d',
    issuer: 'workhub',
    subject: 'login_user',
  })
}

type DecodedJwt = {
  id: number
}

export const confirmJwtToken = (token: string): DecodedJwt => <DecodedJwt>jwt.verify(token, JWT_SECRET_KEY)