import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { FoodiesService } from './foodies.service';
import { CreateFoodieDto } from './dto/create-foodie.dto';
import { Foodie } from './foodie.entity';
import { LoginFoodieDto } from './dto/login-foodie.dto';
import { DishesService } from 'src/dishes/dishes.service';
import { AuthGuard } from '@nestjs/passport';
import { Dish } from 'src/dishes/dish.entity';
import { PaginationDto } from 'src/dishes/dto/pagination.dto';
import { OrdersService } from 'src/orders/orders.service';
import { Order } from 'src/orders/order.entity';



@Controller('foodie')
export class FoodiesController {
    constructor(private readonly foodiesService: FoodiesService, private readonly ordersService: OrdersService) { }

    //Chef account creation API
    @Post('/signup')
    async createChef(@Body() createFoodieDto: CreateFoodieDto): Promise<any> {
        const { accessToken } = await this.foodiesService.createFoodie(createFoodieDto);
        const response = { accessToken, message: 'Your account has been created successfully', status: true };
        return response;
    }

    
    //Chef login API
    @Post('/signin')
    async signIn(@Body() loginFoodieDto: LoginFoodieDto): Promise<any> {
        const { accessToken } = await this.foodiesService.signIn(loginFoodieDto);
        const response = { accessToken, message: 'Signin successfully', status: true };
        return response;
    }


    //Foodie Orders fetch API.
    @UseGuards(AuthGuard())
    @Get('/orders')
    async getChefDishes(@Req() req, @Query() paginationDto: PaginationDto): Promise<any> {
        const foodieId = req.user.id
        const data = await this.ordersService.getFoodieOrders(foodieId, paginationDto);
        const response = { data, message: 'Data fetched successfully', status: true };
        return response;
    }


}





