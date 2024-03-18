import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from 'jsonwebtoken'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './auth.repository'
import { User } from './auth.entity'
import { CONFIG } from '../config/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: CONFIG.JWT_SECRET
    })
  }

  async validate(payload: JwtPayload): Promise<User | null>{
    const { username } = payload;
    const user = await this.userRepository.findOne({ where: {username}})

    if(user === undefined){
      throw new UnauthorizedException()
    }

    return user;
  }
}
