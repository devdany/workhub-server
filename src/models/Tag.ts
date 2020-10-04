import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Field, ObjectType } from 'type-graphql'

@Table({ freezeTableName: true, underscored: true, timestamps: false })
@ObjectType()
export default class ProjectMember extends Model<ProjectMember>{
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
  tag: string
}