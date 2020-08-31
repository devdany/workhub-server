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
  }
}