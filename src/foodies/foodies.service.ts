import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException, ValidationError } from '@nestjs/common';
import { CreateFoodieDto } from './dto/create-foodie.dto';
import { Foodie } from './foodie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginFoodieDto } from './dto/login-foodie.dto';

@Injectable()
export class FoodiesService {


    constructor(
        @InjectRepository(Foodie) private readonly foodieRepository: Repository<Foodie>,
        private jwtService: JwtService,
    ) { }





    async createFoodie(createFoodieDto: CreateFoodieDto): Promise<{ accessToken: string }> {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createFoodieDto.password, salt);
        let foodie: Foodie = new Foodie();
        foodie.firstName = createFoodieDto.firstName;
        foodie.lastName = createFoodieDto.lastName;
        foodie.email = createFoodieDto.email;
        foodie.userName = createFoodieDto.userName;
        foodie.phoneNumber = createFoodieDto.phoneNumber;
        foodie.password = hashedPassword;

        const isUserExist = await this.foodieRepository.findOne({ where: { 'userName': foodie.userName } });
        if (isUserExist) {
            throw new BadRequestException('The userName is already taken. Please choose another one');
        }

        const isEmailExist = await this.foodieRepository.findOne({ where: { 'email': foodie.email } });
        if (isEmailExist) {
            throw new BadRequestException('The email is already taken. Please choose another one');
        }
        try {
            let resp = await this.foodieRepository.save(foodie);

            if (resp) {
                const data = {
                    id: resp.id,
                    firstName: resp.firstName,
                    lastName: resp.lastName,
                    email: resp.email,
                    userName: resp.userName
                };
                return {
                    accessToken: this.jwtService.sign(data),
                };
            }


        } catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async signIn(
        loginFoodieDto: LoginFoodieDto,
    ): Promise<{ accessToken: string }> {

        const { userName, password } = loginFoodieDto;

        const foodie = await this.foodieRepository.findOne({ where: { 'userName': userName } });

        if (foodie && (await bcrypt.compare(password, foodie.password))) {

            const foodieData = {
                firstName: foodie.firstName,
                lastName: foodie.lastName,
                email: foodie.email,
                userName: foodie.userName
            };
            return {
                accessToken: this.jwtService.sign(foodieData),
            };
        } else {
            throw new BadRequestException('Please check your login credentials');
        }
    }

}
