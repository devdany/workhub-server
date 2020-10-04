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

@ArgsType()
export class EditProfileArgs {
  @Field()
  token: string

  @Field({ nullable: true })
  profileImg?: string

  @Field({ nullable: true })
  lastName?: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  headLine?: string
}