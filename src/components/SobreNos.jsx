import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espaco, raio, fonte, sombra } from '../theme';
import { HORARIO } from '../data/loja';

const DIFERENCIAIS = [
  { icone: 'flame', titulo: 'Pão de brioche do dia', texto: 'Assado todas as manhãs, macio por dentro e dourado por fora.' },
  { icone: 'restaurant', titulo: 'Carne moída na casa', texto: '100% bovina, temperada na hora e grelhada na mesma chapa desde 2012.' },
  { icone: 'heart', titulo: 'Molho da família', texto: 'A receita guardada desde o trailer, que até hoje ninguém conseguiu copiar.' },
  { icone: 'bicycle', titulo: 'Entrega rapidinha', texto: 'No bairro, o lanche chega quente, do jeito que sai da chapa.' },
];

function Secao({ titulo, children }) {
  return (
    <View style={styles.secao}>
      <Text style={styles.tituloSecao} accessibilityRole="header">
        {titulo}
      </Text>
      {children}
    </View>
  );
}

export default function SobreNos({ espacoInferior = 0 }) {
  return (
    <ScrollView contentContainerStyle={[styles.conteudo, { paddingBottom: espacoInferior }]}>
      <Text style={styles.titulo} accessibilityRole="header">
        Sobre Nós
      </Text>
      <Text style={styles.chamada}>Do trailer da esquina para a sua casa.</Text>

      <Secao titulo="Nossa história">
        <Text style={styles.paragrafo}>
          O André Lanches nasceu em 2012, num trailer de esquina, com uma chapa, uma receita de
          molho da família e muita vontade de servir bem. O André atendia, fritava e entregava de
          bicicleta.
        </Text>
        <Text style={styles.paragrafo}>
          A fila foi crescendo, os vizinhos viraram clientes fiéis e o trailer virou lanchonete.
          Mudou o endereço, mudou o cardápio, mas a chapa continua a mesma.
        </Text>
      </Secao>

      <View style={styles.missao}>
        <Text style={styles.rotuloMissao}>NOSSA MISSÃO</Text>
        <Text style={styles.textoMissao}>
          Servir lanches caprichados, feitos na hora, com preço justo e atendimento de quem conhece
          o cliente pelo nome.
        </Text>
      </View>

      <Secao titulo="Por que o André?">
        {DIFERENCIAIS.map((d) => (
          <View key={d.titulo} style={styles.diferencial}>
            <View style={styles.icone}>
              <Ionicons name={d.icone} size={22} color={cores.primaria} />
            </View>
            <View style={styles.textoDiferencial}>
              <Text style={styles.tituloDiferencial}>{d.titulo}</Text>
              <Text style={styles.paragrafoCurto}>{d.texto}</Text>
            </View>
          </View>
        ))}
      </Secao>

      <View style={styles.horario}>
        <Ionicons name="time-outline" size={20} color={cores.primariaEscura} />
        <Text style={styles.textoHorario}>{HORARIO}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    padding: espaco.lg,
  },
  titulo: {
    color: cores.primaria,
    fontSize: 28,
    fontWeight: '900',
  },
  chamada: {
    color: cores.texto,
    fontSize: fonte.subtitulo,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: espaco.lg,
  },
  secao: {
    backgroundColor: cores.superficie,
    borderRadius: raio.lg,
    padding: espaco.lg,
    marginBottom: espaco.lg,
    ...sombra(2),
  },
  tituloSecao: {
    color: cores.primaria,
    fontSize: fonte.titulo - 2,
    fontWeight: '800',
    marginBottom: espaco.sm,
  },
  paragrafo: {
    color: cores.texto,
    fontSize: fonte.corpo,
    lineHeight: 23,
    marginBottom: espaco.sm,
  },
  missao: {
    backgroundColor: cores.primaria,
    borderRadius: raio.lg,
    padding: espaco.lg,
    marginBottom: espaco.lg,
    ...sombra(3),
  },
  rotuloMissao: {
    color: cores.fundo,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: espaco.xs,
  },
  textoMissao: {
    color: cores.branco,
    fontSize: fonte.subtitulo + 1,
    fontWeight: '700',
    lineHeight: 26,
  },
  diferencial: {
    flexDirection: 'row',
    gap: espaco.md,
    paddingVertical: espaco.sm,
  },
  icone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cores.suave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoDiferencial: {
    flex: 1,
  },
  tituloDiferencial: {
    color: cores.texto,
    fontSize: fonte.corpo + 1,
    fontWeight: '800',
  },
  paragrafoCurto: {
    color: cores.textoSecundario,
    fontSize: fonte.legenda + 1,
    lineHeight: 20,
  },
  horario: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaco.sm,
    backgroundColor: cores.suave,
    borderRadius: raio.pilula,
    paddingVertical: espaco.md,
  },
  textoHorario: {
    color: cores.primariaEscura,
    fontSize: fonte.corpo,
    fontWeight: '700',
  },
});
