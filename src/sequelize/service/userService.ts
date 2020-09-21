import User from '@models/User'
import sequelize from '@src/sequelize'

const userRepository = sequelize.getRepository(User)

export type EditedProfile = {
  firstName?: string
  lastName?: string
  headLine?: string
  profileImg?: string
}

export default {
  findUser: (userId: number) => {
    return userRepository.findOne({
      where: {
        id: userId
      }
    })
  },
  createUser: (email: string, encryptedPassword: string, username: string) => {
    const today = Date.now()
    return userRepository.create({
      email: email,
      password: encryptedPassword,
      username: username,
      createdAt: today,
      lastLogin: today,
      isInitalize: false,
      isCertificated: false,
    })
  },
  findByEmail: (email: string) => {
    return userRepository.findOne({
      where: {
        email: email
      }
    })
  },
  findByUsername: (username: string) => {
    return userRepository.findOne({
      where: {
        username: username
      }
    })
  },
  findByEmailOrUsername: (emailOrUsername: string) => {
    return userRepository.findOne({
      where: {
        $or: [
          {
            email: emailOrUsername
          },
          {
            username: emailOrUsername
          }
        ]
      }
    })
  },
  updateLastLogin: (userId: number) => {
    return userRepository.update({
      lastLogin: Date.now()
    }, {
      where: {
        id: userId
      }
    })
  },
  editProfile: (userId: number, editedProfile: EditedProfile) => {
    return userRepository.update({
      ...editedProfile,
      isInitalize: true,
    }, {
      where: {
        id: userId
      }
    })
  }
}