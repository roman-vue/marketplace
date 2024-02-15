import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Access } from 'src/guards/guards.guard';
@ApiBearerAuth()
@UseGuards(Access)
@ApiTags('CATEGORIES')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiOperation({summary:'created categery'})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({summary: 'list of category'})
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'detail of category'})
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'updated category'})
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'deleted category'})
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
