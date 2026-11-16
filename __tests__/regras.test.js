import { formatarPreco, formatarTelefone } from '../src/utils/formatar';
import { validarContato } from '../src/utils/validarContato';
import { PRODUTOS, CATEGORIAS, filtrarPorCategoria } from '../src/data/produtos';
import { PROMOCAO, TELEFONE } from '../src/data/loja';

describe('formatarPreco', () => {
  it('formata centavos em reais com vírgula', () => {
    expect(formatarPreco(800)).toBe('R$ 8,00');
    expect(formatarPreco(990)).toBe('R$ 9,90');
    expect(formatarPreco(2050)).toBe('R$ 20,50');
  });

  it('mantém dois dígitos nos centavos', () => {
    expect(formatarPreco(5)).toBe('R$ 0,05');
    expect(formatarPreco(0)).toBe('R$ 0,00');
  });

  it('separa os milhares com ponto', () => {
    expect(formatarPreco(123456789)).toBe('R$ 1.234.567,89');
  });

  it('recusa valores que não são centavos inteiros', () => {
    expect(() => formatarPreco(8.5)).toThrow();
    expect(() => formatarPreco(-100)).toThrow();
    expect(() => formatarPreco('800')).toThrow();
  });
});

describe('formatarTelefone', () => {
  it('formata celular com 9 dígitos', () => {
    expect(formatarTelefone('+5561999999999')).toBe('(61) 99999-9999');
  });

  it('formata fixo com 8 dígitos', () => {
    expect(formatarTelefone('+556133334444')).toBe('(61) 3333-4444');
  });
});

describe('validarContato', () => {
  const valido = { nome: 'Karina', contato: 'karina@email.com', mensagem: 'Vocês entregam na Asa Sul?' };

  it('aceita um formulário completo', () => {
    expect(validarContato(valido)).toEqual({});
  });

  it('exige os três campos', () => {
    expect(validarContato({})).toEqual({
      nome: 'Informe seu nome.',
      contato: 'Informe um e-mail ou WhatsApp.',
      mensagem: 'Escreva sua mensagem.',
    });
  });

  it('ignora espaços em branco', () => {
    const erros = validarContato({ nome: '   ', contato: '  ', mensagem: '    ' });
    expect(Object.keys(erros)).toEqual(['nome', 'contato', 'mensagem']);
  });

  it('aceita WhatsApp com DDD, com ou sem máscara e com +55', () => {
    for (const contato of ['61999998888', '(61) 99999-8888', '+55 61 99999-8888', '(61) 3333-4444']) {
      expect(validarContato({ ...valido, contato })).toEqual({});
    }
  });

  it('recusa e-mail incompleto e telefone sem DDD', () => {
    for (const contato of ['karina@', 'karina@email', '99999-8888', 'abc 61999998888']) {
      expect(validarContato({ ...valido, contato }).contato).toBe(
        'Use um e-mail válido ou um WhatsApp com DDD.'
      );
    }
  });

  it('exige mensagem com pelo menos 10 caracteres', () => {
    expect(validarContato({ ...valido, mensagem: 'Oi' }).mensagem).toBe(
      'A mensagem precisa ter pelo menos 10 caracteres.'
    );
  });

  it('exige nome com pelo menos 2 letras', () => {
    expect(validarContato({ ...valido, nome: 'K' }).nome).toBe('O nome precisa ter pelo menos 2 letras.');
    expect(validarContato({ ...valido, nome: 'Zé' })).toEqual({});
  });
});

describe('dados do cardápio', () => {
  it('tem os 9 itens do site original', () => {
    expect(PRODUTOS).toHaveLength(9);
    expect(PRODUTOS.map((p) => p.nome)).toContain('Batata Frita');
  });

  it('cada item tem id único, nome, descrição, imagem, preço em centavos e categoria válida', () => {
    const ids = new Set(PRODUTOS.map((p) => p.id));
    expect(ids.size).toBe(PRODUTOS.length);
    for (const p of PRODUTOS) {
      expect(p.nome).toBeTruthy();
      expect(p.descricao.length).toBeGreaterThan(10);
      expect(p.imagem).toBeDefined();
      expect(Number.isInteger(p.precoCentavos)).toBe(true);
      expect(CATEGORIAS).toContain(p.categoria);
    }
  });

  it('filtra por categoria e "Todos" devolve tudo', () => {
    expect(filtrarPorCategoria(PRODUTOS, 'Todos')).toHaveLength(9);
    expect(filtrarPorCategoria(PRODUTOS, 'Bebidas').map((p) => p.id)).toEqual(['refri-lata', 'sucos']);
    expect(filtrarPorCategoria(PRODUTOS, 'Acompanhamentos')).toHaveLength(2);
  });

  it('a promoção custa menos que X-Salada + Batata separados', () => {
    const preco = (id) => PRODUTOS.find((p) => p.id === id).precoCentavos;
    expect(PROMOCAO.precoOriginalCentavos).toBe(preco('x-salada') + preco('batata-frita'));
    expect(PROMOCAO.precoCentavos).toBeLessThan(PROMOCAO.precoOriginalCentavos);
  });

  it('o telefone está no formato internacional do Brasil', () => {
    expect(TELEFONE).toMatch(/^\+55\d{10,11}$/);
  });
});
