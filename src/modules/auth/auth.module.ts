import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/database';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
