import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DimensoesDto } from './dimensoes.dto';

export class ProdutoDto {
  @ApiProperty({ description: 'ID único do produto', example: 'PS5' })
  @IsString()
  @IsNotEmpty()
  produto_id: string;

  @ApiProperty({ description: 'Dimensões do produto', type: DimensoesDto })
  @ValidateNested()
  @Type(() => DimensoesDto)
  dimensoes: DimensoesDto;
}
