import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { cores, espaco, raio, fonte, sombra } from '../theme';
import { TELEFONE } from '../data/loja';
import { formatarTelefone } from '../utils/formatar';
import { ligarParaLoja } from '../utils/aviso';

// Altura usada pelo App para reservar espaço no fim do conteúdo,
// para o botão não cobrir o último item da lista.
export const ALTURA_ENTREGA = 64;

// Botão fixo na base da tela (position: 'absolute'). O deslocamento inferior
// vem do App, que soma a área segura do aparelho (barra de gestos do iPhone).
export default function EntregaFlutuante({ inferior = espaco.lg, telefone = TELEFONE }) {
  const numero = formatarTelefone(telefone);
  return (
    <View style={[styles.posicao, { bottom: inferior }]} pointerEvents="box-none">
      <TouchableOpacity
        style={styles.botao}
        onPress={() => ligarParaLoja(telefone)}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`Pedir por telefone: ${numero}`}
        accessibilityHint="Abre o discador do celular"
      >
        <Image source={require('../../assets/images/telefone.png')} style={styles.icone} accessible={false} />
        <View>
          <Text style={styles.chamada}>Entregamos na sua casa!</Text>
          <Text style={styles.numero}>{numero}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  posicao: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  botao: {
    height: ALTURA_ENTREGA,
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
    backgroundColor: cores.primaria,
    borderRadius: raio.pilula,
    paddingLeft: espaco.sm,
    paddingRight: espaco.xl,
    borderWidth: 2,
    borderColor: cores.branco,
    ...sombra(4),
  },
  icone: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: cores.branco,
  },
  chamada: {
    color: cores.fundo,
    fontSize: fonte.legenda - 1,
    fontWeight: '700',
  },
  numero: {
    color: cores.branco,
    fontSize: fonte.titulo - 2,
    fontWeight: '900',
  },
});
