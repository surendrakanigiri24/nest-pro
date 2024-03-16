import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { type AuthCredentialsDto } from './dto/auth-credentails.dto'
import { User } from './auth.entity'
import { UserRepository } from './auth.repository'

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: UserRepository
  ) {}

  async signUp (authControllerDto: AuthCredentialsDto): Promise<void> {
    // await this.userRepository.signUp(authControllerDto)
    const { username, password } = authControllerDto

    const user = new User()
    user.username = username
    user.password = password
    await user.save()
  }
}
