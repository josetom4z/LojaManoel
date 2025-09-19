import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class DimensoesDto {
  @ApiProperty({ description: 'Altura do produto em centímetros', example: 40 })
  @IsNumber()
  @IsPositive()
  altura: number;

  @ApiProperty({ description: 'Largura do produto em centímetros', example: 10 })
  @IsNumber()
  @IsPositive()
  largura: number;

  @ApiProperty({ description: 'Comprimento do produto em centímetros', example: 25 })
  @IsNumber()
  @IsPositive()
  comprimento: number;
}
