# Streaming

<p align="center">
    <img src="images/banner.png"/></br>
    <a href="README.md"><img height="24" title="Access content in English" src="https://img.shields.io/badge/Access%20content%20in-English-blue"/></a>
</p>

Streaming é um aplicativo Angular/Spring Boot que contém um exemplo de várias vulnerabilidades de injeção (XSS) e seu principal objetivo é descrever como um usuário mal-intencionado pode explorá-los nesse aplicativo propositalmente vulnerável.

## Index

- [Streaming](#streaming)
  - [Index](#index)
  - [O que é Cross Site Scripting?](#o-que-é-cross-site-scripting)
  - [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
  - [Conheça o app 💵](#conheça-o-app-)
  - [Narrativa de ataque](#narrativa-de-ataque)
    - [Uma página ou aplicativo da Web é vulnerável ao XSS  se a entrada do usuário permitir scripts.](#uma-página-ou-aplicativo-da-web-é-vulnerável-ao-xss--se-a-entrada-do-usuário-permitir-scripts)
    - [👀](#)
    - [🔥](#-1)
  - [Proteger este aplicativo](#proteger-este-aplicativo)
  - [PR Soluções](#pr-soluções)
  - [Contribuição](#contribuição)

## O que é Cross Site Scripting?

As falhas de XSS ocorrem sempre que um aplicativo inclui dados não confiáveis em uma nova página da Web sem validação, escape adequados, ou atualiza uma página da Web existente com dados fornecidos pelo usuário usando uma API do navegador que pode criar HTML ou JavaScript. 

O XSS permite que os invasores executem scripts no navegador da vítima que podem sequestrar sessões do usuário, desfigurar sites ou redirecionar o usuário para sites maliciosos.

O objetivo principal deste aplicativo é discutir como as vulnerabilidades de **Cross-Site Scripting** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações de pull do **secDevLabs** sobre como mitigar essas falhas. Saiba mais <a href="https://owasp.org/www-community/attacks/xss/">aqui</a>.

## Como inicializar o aplicativo?

Para iniciar este **aplicativo inseguro** intencionalmente, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a3/streaming
```

```sh
make install
```

Depois é só visitar [localhost:10007][app] ! 😆

## Conheça o app 💵

Ao acessar o aplicativo de Streaming, você será identificado como usuário anônimo para assistir a uma stream nos canais de usuários cadastrados e interagir com outros usuários (ou o canal master) por meio de mensagens no chat.

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### Uma página ou aplicativo da Web é vulnerável ao XSS  se a entrada do usuário permitir scripts.

### 👀

Depois de revisar `buildLiveHTMLMessage(message)` de [`play.component.ts`](<(https://github.com/globocom/secDevLabs/blob/master/owasp-top10-2021-apps/a3/streaming/app /frontend/src/app/lives/play/play.component.ts#)>), foi possível identificar que as mensagens carregadas e o nome de usuário estão permitindo scripts e podem ser executados em um navegador web (conforme mostrado na mensagem abaixo ).

<p align="center">
    <img src="images/vulnerable-function.png"/>
</p>

As imagens a seguir mostram esse comportamento quando o texto a seguir é usado como entrada nesses campos:

```
<b><i>Hi</i></b>
```

Adicionando uma nova mensagem no chat:

   <p align="center">
     <img src="images/attack-1.png"/>
   </p>

   <p align="center">
     <img src="images/attack-2.png"/>
   </p>

A validação da mensagem ausente (que será carregada por outros usuários) permite que um usuário mal-intencionado insira alguns scripts que persistirão no servidor e serão executados no navegador das vítimas sempre que acessarem as rotas que contêm esses scripts.

### 🔥

Um invasor pode abusar dessas falhas gerando um código HTML/JS malicioso e enviando-o para outros usuários. Para demonstrar isso, o exemplo de código a seguir redirecionará todos os usuários que estão assistindo o canal para outro canal.

```html
<img
  src="wrongImage.png"
  onError="window.location.href='http://localhost:10007/play/@mr.robot'"
/>
```

Este código redireciona todos os usuários para outra página, neste caso é a rota **/play/@mr.robot**.

Quando a mensagem é carregada pela vítima, o navegador a lê e tenta carregar a imagem, porém, o caminho é inválido. Posteriormente, a função JavaScript `window.location.href` será executada.

O gif a seguir mostra o invasor enviando o código malicioso para redirecionar as vítimas (que estão assistindo **@matthewpets** ao vivo) para a rota **/play/@mr.robot**:

<p align="center">
  <img src="images/attack-3.gif"/>
</p>

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Executar scripts por meio de campos de entrada

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Streaming%22)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10007
[secdevlabs]: https://github.com/globocom/secDevLabs
