import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espaco, raio, fonte, sombra } from '../theme';

export const TELAS = [
  { id: 'lanches', rotulo: 'Lanches', icone: 'fast-food' },
  { id: 'sobre', rotulo: 'Sobre Nós', icone: 'storefront' },
  { id: 'contato', rotulo: 'Contato', icone: 'chatbubbles' },
];

// Cabeçalho com a logo no canto superior esquerdo e as abas de navegação.
// A tela ativa fica no App (useState); aqui só exibimos e avisamos o toque.
export default function Header({ telaAtiva, onNavegar }) {
  return (
    <View style={styles.container}>
      <View style={styles.marca}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          accessibilityIgnoresInvertColors
          accessible={false}
        />
        <View>
          <Text style={styles.nome} accessibilityRole="header">
            André Lanches
          </Text>
          <Text style={styles.slogan}>Feito na chapa, desde 2012</Text>
        </View>
      </View>

      <View style={styles.abas} accessibilityRole="tablist">
        {TELAS.map((tela) => {
          const ativa = tela.id === telaAtiva;
          return (
            <TouchableOpacity
              key={tela.id}
              style={[styles.aba, ativa && styles.abaAtiva]}
              onPress={() => onNavegar(tela.id)}
              activeOpacity={0.75}
              accessibilityRole="tab"
              accessibilityState={{ selected: ativa }}
              accessibilityLabel={tela.rotulo}
            >
              <Ionicons
                name={ativa ? tela.icone : `${tela.icone}-outline`}
                size={18}
                color={ativa ? cores.primaria : cores.branco}
              />
              <Text style={[styles.textoAba, ativa && styles.textoAbaAtiva]} numberOfLines={1}>
                {tela.rotulo}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cores.primaria,
    paddingHorizontal: espaco.lg,
    paddingTop: espaco.sm,
    paddingBottom: espaco.md,
    borderBottomLeftRadius: raio.lg,
    borderBottomRightRadius: raio.lg,
    ...sombra(3),
    zIndex: 1,
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
    marginBottom: espaco.md,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: raio.pilula,
    backgroundColor: cores.branco,
  },
  nome: {
    color: cores.branco,
    fontSize: fonte.titulo,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  slogan: {
    color: cores.fundo,
    fontSize: fonte.legenda,
    fontWeight: '500',
  },
  abas: {
    flexDirection: 'row',
    backgroundColor: cores.primariaEscura,
    borderRadius: raio.pilula,
    padding: espaco.xs,
    gap: espaco.xs,
  },
  aba: {
    flex: 1,
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: raio.pilula,
    paddingHorizontal: espaco.sm,
  },
  abaAtiva: {
    backgroundColor: cores.branco,
  },
  textoAba: {
    color: cores.branco,
    fontSize: fonte.legenda + 1,
    fontWeight: '600',
  },
  textoAbaAtiva: {
    color: cores.primaria,
    fontWeight: '800',
  },
});
