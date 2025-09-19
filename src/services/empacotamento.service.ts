import { Injectable } from '@nestjs/common';
import { Pedido, Produto, Dimensoes } from '../interfaces';
import { CAIXAS_DISPONIVEIS } from '../constants/caixas.constants';

interface CaixaUsada {
  caixa_id: string;
  produtos: string[];
  espacoRestante: Dimensoes;
}

@Injectable()
export class EmpacotamentoService {
  private caixas = CAIXAS_DISPONIVEIS;

  processarPedidos(pedidos: Pedido[]) {
    return pedidos.map(pedido => this.processarPedido(pedido));
  }

  private processarPedido(pedido: Pedido) {
    const caixasUsadas: CaixaUsada[] = [];
    const produtosNaoEmpacotados: Produto[] = [];

    for (const produto of pedido.produtos) {
      const caixaEncontrada = this.encontrarCaixaParaProduto(produto, caixasUsadas);
      
      if (caixaEncontrada) {
        caixaEncontrada.produtos.push(produto.produto_id);
        this.atualizarEspacoRestante(caixaEncontrada, produto.dimensoes);
      } else {
        const novaCaixa = this.encontrarMelhorCaixa(produto);
        if (novaCaixa) {
          const caixaUsada: CaixaUsada = {
            caixa_id: novaCaixa.id,
            produtos: [produto.produto_id],
            espacoRestante: this.calcularEspacoRestante(novaCaixa.dimensoes, produto.dimensoes)
          };
          caixasUsadas.push(caixaUsada);
        } else {
          produtosNaoEmpacotados.push(produto);
        }
      }
    }

    return this.formatarResultado(pedido.pedido_id, caixasUsadas, produtosNaoEmpacotados);
  }

  private encontrarCaixaParaProduto(produto: Produto, caixasUsadas: CaixaUsada[]): CaixaUsada | null {
    for (const caixa of caixasUsadas) {
      if (this.produtoCabeNaCaixa(produto.dimensoes, caixa.espacoRestante)) {
        return caixa;
      }
    }
    return null;
  }

  private encontrarMelhorCaixa(produto: Produto) {
    const caixasOrdenadas = [...this.caixas].sort((a, b) => {
      const volumeA = a.dimensoes.altura * a.dimensoes.largura * a.dimensoes.comprimento;
      const volumeB = b.dimensoes.altura * b.dimensoes.largura * b.dimensoes.comprimento;
      return volumeA - volumeB;
    });

    for (const caixa of caixasOrdenadas) {
      if (this.produtoCabeNaCaixa(produto.dimensoes, caixa.dimensoes)) {
        return caixa;
      }
    }
    return null;
  }

  private produtoCabeNaCaixa(dimensoesProduto: Dimensoes, dimensoesCaixa: Dimensoes): boolean {
    const rotacoes = this.gerarRotacoes(dimensoesProduto);
    
    for (const rotacao of rotacoes) {
      if (rotacao.altura <= dimensoesCaixa.altura &&
          rotacao.largura <= dimensoesCaixa.largura &&
          rotacao.comprimento <= dimensoesCaixa.comprimento) {
        return true;
      }
    }
    return false;
  }

  private gerarRotacoes(dimensoes: Dimensoes): Dimensoes[] {
    const { altura, largura, comprimento } = dimensoes;
    return [
      { altura, largura, comprimento },
      { altura: largura, largura: altura, comprimento },
      { altura, largura: comprimento, comprimento: largura },
      { altura: comprimento, largura, comprimento: altura },
      { altura: largura, largura: comprimento, comprimento: altura },
      { altura: comprimento, largura: altura, comprimento: largura }
    ];
  }

  private calcularEspacoRestante(dimensoesCaixa: Dimensoes, dimensoesProduto: Dimensoes): Dimensoes {
    const rotacoes = this.gerarRotacoes(dimensoesProduto);
    
    for (const rotacao of rotacoes) {
      if (rotacao.altura <= dimensoesCaixa.altura &&
          rotacao.largura <= dimensoesCaixa.largura &&
          rotacao.comprimento <= dimensoesCaixa.comprimento) {
        return {
          altura: dimensoesCaixa.altura - rotacao.altura,
          largura: dimensoesCaixa.largura - rotacao.largura,
          comprimento: dimensoesCaixa.comprimento - rotacao.comprimento
        };
      }
    }
    
    return dimensoesCaixa;
  }

  private atualizarEspacoRestante(caixa: CaixaUsada, dimensoesProduto: Dimensoes) {
    caixa.espacoRestante = this.calcularEspacoRestante(caixa.espacoRestante, dimensoesProduto);
  }

  private formatarResultado(pedidoId: number, caixasUsadas: CaixaUsada[], produtosNaoEmpacotados: Produto[]) {
    const caixas = caixasUsadas.map(caixa => ({
      caixa_id: caixa.caixa_id,
      produtos: caixa.produtos
    }));

    if (produtosNaoEmpacotados.length > 0) {
      caixas.push({
        caixa_id: null,
        produtos: produtosNaoEmpacotados.map(p => p.produto_id),
        observacao: 'Produto não cabe em nenhuma caixa disponível.'
      } as any);
    }

    return {
      pedido_id: pedidoId,
      caixas
    };
  }
}
