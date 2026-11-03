import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';


@Controller('products')
export class ProductsController {
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto){
  return this.productsClient.send({cmd: 'createProduct'}, createProductDto).pipe(
    catchError((err) => {
      throw new RpcException(err);
    }),
  );

  }

  @Get()
    findAll(@Query() paginationDto:PaginationDto) {
   
    return this.productsClient.send({ cmd: 'findallProduct' }, paginationDto);
  }

  @Get(':id')
   findOne(@Param('id') id: string) {
  return this.productsClient.send({cmd: 'findOneProduct'}, {id}).pipe(
    catchError((err) => {
      throw new RpcException(err);
    }),
  );
  

 /*try {
        const product = await firstValueFrom(this.productsClient.send({ cmd: 'findOneProduct' }, {id}));
    
        return product;
    } catch (error) {
      throw new RpcException(error);
    }
      */

  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, 
  @Body()UpdateProductDto: UpdateProductDto) {
    return this.productsClient.send({cmd: 'updateProduct'}, {id, ...UpdateProductDto}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.productsClient.send({cmd: 'deleteProduct'}, {id}).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}

