import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'

import Comment from './Comment'
import FeedContent from './FeedContent'
import FeedLike from './FeedLike'
import User from './User'

@Table({ freezeTableName: true, underscored: true, timestamps: false })
@ObjectType()
export default class Feed extends Model<Feed>{
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
  user: User

  @Field()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text: string

  @Field()
  @Column({
    allowNull: false,
    type: DataType.ENUM('QUESTION', 'WORK', 'COMMON', 'STUDY', 'RECRUTMENT', 'TEAM'),
  })
  category: string

  @Field(() => [FeedContent])
  @HasMany(() => FeedContent)
  contents: FeedContent[]

  @Field(() => [FeedLike])
  @HasMany(() => FeedLike)
  likes: FeedLike[]

  @Field(() => [Comment])
  @HasMany(() => Comment)
  comments: Comment[]

  @Field()
  @Column({
    allowNull: false
  })
  createdAt: string

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