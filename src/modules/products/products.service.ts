import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories, CategoriesProducts, Products, Users } from 'src/database';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
   constructor(@InjectRepository(Products) private readonly productRepo:Repository<Products>,
   @InjectRepository(Categories) private readonly categoryRepo:Repository<Categories>,
   @InjectRepository(CategoriesProducts) private readonly categpriesProductsRepo:Repository<CategoriesProducts>,
   @InjectRepository(Users) private readonly userRepo:Repository<Users> ,
   private readonly userService:UsersService){}

  async create({name,categories,description,price,stock}: CreateProductDto, userId: string) {
      const v_user= await this.userRepo.findOne({where:{id: userId}})
      const promises = categories.map(async ele => {
        const category = await this.categoryRepo.findOne({where:{id:ele.cotegoryId}});
        if (!category) {
          throw new NotFoundException(`Category with ID ${ele.cotegoryId} not found`);
        }
        return category;
      });
       const checkCategoriesId = await Promise.all(promises)
      const saveProduct = await this.productRepo.save({name, description, price, stock, user: v_user})
      const associations = checkCategoriesId.map(category => {
        return this.categpriesProductsRepo.save({ product: saveProduct, categorie:category });
      });
  
      await Promise.all(associations);
      const productWithCategories = await this.productRepo.findOne({where: {id: saveProduct.id}, relations: ['categories.categorie'] });

      return productWithCategories;
  } 

 async findAllByUser(userId: string) {
    const v_user= await this.userService.findOne(userId)
    const find = await this.productRepo.find({where:{user:v_user}, relations:['categories.categorie']})
    return find
  }

  async findAll(){
    const find = await this.productRepo.find({relations:['categories.categorie']})
    return find
  }

  async findOne(id: string, userId?: string) {
    const find = await this.productRepo.findOne({where: {id}, relations:['categories.categorie']})
    if(!find) throw new NotFoundException(`product not found`)
    return find
  }

  async update(id: string, updateProductDto: UpdateProductDto, userId: string) {
    const verify = await this.findOne(id, userId);
    const promises = updateProductDto.categories.map(async ele => {
        const category = await this.categoryRepo.findOne({ where: { id: ele.cotegoryId } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${ele.cotegoryId} not found`);
        }
        return category;
    });
    const checkCategoriesId = await Promise.all(promises);

    verify.description = updateProductDto.description;
    verify.name = updateProductDto.name;
    verify.price = updateProductDto.price;
    verify.stock = updateProductDto.stock;

    const updatedProduct = await this.productRepo.save(verify);

    await this.updateProductCategoryRelations(updatedProduct, checkCategoriesId);

    const productWithCategories = await this.productRepo.findOne({ where: { id: updatedProduct.id }, relations: ['categories.categorie'] });
    return productWithCategories;
}

  async remove(id: string, userId: string) {
     const verify = await this.findOne(id, userId)
     const categories = await this.categpriesProductsRepo.find({where:{product: verify}})
     const promise = await categories.forEach( async ele=> {
       await this.categpriesProductsRepo.remove(ele)
     })
     await this.productRepo.remove(verify)
     return 'deleted'
  }

  private async updateProductCategoryRelations(productId: Products, categories: Categories[]) {
    await this.categpriesProductsRepo.delete({ product: productId });
    
    // Crear nuevas relaciones para las categorías seleccionadas
    const productCategoryPromises = categories.map(async category => {
        return await this.categpriesProductsRepo.save({product: productId, categorie:category});
    });
    await Promise.all(productCategoryPromises);
}

}
