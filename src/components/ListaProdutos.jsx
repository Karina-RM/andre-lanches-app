import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { cores, espaco, raio, fonte, sombra } from '../theme';
import { formatarPreco } from '../utils/formatar';
import { CATEGORIAS, filtrarPorCategoria } from '../data/produtos';

function CartaoProduto({ produto }) {
  const preco = formatarPreco(produto.precoCentavos);
  return (
    <View style={styles.cartao} accessible accessibilityLabel={`${produto.nome}, ${preco}. ${produto.descricao}`}>
      <Image source={produto.imagem} style={styles.imagem} accessibilityIgnoresInvertColors />
      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.descricao}>{produto.descricao}</Text>
        <Text style={styles.preco}>{preco}</Text>
      </View>
    </View>
  );
}

// Cardápio com filtro por categoria. Os itens são poucos (9), então um map
// dentro do ScrollView da tela basta; FlatList não pode ficar dentro de um
// ScrollView vertical sem perder a virtualização.
export default function ListaProdutos({ produtos, titulo = 'Nossos Lanches' }) {
  const [categoria, setCategoria] = useState('Todos');
  const visiveis = filtrarPorCategoria(produtos, categoria);

  return (
    <View>
      <Text style={styles.titulo} accessibilityRole="header">
        {titulo}
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtros}
        style={styles.filtrosScroll}
      >
        {CATEGORIAS.map((c) => {
          const ativa = c === categoria;
          return (
            <TouchableOpacity
              key={c}
              onPress={() => setCategoria(c)}
              style={[styles.chip, ativa && styles.chipAtivo]}
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityState={{ selected: ativa }}
            >
              <Text style={[styles.textoChip, ativa && styles.textoChipAtivo]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {visiveis.map((p) => (
        <CartaoProduto key={p.id} produto={p} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: cores.primaria,
    fontSize: fonte.titulo + 2,
    fontWeight: '900',
    marginTop: espaco.xl,
    marginBottom: espaco.sm,
  },
  filtrosScroll: {
    marginHorizontal: -espaco.lg,
    marginBottom: espaco.md,
  },
  filtros: {
    paddingHorizontal: espaco.lg,
    gap: espaco.sm,
  },
  chip: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: espaco.lg,
    borderRadius: raio.pilula,
    borderWidth: 1.5,
    borderColor: cores.primaria,
    backgroundColor: cores.superficie,
  },
  chipAtivo: {
    backgroundColor: cores.primaria,
  },
  textoChip: {
    color: cores.primaria,
    fontSize: fonte.legenda + 1,
    fontWeight: '700',
  },
  textoChipAtivo: {
    color: cores.branco,
  },
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaco.md,
    backgroundColor: cores.superficie,
    borderRadius: raio.lg,
    padding: espaco.md,
    marginBottom: espaco.md,
    ...sombra(2),
  },
  imagem: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: cores.primaria,
  },
  info: {
    flex: 1,
  },
  nome: {
    color: cores.texto,
    fontSize: fonte.subtitulo,
    fontWeight: '800',
  },
  descricao: {
    color: cores.textoSecundario,
    fontSize: fonte.legenda,
    lineHeight: 18,
    marginTop: 2,
  },
  preco: {
    color: cores.primaria,
    fontSize: fonte.subtitulo + 1,
    fontWeight: '900',
    marginTop: espaco.sm,
  },
});
