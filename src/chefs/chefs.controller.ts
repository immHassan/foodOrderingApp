import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ChefsService } from './chefs.service';
import { CreateChefDto } from './dto/create-chef.dto';
import { LoginChefDto } from './dto/login-chef.dto';
import { DishesService } from '../dishes/dishes.service';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from '../dishes/dto/pagination.dto';



@Controller('chef')
export class ChefsController {
    constructor(private readonly chefService: ChefsService, private readonly dishesService: DishesService) { }

    //Chef account creation API
    @Post('/signup')
    async createChef(@Body() createChefDto: CreateChefDto): Promise<any> {
        const { accessToken } = await this.chefService.createChef(createChefDto);
        const response = { accessToken, message: 'Your account has been created successfully', status: true };
        return response;
    }

    //Chef login API
    @Post('/signin')
    async signIn(@Body() loginChefDto: LoginChefDto): Promise<any> {
        const { accessToken } = await this.chefService.signIn(loginChefDto);
        const response = { accessToken, message: 'Signin successfully', status: true };
        return response;
    }


    //Get chef own dishes.
    @UseGuards(AuthGuard())
    @Get('/dishes')
    async getChefDishes(@Req() req, @Query() paginationDto: PaginationDto): Promise<any> {
        const chefId = req.user.id
        const data = await this.dishesService.getChefDishes(chefId, paginationDto);
        const response = { data, message: 'Signin successfully', status: true };
        return response;

    }




}





