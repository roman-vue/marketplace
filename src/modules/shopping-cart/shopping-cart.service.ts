import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Products, ShoopingCart, Users } from 'src/database';
import { Repository } from 'typeorm';
import { find } from 'rxjs';

@Injectable()
export class ShoppingCartService {
  constructor(@InjectRepository(Users) private readonly usersRepo:Repository<Users>,
  @InjectRepository(Products) private readonly productsRepo:Repository<Products>,
  @InjectRepository(ShoopingCart) private readonly shoopingcCartRepo:Repository<ShoopingCart>){}
  
  async addProduct(productId:string, user:string) {
    const v_user = await this.usersRepo.findOne({where:{id: user}})
    if(!v_user){
      throw new NotFoundException(`user not found`)
    }
    const verifyProduct = await this.productsRepo.findOne({where:{id:productId}})
    if(!verifyProduct){
      throw new ConflictException(`product not found`)
    }
    const add = await this.shoopingcCartRepo.save({product:verifyProduct,user:v_user })
    return `product ${verifyProduct.name} successfully added`
  }

  async findAllProductByUser(user:string) {
    const v_user = await this.usersRepo.findOne({where:{id: user}})
    if(!v_user){
      throw new NotFoundException(`user not found`)
    }
    const find = await this.shoopingcCartRepo.find({where:{user:v_user}, relations:['product']})
    let total = 0
    find.map(ele=> total += ele.product.price)
    return {cart: find, total }
  }

  async remove(productId: string, user:string) {
    const v_user = await this.usersRepo.findOne({where:{id: user}})
    if(!v_user){
      throw new NotFoundException(`user not found`)
    }
    const verifyProduct = await this.productsRepo.findOne({where:{id:productId}})
    if(!verifyProduct){
      throw new ConflictException(`product not found`)
    }

    const findProductInCart = await this.shoopingcCartRepo.findOne({where: {product: verifyProduct, user: v_user}})
     if(!findProductInCart){
      throw new ConflictException(`error verify product`)
     }
    await this.shoopingcCartRepo.remove(findProductInCart)
    return 
  }
}
