import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products/products.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { Product } from './entities/product';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client';
import { Order } from './entities/order';
import { ClientsController } from './controllers/clients/clients.controller';
import { OrderProduct } from './entities/orderProduct';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 8889,
      username: "root",
      password: "root",
      //synchronize: true,
      database: "stockManager",
      entities: [Product, Client, Order, OrderProduct]
    }),
    TypeOrmModule.forFeature([Product, Order, Client, OrderProduct])
  ],
  controllers: [ProductsController, OrdersController, ClientsController],
  providers: [],
})
export class AppModule {}
