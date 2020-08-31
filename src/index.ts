import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'
import { getSchema } from '@src/graphql/schema'
import sequelize from '@src/sequelize'

sequelize.authenticate()
  .then(() => {
    console.log('db Connection success!')
  })
  .catch((err: any) => {
    if (err) throw err
  })
sequelize.sync({ force: false })

getSchema()
  .then(schema => {
    const server = new ApolloServer({
      schema
    })
    
    server.listen()
      .then((serverInfo) => {
        const { url } = serverInfo
        console.log(`Server ready at ${url}`)
      })
  })
