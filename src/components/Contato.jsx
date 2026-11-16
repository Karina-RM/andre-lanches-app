import { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, espaco, raio, fonte, sombra } from '../theme';
import { validarContato } from '../utils/validarContato';
import { formatarTelefone } from '../utils/formatar';
import { avisar, ligarParaLoja, abrirWhatsApp } from '../utils/aviso';
import { TELEFONE } from '../data/loja';

const VAZIO = { nome: '', contato: '', mensagem: '' };

function Campo({ rotulo, erro, inputRef, style, ...props }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <TextInput
        ref={inputRef}
        style={[styles.input, erro && styles.inputErro, style]}
        placeholderTextColor="#A89A8E"
        accessibilityLabel={rotulo}
        {...props}
      />
      {erro ? (
        <View style={styles.linhaErro}>
          <Ionicons name="alert-circle" size={14} color={cores.erro} />
          <Text style={styles.erro}>{erro}</Text>
        </View>
      ) : null}
    </View>
  );
}

export default function Contato({ espacoInferior = 0 }) {
  const [form, setForm] = useState(VAZIO);
  const [erros, setErros] = useState({});
  const contatoRef = useRef(null);
  const mensagemRef = useRef(null);

  function alterar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
    // Some o erro do campo assim que a pessoa começa a corrigir.
    if (erros[campo]) setErros((atual) => ({ ...atual, [campo]: undefined }));
  }

  function enviar() {
    const encontrados = validarContato(form);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const primeiroNome = form.nome.trim().split(/\s+/)[0];
    avisar(
      'Mensagem enviada!',
      `Obrigado, ${primeiroNome}! Recebemos sua mensagem e vamos responder em ${form.contato.trim()} em breve.`
    );
    setForm(VAZIO);
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.conteudo, { paddingBottom: espacoInferior }]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo} accessibilityRole="header">
          Contato
        </Text>
        <Text style={styles.chamada}>Dúvida, elogio ou encomenda para festa? Fale com a gente.</Text>

        <View style={styles.atalhos}>
          <TouchableOpacity
            style={styles.atalho}
            onPress={() => ligarParaLoja()}
            accessibilityRole="button"
            accessibilityLabel={`Ligar para ${formatarTelefone(TELEFONE)}`}
          >
            <Ionicons name="call" size={20} color={cores.primaria} />
            <Text style={styles.textoAtalho}>Ligar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.atalho}
            onPress={() => abrirWhatsApp('Olá, André Lanches! Gostaria de fazer um pedido.')}
            accessibilityRole="button"
            accessibilityLabel="Conversar pelo WhatsApp"
          >
            <Ionicons name="logo-whatsapp" size={20} color={cores.sucesso} />
            <Text style={styles.textoAtalho}>WhatsApp</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartao}>
          <Campo
            rotulo="Nome"
            placeholder="Como podemos te chamar?"
            value={form.nome}
            onChangeText={(v) => alterar('nome', v)}
            erro={erros.nome}
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => contatoRef.current?.focus()}
          />
          <Campo
            rotulo="E-mail ou WhatsApp"
            placeholder="voce@email.com ou (61) 99999-9999"
            value={form.contato}
            onChangeText={(v) => alterar('contato', v)}
            erro={erros.contato}
            inputRef={contatoRef}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => mensagemRef.current?.focus()}
          />
          <Campo
            rotulo="Mensagem"
            placeholder="Escreva aqui sua mensagem"
            value={form.mensagem}
            onChangeText={(v) => alterar('mensagem', v)}
            erro={erros.mensagem}
            inputRef={mensagemRef}
            multiline
            textAlignVertical="top"
            style={styles.inputMensagem}
          />

          <TouchableOpacity
            style={styles.botao}
            onPress={enviar}
            activeOpacity={0.8}
            accessibilityRole="button"
          >
            <Ionicons name="send" size={18} color={cores.branco} />
            <Text style={styles.textoBotao}>Enviar mensagem</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
    fontSize: fonte.corpo,
    marginTop: 2,
    marginBottom: espaco.lg,
  },
  atalhos: {
    flexDirection: 'row',
    gap: espaco.md,
    marginBottom: espaco.lg,
  },
  atalho: {
    flex: 1,
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaco.sm,
    backgroundColor: cores.superficie,
    borderRadius: raio.md,
    ...sombra(1),
  },
  textoAtalho: {
    color: cores.texto,
    fontSize: fonte.corpo,
    fontWeight: '700',
  },
  cartao: {
    backgroundColor: cores.superficie,
    borderRadius: raio.lg,
    padding: espaco.lg,
    ...sombra(2),
  },
  campo: {
    marginBottom: espaco.lg,
  },
  rotulo: {
    color: cores.texto,
    fontSize: fonte.legenda + 1,
    fontWeight: '700',
    marginBottom: espaco.xs + 2,
  },
  input: {
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: cores.borda,
    backgroundColor: cores.suave,
    borderRadius: raio.md,
    paddingHorizontal: espaco.md,
    paddingVertical: espaco.sm,
    fontSize: fonte.corpo + 1,
    color: cores.texto,
  },
  inputMensagem: {
    minHeight: 120,
    paddingTop: espaco.md,
  },
  inputErro: {
    borderColor: cores.erro,
  },
  linhaErro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: espaco.xs,
  },
  erro: {
    color: cores.erro,
    fontSize: fonte.legenda,
    fontWeight: '600',
  },
  botao: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaco.sm,
    backgroundColor: cores.primaria,
    borderRadius: raio.pilula,
    ...sombra(2),
  },
  textoBotao: {
    color: cores.branco,
    fontSize: fonte.subtitulo,
    fontWeight: '800',
  },
});
