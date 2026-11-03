import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [ProductsModule, OrdersModule],
  controllers:[],
  providers:[],
 
})
export class AppModule {}
