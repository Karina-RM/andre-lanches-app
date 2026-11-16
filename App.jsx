import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from './src/components/Header';
import BannerPromocao from './src/components/BannerPromocao';
import ListaProdutos from './src/components/ListaProdutos';
import SobreNos from './src/components/SobreNos';
import Contato from './src/components/Contato';
import EntregaFlutuante, { ALTURA_ENTREGA } from './src/components/EntregaFlutuante';
import { PRODUTOS } from './src/data/produtos';
import { PROMOCAO } from './src/data/loja';
import { cores, espaco } from './src/theme';

function Lanches({ espacoInferior }) {
  return (
    <ScrollView contentContainerStyle={[styles.conteudo, { paddingBottom: espacoInferior }]}>
      <BannerPromocao
        titulo={PROMOCAO.titulo}
        descricao={PROMOCAO.descricao}
        precoCentavos={PROMOCAO.precoCentavos}
        precoOriginalCentavos={PROMOCAO.precoOriginalCentavos}
        imagem={PROMOCAO.imagem}
      />
      <ListaProdutos produtos={PRODUTOS} />
    </ScrollView>
  );
}

function Aplicativo() {
  // Navegação por estado: a tela ativa decide qual componente aparece.
  const [telaAtiva, setTelaAtiva] = useState('lanches');
  const insets = useSafeAreaInsets();

  // O botão de entrega fica acima da barra de gestos do iPhone; o conteúdo
  // reserva esse espaço para o último item não ficar escondido atrás dele.
  const inferiorBotao = insets.bottom + espaco.md;
  const espacoInferior = inferiorBotao + ALTURA_ENTREGA + espaco.xl;

  let conteudo;
  if (telaAtiva === 'sobre') conteudo = <SobreNos espacoInferior={espacoInferior} />;
  else if (telaAtiva === 'contato') conteudo = <Contato espacoInferior={espacoInferior} />;
  else conteudo = <Lanches espacoInferior={espacoInferior} />;

  return (
    <SafeAreaView style={styles.areaSegura} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <View style={styles.tela}>
        <Header telaAtiva={telaAtiva} onNavegar={setTelaAtiva} />
        <View style={styles.flex}>{conteudo}</View>
        <EntregaFlutuante inferior={inferiorBotao} />
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Aplicativo />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: cores.primaria,
  },
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  flex: {
    flex: 1,
  },
  conteudo: {
    padding: espaco.lg,
  },
});
