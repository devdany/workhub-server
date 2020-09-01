import UserResolver from '@resolvers/UserResolver'
import { buildSchema } from 'type-graphql'
import { validate } from 'graphql'

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
  })
  return schema
}

