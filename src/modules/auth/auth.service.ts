import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from './dto/signId.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findByEmail(signInDto.email);
    const compare  = await bcrypt.compare(signInDto.password, user.password)
    if(!compare)  throw new UnauthorizedException('Invalid Password');
    
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const access = jwt.sign({ userId: user.id }, `${process.env.JWTACCESS}`, { expiresIn: '1h' });
    const refresh = jwt.sign({ userId: user.id }, `${process.env.JWTREFRESH}`, { expiresIn: '7d' });

    return { access, refresh };
  }

  async signUp(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);

    const access = jwt.sign({ userId: newUser.id }, `${process.env.JWTACCESS}`, { expiresIn: '1h' });
    const refresh = jwt.sign({ userId: newUser.id }, `${process.env.JWTREFRESH}`, { expiresIn: '7d' });

    return { newUser, access, refresh };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded:any = jwt.verify(refreshToken, `${process.env.JWTREFRESH}`);
      const userId = decoded.userId;

      const newAccessToken = jwt.sign({ userId }, `${process.env.JWTACCESS}`, { expiresIn: '1h' });
      const newRefreshToken = jwt.sign({ userId }, `${process.env.JWTREFRESH}`, { expiresIn: '7d' });
      return { access: newAccessToken, refresh: newRefreshToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}