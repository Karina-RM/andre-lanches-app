import { Platform } from 'react-native';

// Paleta derivada do site original (vermelho #e50021 e amarelo #ffe18c),
// com tons de apoio para estados, textos e superfícies.
export const cores = {
  primaria: '#E50021',
  primariaEscura: '#B0001A',
  fundo: '#FFE18C',
  superficie: '#FFFFFF',
  suave: '#FFF4D1',
  texto: '#2B1A12',
  textoSecundario: '#6B5A4E',
  borda: '#F0D9A0',
  branco: '#FFFFFF',
  erro: '#B3261E',
  sucesso: '#1E7B34',
};

// Escala de espaçamento em múltiplos de 4.
export const espaco = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const raio = {
  sm: 8,
  md: 12,
  lg: 16,
  pilula: 999,
};

export const fonte = {
  titulo: 22,
  subtitulo: 17,
  corpo: 15,
  legenda: 13,
};

// Sombra que funciona nas duas plataformas: shadow* no iOS e elevation no Android.
export function sombra(nivel = 2) {
  return Platform.select({
    ios: {
      shadowColor: cores.primariaEscura,
      shadowOffset: { width: 0, height: nivel },
      shadowOpacity: 0.12 + nivel * 0.02,
      shadowRadius: nivel * 2,
    },
    android: { elevation: nivel * 2 },
    default: {
      boxShadow: `0px ${nivel}px ${nivel * 3}px rgba(176, 0, 26, 0.18)`,
    },
  });
}
