import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/order.entity';
import { OrderItems } from 'src/orders/orderItems.entity';
import { FoodiesService } from 'src/foodies/foodies.service';
import { Foodie } from 'src/foodies/foodie.entity';


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
