import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'

import ProjectContent from './ProjectContent'
import ProjectMember from './ProjectMember'
import Tag from './Tag'
import User from './User'

@Table({ freezeTableName: true, underscored: true, timestamps: false })
@ObjectType()
export default class Project extends Model<Project>{
  @Field()
  @Column({
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  user_id: number

  @Field(() => User)
  @BelongsTo(() => User)
  owner: User

  @Field(() => [User])
  @BelongsToMany(() => User, () => ProjectMember)
  members: User[]

  @Field()
  @Column({
    allowNull: false
  })
  title: string

  @Field()
  @Column({
    allowNull: true
  })
  url?: string

  @Field()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string

  @Field(() => [ProjectContent])
  @HasMany(() => ProjectContent)
  contents: ProjectContent[]

  @Field()
  @Column({
    allowNull: true
  })
  thumbnail_id?: number

  @Field()
  @Column({
    allowNull: false
  })
  createdAt: string

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[]

  @Field({
    nullable: true
  })
  @Column({
    allowNull: true
  })
  updatedAt?: string

  @Column({
    allowNull: true
  })
  deletedAt?: string

  @Column({
    allowNull: false
  })
  isDelete: boolean
}