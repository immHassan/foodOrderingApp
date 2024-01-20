import { Optional } from '@nestjs/common';
import { IsArray, IsDecimal, IsInt, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { OrderItems } from '../orderItems.entity';

export class CreateOrderDto {
  @IsArray()
  items: OrderItems[];

  @IsNumber()
  totalAmount: number;

  @IsString()
  @MaxLength(500)
  deliveryAddress: string;

  @IsString()
  @MaxLength(16)
  deliveryPhoneNumber: string;



}
