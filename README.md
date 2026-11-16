# André Lanches — app mobile (React Native + Expo)

Modernização do site estático da lanchonete **André Lanches** (HTML e CSS para desktop) em um aplicativo Android/iOS feito com **React Native e Expo (JavaScript)**.

Atividade "Modernizando com React Native" da disciplina Programação para Dispositivos Móveis (IESB, ADS), Prof. Me. Bruno Assunção Dias.

## Funcionalidades

- **Lanches:** banner da promoção (X-Salada + Batata Frita por R$ 9,90) e cardápio com os 9 itens do site, com foto, descrição e preço em reais, filtrável por categoria.
- **Sobre Nós:** história, missão e diferenciais da lanchonete, e horário de funcionamento.
- **Contato:** formulário com Nome, E-mail ou WhatsApp e Mensagem, com validação e confirmação por `Alert.alert`; atalhos para ligar e para o WhatsApp.
- **Botão de entrega:** fixo na base de todas as telas; ao tocar, abre o discador do celular com `Linking.openURL('tel:+55...')`.

## Como executar

Pré-requisitos: Node.js LTS, Git e o app **Expo Go** no celular (SDK 58).

```bash
git clone https://github.com/Karina-RM/andre-lanches-app.git
cd andre-lanches-app
npm install
npx expo start
```

Escaneie o QR Code com a câmera do iPhone (ou com o Expo Go no Android). O celular e o computador precisam estar na mesma rede.

Outros comandos:

```bash
npm test                 # 30 testes automáticos (Jest + Testing Library)
npx expo start --web     # prévia no navegador
```

## Estrutura

```
App.jsx                       raiz: tela ativa (useState), SafeAreaView e composição
src/
  components/
    Header.jsx                logo + abas Lanches / Sobre Nós / Contato
    BannerPromocao.jsx        banner reutilizável (título, descrição e preço por props)
    ListaProdutos.jsx         cardápio em cartões, com filtro por categoria
    SobreNos.jsx              história, missão e diferenciais
    Contato.jsx               formulário com TextInput, validação e Alert
    EntregaFlutuante.jsx      botão fixo (position: 'absolute') que abre o discador
  data/
    produtos.js               cardápio (preços em centavos)
    loja.js                   telefone, promoção e horário
  theme/index.js              cores, espaçamentos, tipografia e sombra
  utils/
    formatar.js               preço em reais e telefone
    validarContato.js         regras do formulário
    aviso.js                  Alert, discagem e WhatsApp
__tests__/                    testes das regras e dos componentes
docs/
  planejamento.md             Parte 1: análise do site e planejamento mobile
  site-original/              index.html e estilo.css originais
```

## Do site estático para o app

| Site (HTML/CSS) | App (React Native) |
|---|---|
| Larguras fixas (700px) e `margin-left` negativo para centralizar | Flexbox, larguras flexíveis e layout em uma coluna |
| Menu com links para outras páginas | Abas com `TouchableOpacity`; a tela muda pelo estado (`useState`) |
| Tabela 3×3 de produtos | Cartões com imagem, descrição e preço formatado, e filtro por categoria |
| Banner com textos posicionados por `top`/`left` | `BannerPromocao` com props e camada escura para leitura |
| Bloco `position: fixed` com telefone de exemplo | `EntregaFlutuante` com `position: 'absolute'` acima da área segura, que disca de verdade |
| Sem "Sobre" e "Contato" | Telas novas, com texto próprio e formulário validado |
| Candara (inexistente no celular) | Fonte do sistema, com hierarquia por peso e tamanho |
| Sem acessibilidade | Papéis e rótulos de acessibilidade, áreas de toque de 44px ou mais |

## Tecnologias

Expo SDK 58 · React Native 0.88 · React 19.3 · react-native-safe-area-context · @expo/vector-icons · Jest (jest-expo) · Testing Library

## Equipe

| Integrante | GitHub |
|---|---|
| Isabela Damacena Fernandes de Sousa Quinta | [@IsinhaDx](https://github.com/IsinhaDx) |
| João Augusto Evangelista Neto | [@joaoaugustoneto](https://github.com/joaoaugustoneto) |
| Karina Ribeiro Modesto | [@Karina-RM](https://github.com/Karina-RM) |
| Natan Forte Sauer | [@natansauer](https://github.com/natansauer) |

Desenvolvido com apoio do Claude (Anthropic) na geração e revisão do código, nos testes e na documentação.
