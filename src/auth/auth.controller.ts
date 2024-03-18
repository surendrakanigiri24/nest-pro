import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthCredentialsDto } from './dto/auth-credentails.dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  @Post('/signup')
  async signUp (@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.authService.signUp(authCredentialsDto)
  }

  @Post('/signin')
  async signIn (@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string } | null> {
    return await this.authService.signIn(authCredentialsDto)
  }
}
