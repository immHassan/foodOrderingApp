import { Module } from '@nestjs/common';
import { FoodiesController } from './foodies.controller';
import { FoodiesService } from './foodies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foodie } from './foodie.entity';
import { JwtStrategy } from 'src/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/order.entity';
import { OrderItems } from 'src/orders/orderItems.entity';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([Foodie, Order,OrderItems])],
  controllers: [FoodiesController],
  providers: [FoodiesService, OrdersService, JwtStrategy]
})
export class FoodiesModule { }
