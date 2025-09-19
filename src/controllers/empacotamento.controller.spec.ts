import { Test, TestingModule } from '@nestjs/testing';
import { EmpacotamentoController } from './empacotamento.controller';
import { EmpacotamentoService } from '../services/empacotamento.service';
import { EmpacotamentoDto } from '../dto';

describe('EmpacotamentoController', () => {
  let controller: EmpacotamentoController;
  let service: EmpacotamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpacotamentoController],
      providers: [
        {
          provide: EmpacotamentoService,
          useValue: {
            processarPedidos: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmpacotamentoController>(EmpacotamentoController);
    service = module.get<EmpacotamentoService>(EmpacotamentoService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('processarEmpacotamento', () => {
    it('deve processar empacotamento com sucesso', async () => {
      const empacotamentoDto: EmpacotamentoDto = {
        pedidos: [
          {
            pedido_id: 1,
            produtos: [
              {
                produto_id: 'Joystick',
                dimensoes: { altura: 15, largura: 20, comprimento: 10 }
              }
            ]
          }
        ]
      };

      const resultadoEsperado = {
        pedidos: [
          {
            pedido_id: 1,
            caixas: [
              {
                caixa_id: 'Caixa 1',
                produtos: ['Joystick']
              }
            ]
          }
        ]
      };

      jest.spyOn(service, 'processarPedidos').mockReturnValue(resultadoEsperado.pedidos);

      const resultado = await controller.processarEmpacotamento(empacotamentoDto);

      expect(service.processarPedidos).toHaveBeenCalledWith(empacotamentoDto.pedidos);
      expect(resultado).toEqual(resultadoEsperado);
    });
  });
});
