import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common'
import { AuthCredentialsDto } from './dto/auth-credentails.dto'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'

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

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req){
    console.log(req)
  }
}
