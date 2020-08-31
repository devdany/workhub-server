import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
import User from '@models/User'
import storageConfig from '@src/config/storage'

const dbConnectConfig = process.env.NODE_ENV !== 'DEV' ? storageConfig.product : storageConfig.deveopment

export default new Sequelize({
  repositoryMode: true,
  dialect: 'mysql',
  host: dbConnectConfig.host,
  username: dbConnectConfig.username,
  password: dbConnectConfig.password,
  database: dbConnectConfig.schema,
  models: [User],
  operatorsAliases: {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $gte: Op.gte,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like,
    $ne: Op.ne,
    $notIn: Op.notIn,
  },
  logging: false,
})