# Parte 1 – Análise do site estático e prototipação mobile

## 1. O que existe no site original (`docs/site-original/`)

| Item | No site (`index.html` + `estilo.css`) |
|---|---|
| Identidade | Logo de hambúrguer (100×100) + título "André Lanches" em vermelho, 50px |
| Cores | Vermelho `#e50021` (títulos, menu, bordas), amarelo `#ffe18c` (fundo), branco (conteúdo) |
| Fonte | Candara, Helvetica, sans-serif |
| Menu | Barra vermelha com "Sobre Nós", "Lanches" (atual, em maiúsculas) e "Contato"; hover branco |
| Promoção | Banner 700×200 com `promocao.jpg`: "Promoção!" e "X-Salada + Batata = 9,90" |
| Cardápio | Tabela 3×3, imagens redondas com borda vermelha, nome em negrito e preço |
| Entrega | Bloco fixo no canto inferior direito: ícone de telefone, "(11) 1111-1111", "Entregamos na sua casa!" |

### Cardápio extraído

| Produto (site) | Imagem | Preço |
|---|---|---|
| X-Salada | `xsalada.jpg` | R$ 8,00 |
| Cheddar | `cheddar.jpg` | R$ 17,00 |
| Bata Frita | `batata.jpg` | R$ 7,00 |
| X-Burguer | `cheese.jpg` | R$ 1,50 |
| Big Tower | `bigtower.jpg` | R$ 20,50 |
| X-Frango | `fragonrequeijao.jpg` | R$ 12,90 |
| Nuggets (c/ 8) | `nuggets.jpg` | R$ 6,50 |
| Refri (Lata) | `refri.jpg` | R$ 4,50 |
| Sucos (Vários Sabores) | `sucos.jpg` | R$ 8,50 |

### Problemas encontrados no original

- "Bata Frita" → corrigido para **Batata Frita**.
- Arquivo `fragonrequeijao.jpg` → renomeado para `frangorequeijao.jpg`.
- `<h2 id="promocaoValor">` fechado com `</h1>`; `<html>` e `lang` ausentes.
- Imagens sem `alt` (sem acessibilidade).
- Layout com larguras fixas (700px, `margin-left` negativo): não cabe numa tela de celular.
- Telefone de exemplo `(11) 1111-1111`, que não disca para ninguém.
- X-Burguer a R$ 1,50 destoa dos demais preços; mantido como está no site até confirmação.
- Os links "Sobre Nós" e "Contato" apontam para páginas que não vieram no material.

## 2. Adaptação para o smartphone (fluxo vertical)

```
┌──────────────────────────────┐
│ [logo] André Lanches         │  Header (vermelho)
│ [Lanches][Sobre Nós][Contato]│  abas padronizadas (TouchableOpacity)
├──────────────────────────────┤
│  ┌────────────────────────┐  │
│  │ PROMOÇÃO!  foto fundo  │  │  BannerPromocao (props)
│  │ X-Salada + Batata      │  │
│  │            [R$ 9,90]   │  │
│  └────────────────────────┘  │
│  Nossos Lanches              │
│  (Todos)(Lanches)(Bebidas)…  │  filtro por categoria
│  ┌────────────────────────┐  │
│  │ (foto) X-Salada        │  │  ListaProdutos (cartões)
│  │        descrição       │  │
│  │        R$ 8,00         │  │
│  └────────────────────────┘  │
│            ⋮                 │
│      ┌──────────────────┐    │
│      │ 📞 Peça agora    │    │  EntregaFlutuante (absolute)
│      └──────────────────┘    │
└──────────────────────────────┘
```

- **Cabeçalho:** logo reduzida (40px) no topo esquerdo, nome ao lado; abaixo, três abas do mesmo tamanho. A aba ativa fica branca com texto vermelho, reaproveitando o efeito de hover do site.
- **Navegação:** estado (`useState`) no `App.jsx`, sem biblioteca de rotas, como pede o roteiro.
- **Cardápio:** cartões em uma coluna (imagem redonda à esquerda, como no site), com nome, descrição curta e preço formatado em reais.
- **Botão de entrega:** fixo na base, acima da área segura do iPhone; o conteúdo ganha espaço inferior para o botão não cobrir o último item.

## 3. Identidade visual adaptada

| Papel | Cor |
|---|---|
| Primária (marca) | `#E50021` |
| Primária escura (pressionado, sombras) | `#B0001A` |
| Fundo da tela | `#FFE18C` (amarelo do site) |
| Superfície (cartões) | `#FFFFFF` |
| Fundo suave (destaques) | `#FFF4D1` |
| Texto principal | `#2B1A12` |
| Texto secundário | `#6B5A4E` |

- Tipografia: fonte do sistema (San Francisco no iOS, Roboto no Android), porque Candara não existe nos celulares. Hierarquia por peso e tamanho: 22 (títulos), 17 (nomes), 15 (texto), 13 (legendas).
- Espaçamentos em múltiplos de 4; cantos arredondados (12–16); sombra no iOS (`shadow*`) e `elevation` no Android.
- Áreas de toque com pelo menos 44px de altura.

## 4. Texto da tela "Sobre Nós"

**Nossa história.** O André Lanches nasceu em 2012, num trailer de esquina, com uma chapa, uma receita de molho da família e muita vontade de servir bem. O André atendia, fritava e entregava de bicicleta. A fila foi crescendo, os vizinhos viraram clientes fiéis e o trailer virou lanchonete, mas a chapa continua a mesma.

**Missão.** Servir lanches caprichados, feitos na hora, com preço justo e atendimento de quem conhece o cliente pelo nome.

**Diferenciais.**
- Pão de brioche assado todos os dias.
- Carne moída na casa, 100% bovina.
- Molho especial da família, receita guardada desde o trailer.
- Entrega rápida no bairro, com o lanche ainda quente.

## 5. Telefone para a discagem nativa

Definido em `src/data/loja.js` (constante `TELEFONE`), usado pelo `EntregaFlutuante` e pela tela de Contato com `Linking.openURL('tel:+55...')`.

## 6. Formulário de contato

| Campo | Componente | Validação |
|---|---|---|
| Nome | `TextInput` (`autoCapitalize="words"`) | Obrigatório, pelo menos 2 letras |
| E-mail ou WhatsApp | `TextInput` (`keyboardType="email-address"`) | E-mail válido ou telefone com DDD (10 ou 11 dígitos) |
| Mensagem | `TextInput` (`multiline`) | Obrigatória, pelo menos 10 caracteres |

Ao enviar: mensagens de erro sob cada campo inválido; se tudo estiver certo, `Alert.alert` confirma o recebimento com o nome da pessoa e o formulário é limpo.
