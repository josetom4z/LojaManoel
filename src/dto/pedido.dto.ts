import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, ValidateNested, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ProdutoDto } from './produto.dto';

export class PedidoDto {
  @ApiProperty({ description: 'ID único do pedido', example: 1 })
  @IsNumber()
  @IsPositive()
  pedido_id: number;

  @ApiProperty({ description: 'Lista de produtos do pedido', type: [ProdutoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}
