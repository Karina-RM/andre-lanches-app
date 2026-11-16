import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { cores, espaco, raio, fonte, sombra } from '../theme';
import { formatarPreco } from '../utils/formatar';

// Banner reutilizável: título, descrição e preço chegam por props.
// precoOriginalCentavos e imagem são opcionais.
export default function BannerPromocao({
  titulo,
  descricao,
  precoCentavos,
  precoOriginalCentavos,
  imagem,
}) {
  const conteudo = (
    <View style={styles.camada}>
      <View style={styles.selo}>
        <Text style={styles.textoSelo}>OFERTA DO DIA</Text>
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.descricao}>{descricao}</Text>
      <View style={styles.linhaPreco}>
        {precoOriginalCentavos ? (
          <Text style={styles.precoAntigo}>de {formatarPreco(precoOriginalCentavos)}</Text>
        ) : null}
        <View style={styles.etiquetaPreco}>
          <Text style={styles.preco}>{formatarPreco(precoCentavos)}</Text>
        </View>
      </View>
    </View>
  );

  const rotulo = `${titulo} ${descricao} por ${formatarPreco(precoCentavos)}`;

  return (
    <View style={styles.cartao} accessible accessibilityLabel={rotulo}>
      {imagem ? (
        <ImageBackground source={imagem} style={styles.fundo} imageStyle={styles.imagem} resizeMode="cover">
          {conteudo}
        </ImageBackground>
      ) : (
        <View style={[styles.fundo, { backgroundColor: cores.primaria }]}>{conteudo}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cartao: {
    borderRadius: raio.lg,
    backgroundColor: cores.primaria,
    ...sombra(3),
  },
  fundo: {
    minHeight: 190,
    borderRadius: raio.lg,
    overflow: 'hidden',
  },
  imagem: {
    borderRadius: raio.lg,
  },
  camada: {
    flex: 1,
    padding: espaco.lg,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(43, 26, 18, 0.45)',
  },
  selo: {
    alignSelf: 'flex-start',
    backgroundColor: cores.fundo,
    borderRadius: raio.pilula,
    paddingHorizontal: espaco.sm + 2,
    paddingVertical: 3,
    marginBottom: espaco.sm,
  },
  textoSelo: {
    color: cores.primariaEscura,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  titulo: {
    color: cores.branco,
    fontSize: 34,
    fontWeight: '900',
    textShadowColor: cores.primaria,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  descricao: {
    color: cores.branco,
    fontSize: fonte.subtitulo + 1,
    fontWeight: '700',
    marginTop: 2,
  },
  linhaPreco: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: espaco.sm,
    marginTop: espaco.md,
  },
  precoAntigo: {
    color: cores.branco,
    fontSize: fonte.legenda,
    textDecorationLine: 'line-through',
    opacity: 0.9,
  },
  etiquetaPreco: {
    backgroundColor: cores.primaria,
    borderRadius: raio.md,
    paddingHorizontal: espaco.md,
    paddingVertical: espaco.xs + 2,
    borderWidth: 2,
    borderColor: cores.branco,
  },
  preco: {
    color: cores.branco,
    fontSize: 24,
    fontWeight: '900',
  },
});
