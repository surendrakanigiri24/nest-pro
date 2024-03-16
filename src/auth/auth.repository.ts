import { Repository } from 'typeorm'
import { type User } from './auth.entity'
// import { type AuthCredentialsDto } from './dto/auth-credentails.dto'

export class UserRepository extends Repository<User> {

  // Custom methods

  // async signUp (authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   const { username, password } = authCredentialsDto

  //   const user = new User()
  //   user.username = username
  //   user.password = password
  //   await user.save()
  // }
}
