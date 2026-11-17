import { Controller, Get, Post, Body, Param, Inject, Query, ParseUUIDPipe, UseFilters, Patch, ParseIntPipe, Delete,  } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

import { CATEGORY_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CategoryPaginationDto } from './dto/category-pagination.js';
import { firstValueFrom } from 'rxjs';
import { PaginationDto, RpcCustomExceptionFilter } from '../common/index.js';

@Controller('categories')
@UseFilters(RpcCustomExceptionFilter)
export class CategoriesController {
  constructor(@Inject(CATEGORY_SERVICE) private readonly categoriesClient: ClientProxy) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesClient.send({cmd:'createCategory'}, createCategoryDto);
  }

  @Get()
  async findAll(@Query() categoryPaginationDto: CategoryPaginationDto) {
    try {
      return await firstValueFrom(
        this.categoriesClient.send({ cmd: 'findallCategory' }, categoryPaginationDto)
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const category = await firstValueFrom(
        this.categoriesClient.send({ cmd: 'findOneCategory' }, { id })
      );
      return category;
    } catch (error) {
      throw new RpcException(error as object);
    }
  }


 @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await firstValueFrom(
        this.categoriesClient.send(
          { cmd: 'updateCategory' },
          { id, ...updateCategoryDto },
        ),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom(
        this.categoriesClient.send({ cmd: 'deleteCategory' }, { id }),
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }


  }
  //recibir parametro y body y mandarlo al changeorderstatus
  //@Patch()


