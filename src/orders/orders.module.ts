import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE, PRODUCT_SERVICE } from '../config/service.js';
import { envs } from '../config/envs.js';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: ORDER_SERVICE, transport: Transport.TCP, options: {
            host: envs.ordersMicroserviceHost,
            port: envs.ordersMicroservicePort,
          }
        },
      ]),
    ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
