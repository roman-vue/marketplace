import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories, CategoriesProducts, Products, Users } from 'src/database';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([Users, Products, Categories, CategoriesProducts]), UsersModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
