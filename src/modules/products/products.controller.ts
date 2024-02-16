import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Access } from 'src/guards/guards.guard';
@ApiTags('PRODUCTS')
@ApiBearerAuth()
@UseGuards(Access)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @ApiOperation({summary: 'create product'})
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto, @Req() req) {
    const user: string = req.user.userId;
    const data = await this.productsService.create(createProductDto, user);
    return data;
  }

  @Get('my-products')
  @ApiOperation({summary: 'list of the products by user in session'})
  findAllByUser(@Req() req) {
    const user = req.user.userId
    return this.productsService.findAllByUser(user);
  }

  @Get('list-of-product')
  @ApiOperation({summary: 'list of produts'})
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'details product'})
  findOne(@Param('id') id: string, @Req() req) {
    const user = req.user.userId
    return this.productsService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({summary: 'updated product'})
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @Req() req) {
    const user = req.user.userId 
    return this.productsService.update(id, updateProductDto, user);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete product'})
  remove(@Param('id') id: string, @Req() req) {
    const user = req.user.userId 
    return this.productsService.remove(id, user);
  }
}
