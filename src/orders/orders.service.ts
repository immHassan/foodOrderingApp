import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Order } from './order.entity';
import { OrderItems } from './orderItems.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foodie } from '../foodies/foodie.entity';

@Injectable()
export class OrdersService {


    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderItems) private readonly orderItemsRepository: Repository<OrderItems>,
        @InjectRepository(Foodie) private readonly foodieRepository: Repository<Foodie>
    ) { }

    async createOrder(createOrderDto: CreateOrderDto, foodieId: string): Promise<Order> {
        const order: Order = new Order();
        order.totalAmount = createOrderDto.totalAmount;
        order.deliveryAddress = createOrderDto.deliveryAddress;
        order.deliveryPhoneNumber = createOrderDto.deliveryPhoneNumber;

        const foodie = await this.foodieRepository.findOne({where:{ id: foodieId }});
        console.log("foodieId",foodieId);
        console.log("foodie",foodie);


        order.foodie = foodie;

        try {
            const orderInfo = await this.orderRepository.save(order);
            const orderItems = createOrderDto.items;

            const saveOperations = orderItems.map(async (item) => {
                const orderItem: OrderItems = new OrderItems();
                orderItem.amount = item.amount;
                orderItem.quantity = item.quantity;
                orderItem.totalAmount = item.totalAmount;
                orderItem.itemName = item.itemName;
                orderItem.order = orderInfo;
                // Using await inside an asynchronous function
                return await this.orderItemsRepository.save(orderItem);
            });

            await Promise.all(saveOperations);
            return orderInfo;
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async getOrders(paginationDto: PaginationDto): Promise<Order[]> {
        const { limit, offset } = paginationDto;
         const data = await this.orderRepository.find({
            relations: {
                orderItems: true,
            },
            skip: offset,
            take: limit ?? 5
        });

        console.log("data",data);
        
        return data;
    }

    async getFoodieOrders(id: string, paginationDto: PaginationDto): Promise<Order[]> {
        //const foodie = await this.foodieRepository.findOne({where:{ id }});
        const { limit, offset } = paginationDto;
        const data = await this.orderRepository.find({
        where: { foodie: {id:id }  },
            relations: {
                orderItems: true,
            },
            skip: offset,
            take: limit ?? 5
        });
        return data;
    }

    async getOrder(id: string): Promise<Order> {
        return await this.orderRepository.findOne({where:{ id }});
    }








}
