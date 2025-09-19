import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EmpacotamentoService } from '../services/empacotamento.service';
import { EmpacotamentoDto, EmpacotamentoResultadoDto } from '../dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Empacotamento')
@Controller('empacotamento')
export class EmpacotamentoController {
  constructor(private readonly empacotamentoService: EmpacotamentoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Processar empacotamento de pedidos',
    description: 'Recebe uma lista de pedidos com produtos e suas dimensões, retornando a melhor forma de empacotar os produtos nas caixas disponíveis.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Empacotamento processado com sucesso',
    type: EmpacotamentoResultadoDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados de entrada inválidos' 
  })
  @ApiBearerAuth()
  async processarEmpacotamento(@Body() empacotamentoDto: EmpacotamentoDto): Promise<EmpacotamentoResultadoDto> {
    const resultado = this.empacotamentoService.processarPedidos(empacotamentoDto.pedidos);
    return { pedidos: resultado };
  }
}
