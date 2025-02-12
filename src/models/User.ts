import { Column, Model, Table } from 'sequelize-typescript'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@Table({ freezeTableName: true, underscored: true, timestamps: false })
@ObjectType()
export default class User extends Model<User>{
  @Field()
  @Column({
    autoIncrement: true,
    primaryKey: true
  })
  id: number

  @Field()
  @Column({
    allowNull: false
  })
  email: string

  @Column({
    allowNull: false
  })
  password: string

  @Field()
  @Column({
    allowNull: false
  })
  username: string

  @Field({
    nullable: true
  })
  @Column({
    allowNull: true
  })
  profileImg: string

  @Field()
  @Column({
    allowNull: false
  })
  createdAt: string

  @Field()
  @Column({
    allowNull: false
  })
  lastLogin: string

  @Field()
  @Column({
    allowNull: false
  })
  isInitalize: boolean
}