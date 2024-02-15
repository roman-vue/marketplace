import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class Access implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token:string = request.headers.authorization; 
    console.log('token', token.split(' ')[1])
    if (!token) {
      return false;
    }

    try {
      const decoded:any = jwt.verify(token.split(' ')[1], `${process.env.JWTACCESS}`);

      request.user = { userId: decoded.userId };
      Logger.log(`LOGIN`, `SUCCESS`)
      return true;
    } catch (error) {
      console.log('error', error)
      return false;
    }
  }
}
