import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [ ConfigModule.forRoot({envFilePath: '.env', isGlobal:true }), DatabaseModule, AuthModule, ProductsModule, ShoppingCartModule, UsersModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
