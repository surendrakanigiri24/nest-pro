import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './auth.repository'
import { User } from './auth.entity'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'iamTheTopSecret',
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([User, UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
