import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'

import Project from './Project'
import ProjectMember from './ProjectMember'

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

  @Field({
    nullable: true
  })
  @Column({
    allowNull: true
  })
  lastName: string

  @Field({
    nullable: true
  })
  @Column({
    allowNull: true
  })
  firstName: string

  @Field({
    nullable: true
  })
  @Column({
    allowNull: true
  })
  headLine: string

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
  updatedAt: string

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

  @Field(() => [Project], { nullable: true })
  @BelongsToMany(() => Project, () => ProjectMember)
  projects: Project[]

  @Field()
  @Column({
    allowNull: false
  })
  isCertificated: boolean
}