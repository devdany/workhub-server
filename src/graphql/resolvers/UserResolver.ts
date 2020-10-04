import { Query, Mutation, Resolver, Args, Arg} from 'type-graphql'
import { encryptPassword, confirmPassword } from '@utils/encrypt'
import { generateJwtToken, confirmJwtToken } from '@utils/token'
import userService, { EditedProfile } from '@service/userService'
import User from '@models/User'
import { UserArgs, SignUpArgs, SignInArgs, EditProfileArgs } from '@src/graphql/types/args'
import { LoginUser } from '@src/graphql/types/res'
import { uploadProfileImage } from '@aws/s3'
import emailCertificationService from '@redis/service/emailCertificationService'
import { certificatiomEmailSender } from '@utils/emailUtils'
import { generateRandomString } from '@utils/stringUtils'

@Resolver()
export default class UserResolver {
  @Query(() => User)
  async getUser(@Args() args: UserArgs){
    const { userId } = args
    const user = await userService.findUser(userId)
    return user
  }

  @Mutation(() => LoginUser)
  async signUp(@Args() args: SignUpArgs): Promise<LoginUser> {
    const { email, username, password } = args
    const usedEmail = await userService.findByEmail(email)
    if (usedEmail) {
      throw new Error('This email is already in use.')
    }

    const usedUsername = await userService.findByUsername(username)
    if (usedUsername) {
      throw new Error('This username is already in use')
    }

    const encryptedPassword = await encryptPassword(password)
    const createdUser = await userService.createUser(email, encryptedPassword, username)
    const token = generateJwtToken(createdUser.id)
    return {
      user: createdUser,
      token: token
    }
  }

  @Mutation(() => LoginUser)
  async confirmToken(@Arg('token') token: string): Promise<LoginUser> {
    try {
      const { id } = confirmJwtToken(token)
      const user = await userService.findUser(id)
      const updatedToken = generateJwtToken(user.id)
      return {
        user: user,
        token: updatedToken,
      }
    } catch (err) {
      throw Error()
    }
  }

  @Mutation(() => LoginUser)
  async signIn(@Args() args: SignInArgs): Promise<LoginUser> {
    const { emailOrUsername, password } = args
    const user = await userService.findByEmailOrUsername(emailOrUsername)
    if (!user) {
      throw Error('User does not exist.')
    }

    const isMatchPassword = await confirmPassword(user.password, password)

    if (!isMatchPassword) {
      throw Error('Password is not correct.')
    }
    await userService.updateLastLogin(user.id)
    const token = generateJwtToken(user.id)
    
    return {
      user: user,
      token: token
    }
  }

  @Mutation(() => Boolean)
  async sendCertificationMail(@Arg('email') email: string): Promise<boolean> {
    try {
      const code = generateRandomString(7)
      await emailCertificationService.setCertificationCode(email, code)
      await certificatiomEmailSender(email, code)
      return true
    } catch (err) {
      console.log(err)
      throw new Error('Send email fail')
    }
  }

  @Mutation(() => Boolean)
  async confirmCertificationCode(@Arg('email') email: string, @Arg('code') code: string, @Arg('token') token: string): Promise<boolean> {
    try {
      const result = await emailCertificationService.confirmCertificationCode(email, code)
      if (result) {
        const { id } = confirmJwtToken(token)
        await userService.editProfile(id, { isCertificated: true })
        await emailCertificationService.deleteCertificationCode(email)
      }
      return result
    } catch (err) {
      throw new Error('Certificate fail')
    }
  }

  @Mutation(() => User)
  async editProfile(@Args() args: EditProfileArgs): Promise<User> {
    // Sage profile image to s3
    const { token, profileImg, lastName, firstName, headLine } = args
    const { id } = confirmJwtToken(token)
    let profileUrl: string | null = null
    if (profileImg && !profileImg.startsWith('https://')) {
      profileUrl = await uploadProfileImage(profileImg, 'profileImg_' + id)
    }

    const updatedProfile: EditedProfile = {
      lastName,
      firstName,
      headLine,
    }

    if (profileUrl) {
      updatedProfile.profileImg = profileUrl
    }
    await userService.editProfile(id, updatedProfile)
    
    const updatedUser = await userService.findUser(id)

    return updatedUser
  }
}
