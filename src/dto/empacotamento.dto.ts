import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PedidoDto } from './pedido.dto';

export class EmpacotamentoDto {
  @ApiProperty({ description: 'Lista de pedidos para empacotar', type: [PedidoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoDto)
  pedidos: PedidoDto[];
}
