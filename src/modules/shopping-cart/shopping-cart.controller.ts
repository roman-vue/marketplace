import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Access } from 'src/guards/guards.guard';
@ApiTags('SHOPPING-CART')
@ApiBearerAuth()
@UseGuards(Access)

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Get()
  findAllProductsByUser(@Req() req) {
    const user:string = req.user.userId
    return this.shoppingCartService.findAllProductByUser(user);
  }

  @Post(':productId')
  addCart(@Param('productId') productId: string, @Req() req) {
    const user:string = req.user.userId
    return this.shoppingCartService.addProduct(productId, user);
  }

  @Delete(':productId')
  removeCart(@Param('productId') productId: string, @Req() req) {
    const user:string = req.user.userId
    return this.shoppingCartService.remove(productId, user);
  }
}
