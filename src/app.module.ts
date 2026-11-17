import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ProductsModule } from './products/products.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { CategoriesModule } from './categories/categories.module.js';


export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [ProductsModule, OrdersModule, CategoriesModule],
  controllers:[],
  providers:[],
 
})
export class AppModule {}
