import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'

import Feed from './Feed'
import User from './User'

@Table({ freezeTableName: true, underscored: true, timestamps: false })
@ObjectType()
export default class FeedLike extends Model<FeedLike>{
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

  @Column({
    allowNull: false
  })
  isDelete: boolean
}