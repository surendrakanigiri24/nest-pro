import { IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(18)
    username: string

  @IsString()
  @MinLength(4)
  @MaxLength(18)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, { message: 'Password is too weak !!!' })
    password: string
}
