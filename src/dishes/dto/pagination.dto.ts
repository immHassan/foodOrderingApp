import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDto {
  
  @IsString()
  @IsOptional()
  limit: number;

  @IsString()
  @IsOptional()
   offset: number;
}
