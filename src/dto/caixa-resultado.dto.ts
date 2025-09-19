import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CaixaResultadoDto {
  @ApiProperty({ description: 'ID da caixa utilizada', example: 'Caixa 1', nullable: true })
  @IsString()
  @IsOptional()
  caixa_id: string | null;

  @ApiProperty({ description: 'Lista de produtos na caixa', example: ['PS5', 'Volante'] })
  @IsArray()
  @IsString({ each: true })
  produtos: string[];

  @ApiProperty({ description: 'Observação sobre a caixa', example: 'Produto não cabe em nenhuma caixa disponível.', required: false })
  @IsString()
  @IsOptional()
  observacao?: string;
}
