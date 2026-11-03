import { Controller, Get, Post, Body, Param, Inject, Query, ParseUUIDPipe, UseFilters,  } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { ORDER_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto/order-pagination.js';
import { firstValueFrom } from 'rxjs';
import { RpcCustomExceptionFilter } from '../common/index.js';

@Controller('orders')
@UseFilters(RpcCustomExceptionFilter)
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      return await firstValueFrom(
        this.ordersClient.send({ cmd: 'findAllOrders' }, orderPaginationDto)
      );
    } catch (error) {
      throw new RpcException(error as object);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send({ cmd: 'findOneOrder' }, { id })
      );
      return order;
    } catch (error) {
      throw new RpcException(error as object);
    }
  }


}
