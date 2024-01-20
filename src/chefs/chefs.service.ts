import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException, ValidationError } from '@nestjs/common';
import { CreateChefDto } from './dto/create-chef.dto';
import { Chef } from './chef.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { LoginChefDto } from './dto/login-chef.dto';
import { JwtService } from '@nestjs/jwt';
import { emitWarning } from 'process';


@Injectable()
export class ChefsService {


    constructor(
        @InjectRepository(Chef) private readonly chefRepository: Repository<Chef>,
        private jwtService: JwtService,
    ) { }





    async createChef(createChefDto: CreateChefDto): Promise<{ accessToken: string }> {

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createChefDto.password, salt);
        const chef: Chef = new Chef();
        chef.firstName = createChefDto.firstName;
        chef.lastName = createChefDto.lastName;
        chef.email = createChefDto.email;
        chef.userName = createChefDto.userName;
        chef.password = hashedPassword;
        chef.password = createChefDto.image;



        const isUserExist = await this.chefRepository.findOne({where:{ 'userName': chef.userName }});
        if (isUserExist) {
            throw new BadRequestException('The userName is already taken. Please choose another one');
        }
        const isEmailExist = await this.chefRepository.findOne({where:{ 'email': chef.email }});
        if (isEmailExist) {
            throw new BadRequestException('The email is already taken. Please choose another one');
        }
        try {
            let resp = await this.chefRepository.save(chef);

            if (resp) {
                const chefData = {
                    id: resp.id,
                    firstName: resp.firstName,
                    lastName: resp.lastName,
                    email: resp.email,
                    userName: resp.userName,
                    image: resp.image,

                };
                return {
                    accessToken: this.jwtService.sign(chefData),
                };
            }


        } catch (error) {
            console.log("error", error);
            throw new InternalServerErrorException();
        }
    }

    async signIn(
        loginChefDto: LoginChefDto,
    ): Promise<{ accessToken: string }> {
        const { userName, password } = loginChefDto;
        const chef = await this.chefRepository.findOne({where:{ 'userName': userName }});

        const chefData = {
            id:chef.id,  //So we can get it from Jwt token
            image:chef.image,
            firstName: chef.firstName,
            lastName: chef.lastName,
            email: chef.email,
            userName: chef.userName
        };

        if (chef && (await bcrypt.compare(password, chef.password))) {
            return {
                accessToken: this.jwtService.sign(chefData),
            };
        } else {
            throw new BadRequestException('Please check your login credentials');
        }
    }


}
