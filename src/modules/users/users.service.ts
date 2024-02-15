import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly usersRepo: Repository<Users>){}
  async create({email, name, password}: CreateUserDto) {
    try{
      password = await bcrypt.hash(password, 10)
    const newUser = await this.usersRepo.save({email, name, password, status:true})
    return newUser
    }catch(err){
        if(err.code == '23505'){
          throw new InternalServerErrorException(`this user alredy exist ${email}`)
        }
        throw new InternalServerErrorException(err)
    }
    
  }

  async findOne(id: string) {
    const find = await this.usersRepo.findOne({where:{id, status: true}})
     if(!find) throw new NotFoundException(`user not found`)
    return {email: find.email, name:find.name, status: find.status}
  }

  async findByEmail(email:string){
    const find = await this.usersRepo.findOne({where:{email, status:true}})
     if(!find) throw new NotFoundException(`user not fount`)
    return find
  }

 async update(id: string, {email, name}: UpdateUserDto) {
    const verifyUser = await this.findOne(id)
    verifyUser.email = email
    verifyUser.name = name
    const updated = await this.usersRepo.save(verifyUser)
    return {email: updated.email, name: updated.name}
  }

 async disable(id: string) {
    const verifyUser = await this.findOne(id)
     verifyUser.status = false
    const disable = await this.usersRepo.save(verifyUser)
    return `user disable ${verifyUser.email}`
  }
}
