import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PedidoResultadoDto } from './pedido-resultado.dto';

export class EmpacotamentoResultadoDto {
  @ApiProperty({ description: 'Lista de pedidos processados', type: [PedidoResultadoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoResultadoDto)
  pedidos: PedidoResultadoDto[];
}
