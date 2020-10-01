<p align="center">
  <img src="images/secDevLabs-logo.png" allign="center" height=""/>
  <!-- logo font: Agency FB Bold Condensed -->
</p>

<p align="center">
Um laboratório para aprender secure web e desenvolvimento mobile de maneira prática.
</p>

<p align="center">
<a href="https://github.com/globocom/secDevLabs/blob/master/docs/CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-Welcome-brightgreen"/></a>
<a href="https://gitter.im/secDevLabs/community"><img src="https://badges.gitter.im/secDevLabs/community.svg"/></a>
</p>

## Construa seu laboratório

Ao provisionar ambientes locais via docker-compose, você aprenderá como os riscos de segurança de aplicativos da Web mais críticos são explorados e como esses códigos vulneráveis podem ser corrigidos para mitigá-los. 👩‍💻

## Como eu começo?

Depois de fazer um fork neste repositório, você encontrará vários aplicativos intencionalmente vulneráveis com base em cenários da vida real em várias linguagens como Golang, Python e PHP. Um bom começo seria instalar aqueles com os quais você está mais familiarizado. Você pode encontrar instruções para fazer isso em cada um dos aplicativos. 💡

Cada um deles possui uma seção `Narrativa de ataque` que descreve como um invasor exploraria a vulnerabilidade correspondente. Antes de ler qualquer código, pode ser uma boa ideia seguir estas etapas para que você possa entender melhor o ataque em si. 💉

Agora é hora de proteger o aplicativo! Imagine que este é o seu aplicativo e você precisa consertar essas falhas! Sua missão é escrever novos códigos que os amenizem e enviar um novo Pull Request para implantar um aplicativo seguro! 🔐

## Quão seguro é meu novo código?

Depois de mitigar uma vulnerabilidade, você pode enviar uma solicitação pull para pedir gentilmente à comunidade secDevLabs para revisar seus novos códigos seguros. Se você estiver se sentindo um pouco perdido, tente dar uma olhada [nesta solução de mitigação](https://github.com/globocom/secDevLabs/pull/29), isto pode ajudar! 🚀

## OWASP Top 10 aplicativos (2017): 💻

Isenção de responsabilidade: você está prestes a instalar aplicativos vulneráveis em sua máquina! 🔥

| Vulnerabilidade | Linguagem | Aplicação |
| --- | --- | --- |
| A1 - Injeção | Golang | [CopyNPaste API](owasp-top10-2017-apps/a1/copy-n-paste) |
| A1 - Injeção | NodeJS | [Mongection](owasp-top10-2017-apps/a1/mongection) |
| A1 - Injeção | Python | [SSType](owasp-top10-2017-apps/a1/sstype) |
| A2 - Quebra de Autenticação | Python | [Saidajaula Monster Fit](owasp-top10-2017-apps/a2/saidajaula-monster) |
| A2 - Quebra de Autenticação | Golang | [Insecure go project](owasp-top10-2017-apps/a2/insecure-go-project) |
| A3 - Exposição de Dados Sensíveis | Golang | [SnakePro](owasp-top10-2017-apps/a3/snake-pro)|
| A4 - Entidades Externas XML (XXE) | PHP | [ViniJr Blog](owasp-top10-2017-apps/a4/vinijr-blog) |
| A5 - Quebra de Controle de Acesso | Golang | [Vulnerable Ecommerce API](owasp-top10-2017-apps/a5/ecommerce-api) |
| A5 - Quebra de Controle de Acesso | NodeJS | [Tic-Tac-Toe](owasp-top10-2017-apps/a5/tictactoe) |
| A6 - Configuração Incorreta de Segurança | PHP | [Vulnerable Wordpress Misconfig](owasp-top10-2017-apps/a6/misconfig-wordpress) |
| A6 - Configuração Incorreta de Segurança | NodeJS | [Stegonography](owasp-top10-2017-apps/a6/stegonography) |
| A7 - Cross-Site Scripting (XSS) | Python | [Gossip World](owasp-top10-2017-apps/a7/gossip-world) |
| A8 - Desserialização Insegura | Python | [Amarelo Designs](owasp-top10-2017-apps/a8/amarelo-designs) |
| A9 - Usando Componentes Com Vulnerabilidades Conhecidas | PHP | [Cimentech](owasp-top10-2017-apps/a9/cimentech) |
| A10 - Logs & Monitoramentos Insuficientes | Python | [GamesIrados.com](owasp-top10-2017-apps/a10/games-irados) |

## OWASP Top 10 aplicativos Mobile (2016): 📲

Isenção de responsabilidade: você está prestes a instalar aplicativos móveis vulneráveis em sua máquina! 🔥

| Vulnerabilidade | Linguagem | Aplicação |
| --- | --- | --- |
| M2 - Armazenamento de Dados Inseguro | Dart/Flutter | [Cool Games](owasp-top10-2016-mobile/m2/cool_games) |
| M4 - Autenticação Insegura | Dart/Flutter | [Note Box](owasp-top10-2016-mobile/m4/note-box) |
| M5 - Criptografia Insuficiente | Dart/Flutter | [Panda Zap](owasp-top10-2016-mobile/m5/panda_zap) |

## Contribuindo
Nós encorajamos você a contribuir com o SecDevLabs! Verifique a seção [Contribuindo com o SecDevLabs](/docs/CONTRIBUTING.md) para orientações sobre como proceder! 🎉

## Licença

Este projeto está licenciado sob a licença BSD 3-Clause "Nova" ou "Revisada" - leia o arquivo [LICENSE.md](LICENSE.md) para detalhes. 📖

*Este artigo foi traduzido do [Inglês](README.md) para o [Português (Brasil)](README-pt-BR.md).*
