// Cardápio extraído do site original (index.html). Os preços estão em
// centavos para evitar erros de ponto flutuante na formatação.
// As descrições foram escritas para o app; o site só tinha nome e preço.

export const CATEGORIAS = ['Todos', 'Lanches', 'Acompanhamentos', 'Bebidas'];

export const PRODUTOS = [
  {
    id: 'x-salada',
    nome: 'X-Salada',
    descricao: 'Hambúrguer, queijo, alface, tomate e maionese da casa no pão com gergelim.',
    precoCentavos: 800,
    categoria: 'Lanches',
    imagem: require('../../assets/images/xsalada.jpg'),
  },
  {
    id: 'cheddar',
    nome: 'Cheddar',
    descricao: 'Carne grelhada, muito cheddar cremoso, bacon e cebola caramelizada.',
    precoCentavos: 1700,
    categoria: 'Lanches',
    imagem: require('../../assets/images/cheddar.jpg'),
  },
  {
    id: 'x-burguer',
    nome: 'X-Burguer',
    descricao: 'O clássico: hambúrguer, queijo derretido e molho especial.',
    precoCentavos: 150,
    categoria: 'Lanches',
    imagem: require('../../assets/images/cheese.jpg'),
  },
  {
    id: 'big-tower',
    nome: 'Big Tower',
    descricao: 'Duas carnes, dois queijos, anéis de cebola e molho barbecue. Para quem tem fome.',
    precoCentavos: 2050,
    categoria: 'Lanches',
    imagem: require('../../assets/images/bigtower.jpg'),
  },
  {
    id: 'x-frango',
    nome: 'X-Frango',
    descricao: 'Filé de frango empanado, requeijão cremoso e cebola refogada.',
    precoCentavos: 1290,
    categoria: 'Lanches',
    imagem: require('../../assets/images/frangorequeijao.jpg'),
  },
  {
    id: 'batata-frita',
    nome: 'Batata Frita',
    descricao: 'Porção de batata sequinha e crocante, com sal na medida.',
    precoCentavos: 700,
    categoria: 'Acompanhamentos',
    imagem: require('../../assets/images/batata.jpg'),
  },
  {
    id: 'nuggets',
    nome: 'Nuggets (c/ 8)',
    descricao: 'Oito nuggets de frango dourados, acompanhados de molho à escolha.',
    precoCentavos: 650,
    categoria: 'Acompanhamentos',
    imagem: require('../../assets/images/nuggets.jpg'),
  },
  {
    id: 'refri-lata',
    nome: 'Refri (Lata)',
    descricao: 'Refrigerante em lata de 350 ml, bem gelado.',
    precoCentavos: 450,
    categoria: 'Bebidas',
    imagem: require('../../assets/images/refri.jpg'),
  },
  {
    id: 'sucos',
    nome: 'Sucos (Vários Sabores)',
    descricao: 'Suco natural de 500 ml: laranja, maçã, maracujá ou abacaxi com hortelã.',
    precoCentavos: 850,
    categoria: 'Bebidas',
    imagem: require('../../assets/images/sucos.jpg'),
  },
];

export function filtrarPorCategoria(produtos, categoria) {
  if (!categoria || categoria === 'Todos') return produtos;
  return produtos.filter((p) => p.categoria === categoria);
}
