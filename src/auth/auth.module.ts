import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserRepository } from './auth.repository'
import { User } from './auth.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
