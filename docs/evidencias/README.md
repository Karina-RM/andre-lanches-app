# Evidências do teste no aparelho

Teste feito em 16/11/2026, no iPhone, com o Expo Go (SDK 58) e o servidor do `npx expo start` rodando no Mac. As capturas estão em `iphone/`, na ordem do teste, com metade da resolução original. O vídeo da navegação foi entregue no Classroom.

O botão azul de engrenagem no canto superior direito é o menu de desenvolvedor do Expo Go. Ele não faz parte do aplicativo.

| # | Captura | O que comprova | Resultado |
|---|---|---|---|
| 1 | `01-lanches-versao-inicial-xburguer-1-50.png` | Primeira execução: cabeçalho, abas, banner da promoção e cardápio. O X-Burguer ainda com o preço do site (R$ 1,50) | Aprovado; o preço foi corrigido depois |
| 2 | `02-lanches-fim-da-lista.png` | Rolagem até o último item; o botão de entrega não cobre o card de Sucos | Aprovado |
| 3 | `03-filtro-lanches-xburguer-11-50.png` | Filtro "Lanches" e X-Burguer com o preço corrigido (R$ 11,50) | Aprovado |
| 4 | `04-filtro-acompanhamentos.png` | Filtro "Acompanhamentos": Batata Frita e Nuggets | Aprovado |
| 5 | `05-filtro-bebidas.png` | Filtro "Bebidas": Refri e Sucos | Aprovado |
| 6–7 | `06-sobre-nos-topo.png`, `07-sobre-nos-fim.png` | Tela Sobre Nós: história, missão, diferenciais e horário | Aprovado |
| 8 | `08-contato-vazio.png` | Tela Contato com o formulário vazio e os atalhos Ligar e WhatsApp | Aprovado |
| 9 | `09-contato-erros-todos-os-campos.png` | Envio vazio: erro sob os três campos | Aprovado |
| 10 | `10-contato-erros-contato-e-mensagem.png` | O erro do nome some ao preenchê-lo | Aprovado |
| 11 | `11-contato-email-invalido.png` | "teste" recusado: "Use um e-mail válido ou um WhatsApp com DDD." | Aprovado |
| 12 | `12-contato-mensagem-curta.png` | Mensagem com menos de 10 caracteres recusada | Aprovado |
| 13 | `13-contato-alert-mensagem-enviada.png` | `Alert.alert` com o primeiro nome e o contato; formulário limpo | Aprovado |
| 14 | `14-discagem-confirmacao-ios.png` | Botão de entrega: `Linking.openURL('tel:...')` abre a confirmação de chamada do iOS | Aprovado |
| 15 | `15-discagem-chamando.png` | Chamada iniciada pelo app | Aprovado |
| 16 | `16-whatsapp-mensagem-pronta.png` | Atalho WhatsApp abre a conversa com a mensagem pronta | Aprovado |

O número exibido é fictício, (61) 99999-9999. A discagem também foi testada com o número real de uma integrante, que não foi publicado.
