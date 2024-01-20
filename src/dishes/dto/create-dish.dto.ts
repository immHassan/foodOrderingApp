import { Optional } from '@nestjs/common';
import { IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateDishDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  image: string;

  @IsNumber()
  price: number;



}
