import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LoginChefDto {

  @IsString()
  @MinLength(2)
  @MaxLength(20)
  userName: string;

  @IsString()
  @MaxLength(32)
  password: string;
}
