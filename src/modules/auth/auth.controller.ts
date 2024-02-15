import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signId.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @ApiOperation({summary: 'login marketplace'})
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signUp')
  @ApiOperation({summary: 'register  user'})
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Patch('refresh-token/:token')
  @ApiOperation({summary: 'generated new access and refresh token '})
  refresh(@Param('token') token:string){
    return this.authService.refreshToken(token)
  }
}
