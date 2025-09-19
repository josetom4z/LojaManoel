import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CaixaResultadoDto } from './caixa-resultado.dto';

export class PedidoResultadoDto {
  @ApiProperty({ description: 'ID único do pedido', example: 1 })
  @IsNumber()
  pedido_id: number;

  @ApiProperty({ description: 'Lista de caixas utilizadas', type: [CaixaResultadoDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CaixaResultadoDto)
  caixas: CaixaResultadoDto[];
}
