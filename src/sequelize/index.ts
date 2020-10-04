import Comment from '@models/Comment'
import CommentLike from '@models/CommentLike'
import Feed from '@models/Feed'
import FeedContent from '@models/FeedContent'
import FeedLike from '@models/FeedLike'
import { Op } from 'sequelize'
import Project from '@models/Project'
import ProjectContent from '@models/ProjectContent'
import ProjectMember from '@models/ProjectMember'
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
  models: [User, Comment, CommentLike, Feed, FeedContent, FeedLike, Project, ProjectContent, ProjectMember],
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