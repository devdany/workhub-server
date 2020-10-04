import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'

import Project from './Project'

@Table({ freezeTableName: true, underscored: true, timestamps: false })
@ObjectType()
export default class ProjectContent extends Model<ProjectContent>{
  @Field()
  @Column({
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ForeignKey(() => Project)
  @Column({
    allowNull: false,
  })
  feed_id: number

  @Column({
    allowNull: false,
    type: DataType.ENUM('VIDEO', 'IMAGE'),
  })
  type: string

  @Field()
  @Column({
    allowNull: false
  })
  url: string
}