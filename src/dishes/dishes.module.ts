import { Module } from '@nestjs/common';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { Dish } from './dish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chef } from '../chefs/chef.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt.strategy';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'yourSecretKey', // Replace with your own secret key
    signOptions: { expiresIn: '1h' }, // Token expiration time
  }),TypeOrmModule.forFeature([Dish, Chef])],
  controllers: [DishesController],
  providers: [DishesService,JwtStrategy],
})

export class DishesModule {}
