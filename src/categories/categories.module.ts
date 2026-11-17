import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CATEGORY_SERVICE, ORDER_SERVICE, PRODUCT_SERVICE } from '../config/service.js';
import { envs } from '../config/envs.js';

@Module({
    imports: [
      ClientsModule.register([
        {
          name: CATEGORY_SERVICE, transport: Transport.TCP, options: {
            host: envs.categoryMicroserviceHost,
            port: envs.categoryMicroservicePort,
          }
        },
      ]),
    ],
  controllers: [CategoriesController],
  providers: [],
})
export class CategoriesModule {}
