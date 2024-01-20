import { Module } from '@nestjs/common';
import { ChefsController } from './chefs.controller';
import { ChefsService } from './chefs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chef } from './chef.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/jwt.strategy';
import { Dish } from 'src/dishes/dish.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DishesService } from 'src/dishes/dishes.service';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your own secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
    TypeOrmModule.forFeature([Chef, Dish])],
  controllers: [ChefsController],
  providers: [ChefsService, DishesService, JwtStrategy]
})
export class ChefModule { }
