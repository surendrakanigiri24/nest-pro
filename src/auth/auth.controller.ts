import { Body, Controller, Post } from '@nestjs/common'
import { AuthCredentialsDto } from './dto/auth-credentails.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  @Post('/signup')
  async signUp (@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.authService.signUp(authCredentialsDto)
  }
}
