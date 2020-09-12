import { ArgsType, Field } from 'type-graphql'
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

@ArgsType()
export class SignInArgs {
  @Field()
  emailOrUsername: string

  @Field()
  password: string
}
