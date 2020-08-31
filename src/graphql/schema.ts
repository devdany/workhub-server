import UserResolver from '@resolvers/UserResolver'
import { buildSchema } from 'type-graphql'

export const getSchema = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  return schema
}

