import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @Min(0)
    @IsInt()
    stock: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    categoryId?: number;
}