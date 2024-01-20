import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChefModule } from './chefs/chefs.module';
import { FoodiesModule } from './foodies/foodies.module';
import { OrdersModule } from './orders/orders.module';
import { DishesModule } from './dishes/dishes.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {redisStore} from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ChefModule,
    FoodiesModule,
    OrdersModule,
    DishesModule,
  ],
})
export class AppModule { }
