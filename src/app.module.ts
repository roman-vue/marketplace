import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ProductsModule } from './modules/products/products.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({envFilePath: '.env', isGlobal:true }), DatabaseModule, AuthModule, ProfilesModule, ProductsModule, ShoppingCartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
