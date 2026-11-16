// Formata centavos em reais no padrão brasileiro: 990 -> "R$ 9,90".
// Implementado sem Intl para dar o mesmo resultado em qualquer motor JS.
export function formatarPreco(centavos) {
  if (!Number.isInteger(centavos) || centavos < 0) {
    throw new Error('O preço deve ser um número inteiro de centavos, maior ou igual a zero.');
  }
  const reais = Math.floor(centavos / 100);
  const resto = String(centavos % 100).padStart(2, '0');
  const reaisComPontos = String(reais).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `R$ ${reaisComPontos},${resto}`;
}

// "+5561999999999" -> "(61) 99999-9999"; "+556133334444" -> "(61) 3333-4444".
export function formatarTelefone(telefone) {
  let digitos = String(telefone).replace(/\D/g, '');
  if (digitos.startsWith('55') && digitos.length > 11) digitos = digitos.slice(2);
  const ddd = digitos.slice(0, 2);
  const numero = digitos.slice(2);
  const corte = numero.length === 9 ? 5 : 4;
  return `(${ddd}) ${numero.slice(0, corte)}-${numero.slice(corte)}`;
}
