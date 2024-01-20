import { Optional } from '@nestjs/common';
import { IsInt, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateFoodieDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  lastName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  email: string;


  @IsString()
  @MinLength(2)
  @MaxLength(20)
  userName: string;


  @IsOptional()
  @IsString()
  @MaxLength(200)
  address: string;

  
  @Optional()
  @MinLength(8)
  @MaxLength(14)
  phoneNumber: string;


  @IsOptional()
  @IsString()
  @MaxLength(500)
  image: string;


  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;
}
