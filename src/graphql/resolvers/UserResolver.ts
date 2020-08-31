import { Query, Resolver, ArgsType, Args, Field } from 'type-graphql'
import userService from '@service/userService'
import User from '@models/User'
@ArgsType()
class UserArgs {
  @Field()
  userId: number
}

@Resolver()
export default class UserResolver {
  @Query(() => User)
  async getUser(@Args() args: UserArgs){
    const { userId } = args
    const user = await userService.findUser(userId)
    return user
  }
}