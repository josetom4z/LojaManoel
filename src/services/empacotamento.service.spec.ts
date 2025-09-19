import { Test, TestingModule } from '@nestjs/testing';
import { EmpacotamentoService } from './empacotamento.service';
import { Pedido } from '../interfaces';

describe('EmpacotamentoService', () => {
  let service: EmpacotamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpacotamentoService],
    }).compile();

    service = module.get<EmpacotamentoService>(EmpacotamentoService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('processarPedidos', () => {
    it('deve processar pedido simples com produtos que cabem na Caixa 1', () => {
      const pedidos: Pedido[] = [
        {
          pedido_id: 1,
          produtos: [
            {
              produto_id: 'Joystick',
              dimensoes: { altura: 15, largura: 20, comprimento: 10 }
            }
          ]
        }
      ];

      const resultado = service.processarPedidos(pedidos);

      expect(resultado).toHaveLength(1);
      expect(resultado[0].pedido_id).toBe(1);
      expect(resultado[0].caixas).toHaveLength(1);
      expect(resultado[0].caixas[0].caixa_id).toBe('Caixa 1');
      expect(resultado[0].caixas[0].produtos).toContain('Joystick');
    });

    it('deve processar pedido com múltiplos produtos na mesma caixa', () => {
      const pedidos: Pedido[] = [
        {
          pedido_id: 2,
          produtos: [
            {
              produto_id: 'Joystick',
              dimensoes: { altura: 15, largura: 20, comprimento: 10 }
            },
            {
              produto_id: 'Fifa 24',
              dimensoes: { altura: 10, largura: 30, comprimento: 10 }
            }
          ]
        }
      ];

      const resultado = service.processarPedidos(pedidos);

      expect(resultado).toHaveLength(1);
      expect(resultado[0].pedido_id).toBe(2);
      expect(resultado[0].caixas).toHaveLength(1);
      expect(resultado[0].caixas[0].caixa_id).toBe('Caixa 1');
      expect(resultado[0].caixas[0].produtos).toContain('Joystick');
      expect(resultado[0].caixas[0].produtos).toContain('Fifa 24');
    });

    it('deve processar pedido com produto que não cabe em nenhuma caixa', () => {
      const pedidos: Pedido[] = [
        {
          pedido_id: 5,
          produtos: [
            {
              produto_id: 'Cadeira Gamer',
              dimensoes: { altura: 120, largura: 60, comprimento: 70 }
            }
          ]
        }
      ];

      const resultado = service.processarPedidos(pedidos);

      expect(resultado).toHaveLength(1);
      expect(resultado[0].pedido_id).toBe(5);
      expect(resultado[0].caixas).toHaveLength(1);
      expect(resultado[0].caixas[0].caixa_id).toBeNull();
      expect(resultado[0].caixas[0].produtos).toContain('Cadeira Gamer');
      expect((resultado[0].caixas[0] as any).observacao).toBe('Produto não cabe em nenhuma caixa disponível.');
    });

    it('deve processar pedido com produtos que precisam de múltiplas caixas', () => {
      const pedidos: Pedido[] = [
        {
          pedido_id: 6,
          produtos: [
            {
              produto_id: 'Monitor',
              dimensoes: { altura: 50, largura: 60, comprimento: 20 }
            },
            {
              produto_id: 'Webcam',
              dimensoes: { altura: 7, largura: 10, comprimento: 5 }
            }
          ]
        }
      ];

      const resultado = service.processarPedidos(pedidos);

      expect(resultado).toHaveLength(1);
      expect(resultado[0].pedido_id).toBe(6);
      expect(resultado[0].caixas.length).toBeGreaterThanOrEqual(1);
    });
  });
});
