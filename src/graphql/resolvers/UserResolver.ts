import { Query, Mutation, Resolver, ArgsType, Args, Field, ObjectType } from 'type-graphql'
import { encryptPassword } from '@utils/encrypt'
import { generateJwtToken } from '@utils/token'
import userService from '@service/userService'
import User from '@models/User'

@ArgsType()
export class UserArgs {
  @Field()
  userId: number
}

@ArgsType()
export class SignUpArgs {
  @Field()
  email: string

  @Field()
  username: string

  @Field()
  password: string
}

@ObjectType()
export class SignUpRes {
  @Field()
  user: User

  @Field()
  token: string
}

@Resolver()
export default class UserResolver {
  @Query(() => User)
  async getUser(@Args() args: UserArgs){
    const { userId } = args
    const user = await userService.findUser(userId)
    return user
  }

  @Mutation(() => SignUpRes)
  async signUp(@Args() args: SignUpArgs) {
    const { email, username, password } = args
    try {
      const encryptedPassword = await encryptPassword(password)
      const createdUser = await userService.createUser(email, encryptedPassword, username)
      const token = generateJwtToken(createdUser.id)
      return {
        user: createdUser,
        token: token
      }
    } catch (err) {
      throw Error()
    }
  }
}
