import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'

import CommentLike from './CommentLike'
import Feed from './Feed'
import User from './User'

@Table({ freezeTableName: true, underscored: true, timestamps: false })
@ObjectType()
export default class Comment extends Model<Comment>{
  @Field()
  @Column({
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @ForeignKey(() => Feed)
  @Column({
    allowNull: false,
  })
  feed_id: number

  @Field(() => Feed)
  @BelongsTo(() => Feed)
  feed: Feed

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
    allowNull: false
  })
  text: string

  @Field(() => [CommentLike])
  @HasMany(() => CommentLike)
  likes: CommentLike[]

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