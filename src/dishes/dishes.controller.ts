import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { Dish } from './dish.entity';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';

@Controller('dishes')
export class DishesController {


    constructor(private readonly dishesService: DishesService) { }


    //To get All Dishes
    @Get('/')
    async getDishes(@Req() req, @Query() paginationDto: PaginationDto): Promise<any> {
        const data = await this.dishesService.getDishes(paginationDto);
        const response = { data: data, message: 'Data fetched successfully', status: true }
        return response;
    }



    //To get Chef Dishes By Id
    @Get('/chef/:id')
    async getChefDishes(@Param('id') id: string, @Query() paginationDto: PaginationDto): Promise<any> {
        const data = await this.dishesService.getChefDishes(id, paginationDto);
        const response = { data: data, message: 'Data fetched successfully', status: true }
        return response;
    }

    //For Dish creation
    @Post('/create')
    @UseGuards(AuthGuard())
    async createDish(@Body() createDishDto: CreateDishDto, @Req() req): Promise<any> {
        const chefId = req.user.id;
        const data = await this.dishesService.createDish(createDishDto, chefId);
        const response = { data: data, message: 'Record created successfully', status: true }
        return response;

    }





}
