import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/database';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Categories) private readonly categoriesRepo:Repository<Categories>){}
  async create({name}: CreateCategoryDto) {
    const newCategory = await this.categoriesRepo.save({name})
    return newCategory
  }

  async findAll() {
    const find = await this.categoriesRepo.find()
    return find
  }

  async findOne(id: string) {
    const find = await this.categoriesRepo.findOne({where:{id}})
      if(!find) throw new NotFoundException(`category not found`)
    return find
  }

  async update(id: string, {name}: UpdateCategoryDto) {
    const verify= await this.findOne(id)
    verify.name = name
    const updated = await this.categoriesRepo.save(verify)
    return updated
  }

  async remove(id: string) {
    const verify= await this.findOne(id)
    const remove = await this.categoriesRepo.remove(verify)
    return 'deleted'
  }
}
