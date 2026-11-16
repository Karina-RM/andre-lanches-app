import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert, Linking } from 'react-native';

import App from '../App';
import BannerPromocao from '../src/components/BannerPromocao';
import ListaProdutos from '../src/components/ListaProdutos';
import Contato from '../src/components/Contato';
import EntregaFlutuante from '../src/components/EntregaFlutuante';
import { PRODUTOS } from '../src/data/produtos';

jest.mock('react-native-safe-area-context', () => require('react-native-safe-area-context/jest/mock').default);

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('App (navegação por estado)', () => {
  it('abre na tela Lanches, com promoção e cardápio', async () => {
    await render(<App />);
    expect(screen.getByText('Promoção!')).toBeTruthy();
    expect(screen.getByText('Nossos Lanches')).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Lanches' })).toBeSelected();
  });

  it('troca para Sobre Nós e Contato ao tocar nas abas', async () => {
    await render(<App />);
    await fireEvent.press(screen.getByRole('tab', { name: 'Sobre Nós' }));
    expect(screen.getByText('Nossa história')).toBeTruthy();
    expect(screen.queryByText('Nossos Lanches')).toBeNull();
    expect(screen.getByRole('tab', { name: 'Sobre Nós' })).toBeSelected();

    await fireEvent.press(screen.getByRole('tab', { name: 'Contato' }));
    expect(screen.getByText('Enviar mensagem')).toBeTruthy();

    await fireEvent.press(screen.getByRole('tab', { name: 'Lanches' }));
    expect(screen.getByText('Nossos Lanches')).toBeTruthy();
  });

  it('mostra o botão de entrega em todas as telas', async () => {
    await render(<App />);
    for (const aba of ['Lanches', 'Sobre Nós', 'Contato']) {
      await fireEvent.press(screen.getByRole('tab', { name: aba }));
      expect(screen.getByText('Entregamos na sua casa!')).toBeTruthy();
    }
  });
});

describe('BannerPromocao (props)', () => {
  it('exibe título, descrição e preço recebidos por props', async () => {
    await render(<BannerPromocao titulo="Combo" descricao="Big Tower + Refri" precoCentavos={2190} />);
    expect(screen.getByText('Combo')).toBeTruthy();
    expect(screen.getByText('Big Tower + Refri')).toBeTruthy();
    expect(screen.getByText('R$ 21,90')).toBeTruthy();
    expect(screen.queryByText(/^de R\$/)).toBeNull();
  });

  it('mostra o preço antigo quando informado', async () => {
    await render(<BannerPromocao titulo="Promoção!" descricao="X" precoCentavos={990} precoOriginalCentavos={1500} />);
    expect(screen.getByText('de R$ 15,00')).toBeTruthy();
  });
});

describe('ListaProdutos', () => {
  it('mostra os 9 produtos com preço formatado', async () => {
    await render(<ListaProdutos produtos={PRODUTOS} />);
    for (const p of PRODUTOS) expect(screen.getByText(p.nome)).toBeTruthy();
    expect(screen.getByText('R$ 20,50')).toBeTruthy();
  });

  it('filtra por categoria', async () => {
    await render(<ListaProdutos produtos={PRODUTOS} />);
    await fireEvent.press(screen.getByText('Bebidas'));
    expect(screen.getByText('Refri (Lata)')).toBeTruthy();
    expect(screen.queryByText('X-Salada')).toBeNull();
    await fireEvent.press(screen.getByText('Todos'));
    expect(screen.getByText('X-Salada')).toBeTruthy();
  });
});

describe('Contato (formulário)', () => {
  it('não envia e mostra os erros quando está vazio', async () => {
    const alerta = jest.spyOn(Alert, 'alert');
    await render(<Contato />);
    await fireEvent.press(screen.getByText('Enviar mensagem'));
    expect(screen.getByText('Informe seu nome.')).toBeTruthy();
    expect(screen.getByText('Informe um e-mail ou WhatsApp.')).toBeTruthy();
    expect(screen.getByText('Escreva sua mensagem.')).toBeTruthy();
    expect(alerta).not.toHaveBeenCalled();
  });

  it('confirma com Alert.alert e limpa o formulário quando está válido', async () => {
    const alerta = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    await render(<Contato />);
    await fireEvent.changeText(screen.getByLabelText('Nome'), 'Karina Modesto');
    await fireEvent.changeText(screen.getByLabelText('E-mail ou WhatsApp'), 'karina@email.com');
    await fireEvent.changeText(screen.getByLabelText('Mensagem'), 'Vocês entregam na Asa Sul?');
    await fireEvent.press(screen.getByText('Enviar mensagem'));

    expect(alerta).toHaveBeenCalledWith('Mensagem enviada!', expect.stringContaining('Obrigado, Karina!'));
    expect(screen.getByLabelText('Nome').props.value).toBe('');
  });

  it('o erro de um campo some quando a pessoa começa a corrigir', async () => {
    await render(<Contato />);
    await fireEvent.press(screen.getByText('Enviar mensagem'));
    await fireEvent.changeText(screen.getByLabelText('Nome'), 'K');
    expect(screen.queryByText('Informe seu nome.')).toBeNull();
    expect(screen.getByText('Escreva sua mensagem.')).toBeTruthy();
  });
});

describe('EntregaFlutuante (Linking)', () => {
  it('abre o discador com tel:+55...', async () => {
    const abrir = jest.spyOn(Linking, 'openURL').mockResolvedValue(true);
    await render(<EntregaFlutuante telefone="+5561988887777" />);
    expect(screen.getByText('(61) 98888-7777')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button'));
    await waitFor(() => expect(abrir).toHaveBeenCalledWith('tel:+5561988887777'));
  });

  it('avisa quando o aparelho não tem discador', async () => {
    jest.spyOn(Linking, 'openURL').mockRejectedValue(new Error('sem discador'));
    const alerta = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    await render(<EntregaFlutuante telefone="+5561988887777" />);
    await fireEvent.press(screen.getByRole('button'));
    await waitFor(() =>
      expect(alerta).toHaveBeenCalledWith('Não foi possível abrir o discador', 'Ligue para (61) 98888-7777.')
    );
  });
});
