import { Alert, Linking, Platform } from 'react-native';
import { TELEFONE } from '../data/loja';
import { formatarTelefone } from './formatar';

// Alert.alert não faz nada no react-native-web (lição do ChatRoom);
// na prévia web usamos o alert do navegador.
export function avisar(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

// Abre o discador do celular com o número da loja (API nativa Linking).
export async function ligarParaLoja(telefone = TELEFONE) {
  try {
    await Linking.openURL(`tel:${telefone}`);
  } catch {
    // Simulador do iOS, tablet sem chip ou navegador: não há discador.
    avisar('Não foi possível abrir o discador', `Ligue para ${formatarTelefone(telefone)}.`);
  }
}

// Abre a conversa no WhatsApp com uma mensagem pronta.
export async function abrirWhatsApp(texto, telefone = TELEFONE) {
  const numero = telefone.replace(/\D/g, '');
  try {
    await Linking.openURL(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`);
  } catch {
    avisar('Não foi possível abrir o WhatsApp', `Chame no ${formatarTelefone(telefone)}.`);
  }
}
