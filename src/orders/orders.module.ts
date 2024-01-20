import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrdersService } from '../orders/orders.service';
import { Order } from '../orders/order.entity';
import { OrderItems } from '../orders/orderItems.entity';
import { FoodiesService } from '../foodies/foodies.service';
import { Foodie } from '../foodies/foodie.entity';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([Foodie,OrderItems, Order])],
  controllers: [OrdersController],
  providers: [FoodiesService, OrdersService, JwtStrategy]
})
export class OrdersModule { }
