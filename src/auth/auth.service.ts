import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { JwtService } from '@nestjs/jwt'
import { type AuthCredentialsDto } from './dto/auth-credentails.dto'
import { User } from './auth.entity'
import { UserRepository } from './auth.repository'
import * as bcrypt from 'bcrypt'
import { type JwtPayload } from './jwt-payload'

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async signUp (authControllerDto: AuthCredentialsDto): Promise<void> {
    // await this.userRepository.signUp(authControllerDto)
    const { username, password } = authControllerDto

    const user = new User()
    user.username = username
    user.salt = await bcrypt.genSalt()
    user.password = await this.passwordHash(password, user.salt)

    try {
      await user.save()
    } catch (error) {
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Username already exists !!!')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async signIn (authControllerDto: AuthCredentialsDto): Promise<{ accessToken: string } | null> {
    const { username, password } = authControllerDto

    const user = await this.userRepository.findOne({ where: { username } })

    if (user === null || user === undefined) {
      throw new UnauthorizedException('Invalid credentails')
    }
    if (await user.validatePassword(password)) {
      const username = user.username
      const payLoad: JwtPayload = { username }
      const accessToken = this.jwtService.sign(payLoad)
      return { accessToken }
    } else {
      return null
    }
  }

  async passwordHash (password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
