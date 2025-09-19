import { Module } from '@nestjs/common';
import { EmpacotamentoController } from '../controllers/empacotamento.controller';
import { EmpacotamentoService } from '../services/empacotamento.service';

@Module({
  controllers: [EmpacotamentoController],
  providers: [EmpacotamentoService],
})
export class EmpacotamentoModule {}
