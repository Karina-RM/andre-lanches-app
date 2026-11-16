const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function ehWhatsApp(valor) {
  let digitos = valor.replace(/\D/g, '');
  // Aceita o número com o código do país (55) na frente.
  if (digitos.length > 11 && digitos.startsWith('55')) digitos = digitos.slice(2);
  // Só considera telefone se o texto tiver apenas dígitos e símbolos comuns.
  const soTelefone = /^[\d\s()+-]+$/.test(valor);
  return soTelefone && (digitos.length === 10 || digitos.length === 11);
}

// Devolve um objeto { campo: mensagem } só com os campos inválidos.
// Objeto vazio significa formulário válido.
export function validarContato({ nome = '', contato = '', mensagem = '' }) {
  const erros = {};
  const n = nome.trim();
  const c = contato.trim();
  const m = mensagem.trim();

  if (!n) erros.nome = 'Informe seu nome.';
  else if (n.replace(/[^A-Za-zÀ-ÿ]/g, '').length < 2) erros.nome = 'O nome precisa ter pelo menos 2 letras.';

  if (!c) erros.contato = 'Informe um e-mail ou WhatsApp.';
  else if (!EMAIL.test(c) && !ehWhatsApp(c)) {
    erros.contato = 'Use um e-mail válido ou um WhatsApp com DDD.';
  }

  if (!m) erros.mensagem = 'Escreva sua mensagem.';
  else if (m.length < 10) erros.mensagem = 'A mensagem precisa ter pelo menos 10 caracteres.';

  return erros;
}
