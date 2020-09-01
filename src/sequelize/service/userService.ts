import User from '@models/User'
import sequelize from '@src/sequelize'

const userRepository = sequelize.getRepository(User)

export default {
  findUser: (userId: number) => {
    return userRepository.findOne({
      where: {
        id: userId
      }
    })
  },
  createUser: (email: string, encryptedPassword: string, username: string) => {
    return userRepository.create({
      email: email,
      password: encryptedPassword,
      username: username,
      createdAt: Date.now()
    })
  }
}