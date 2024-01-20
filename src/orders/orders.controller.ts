import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from './dto/pagination.dto';

@Controller('orders')
export class OrdersController {


    constructor(private readonly ordersService: OrdersService) { }

    //Dish creation API
    @Post('/create')
    @UseGuards(AuthGuard())
    async createDish(@Body() createOrderDto: CreateOrderDto, @Req() req): Promise<any> {
        const chefId = req.user.id;
        const data = await this.ordersService.createOrder(createOrderDto, chefId);
        const response = { data: data, message: 'Your order has been created successfully', status: true }
        return response;
    }


    
    //To get All Dishes
    @Get('/')
    async getOrders(@Query() paginationDto: PaginationDto): Promise<any> {
        const data = await this.ordersService.getOrders(paginationDto);
        const response = { data: data, message: 'Data fetched successfully', status: true }
        return response;
    }

    
    //To get Dish Data
    @Get('/:id')
    async getOrder(@Param('id') id: string): Promise<any> {
        const data = await this.ordersService.getOrder(id);
        const response = { data: data, message: 'Data fetched successfully', status: true }
        return response;
    }






}
