import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'

import Project from './Project'
import User from './User'

@Table({ freezeTableName: true, underscored: true, timestamps: false })
export default class ProjectMember extends Model<ProjectMember>{
  @ForeignKey(() => Project)
  @Column
  projectId: number

  @ForeignKey(() => User)
  @Column
  userId: number
}