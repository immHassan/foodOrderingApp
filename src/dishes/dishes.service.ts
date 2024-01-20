import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { PaginationDto } from './dto/pagination.dto';

import { Dish } from './dish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chef } from 'src/chefs/chef.entity';

@Injectable()
export class DishesService {


    constructor(
        @InjectRepository(Dish) private readonly dishRepository: Repository<Dish>,
        @InjectRepository(Chef) private readonly chefRepository: Repository<Chef>
    ) { }

    async createDish(createDishDto: CreateDishDto, chefId: string): Promise<Dish> {
        const dish: Dish = new Dish();
        dish.name = createDishDto.name;
        dish.description = createDishDto.description;
        dish.price = createDishDto.price;
        dish.image = createDishDto.image;

        
        const chef = await this.chefRepository.findOneBy({ id: chefId });
        dish.chef = chef;
        try {
            const resp = await this.dishRepository.save(dish);
             delete resp['chef'];
            return resp;
        } catch (error) {
            console.log("error", error);
            throw new InternalServerErrorException();
        }
    }

    async getDishes(paginationDto: PaginationDto): Promise<Dish[]> {
        const { limit, offset } = paginationDto;
        return await this.dishRepository.find({
            skip: offset,
            take: limit ?? 5
        });
    }

    async getChefDishes(id: string, paginationDto: PaginationDto): Promise<Dish[]> {
        
        //const chef = await this.chefRepository.findOne({where:{ id }});
        const { limit, offset } = paginationDto;
        const  data = await this.dishRepository.find({
            where: {chef:{
                id:id
            }},
            skip: offset,
            take: limit ?? 5
        });
        return data;
    }


}
