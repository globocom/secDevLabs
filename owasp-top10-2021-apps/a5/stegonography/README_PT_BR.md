# Stegonography

<p align="center">
    <img src="images/stegonography.png"/></br>
    <a href="README.md"><img height="24" title="Access content in English" src="https://img.shields.io/badge/Access%20content%20in-English-blue"/></a>
</p>

Stegonography é um aplicativo web Node.js que usa uma API e um front-end simples para simular um aplicativo de esteganografia real. Ele é construído com duas rotas principais, é home( `/` ) e (`/login`), onde o administrador realizar login para fazer alterações na página. 

## Index

- [Definição](#o-que-é-configuração-insegura)
- [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
- [Narrativa de ataque](#narrativa-de-ataque)
- [Objetivos](#proteger-este-aplicativo)
- [Soluções](#pr-soluções)
- [Contribuição](#contribuição)

## O que é Configuração Insegura? 

A configuração insegura de segurança pode ocorrer em qualquer nível de um aplicativos, incluindo serviços de rede, plataforma, servidor web, servidor de aplicativos, banco de dados, estruturas, código personalizado e máquinas virtuais pré-instaladas, contêineres ou armazenamento. Os scanners automatizados são úteis para detectar configurações incorretas, uso de contas ou configurações padrão, serviços desnecessários, opções herdadas, etc.

O objetivo principal deste aplicativo é discutir como as vulnerabilidades de **Configuração Insegura** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações de pull do **secDevLabs** sobre como mitigar essas falhas.

## Como inicializar o aplicativo?

Para iniciar este **aplicativo inseguro** intencionalmente, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a5/stegonography
```

```sh
make install
```

Depois é só visitar [localhost:10006][app] ! 😆

## Conheça o app 🦕

Para entender corretamente como esse aplicativo funciona, você pode seguir estes passos simples:

- Ocultar uma mensagem em uma imagem.
- Descriptografar a mensagem desta imagem.
- Tente usar uma senha para proteger melhor sua imagem!

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### 👀

#### Os erros detalhados são enviados para os usuários finais

Um invasor, ao tentar enumerar as páginas disponíveis no aplicativo, pode encontrar os detalhes de erro com informações potencialmente confidenciais que podem comprometer o aplicativo. Um exemplo de um de erro detalhado é mostrado na imagem abaixo:

<p align="center">
    <img src="images/stack_trace.png"/>
</p>

### 👀

#### O nome de usuário e as senhas padrões estão sendo usados

Usando [Dirb] com sua lista de palavras padrão, `common.txt`, para enumerar as páginas existentes na aplicação e ocultar o "Não encontrado" com o sinalizador `-N 401`, é possível encontrar o que parece ser uma página de login, conforme apontado na imagem abaixo: 

```sh
dirb http://localhost:10006 -N 401
```

<p align="center">
    <img src="images/dirb_result.png"/>
</p>

Ao visitar `http://localhost:10006/login` chegamos à seguinte tela:

<p align="center">
    <img src="images/login_page.png"/>
</p>

### 🔥

Um rápido palpite de `admin:admin` revelou que podemos fazer login com sucesso no aplicativo e acessar o painel de controle do administrador, conforme mostrado na imagem abaixo:

<p align="center">
    <img src="images/admin_page.png"/>
</p>

### 👀

#### O token de sessão detalhado fornece informações desnecessárias

Após fazer login na aplicação, é possível ver que ela define um token de sessão: `nodejsSessionToken`. Como mostra a imagem a seguir:

<p align="center">
    <img src="images/token.png"/>
</p>

### 🔥

Observando o nome do token, obtemos uma forte indicação de que o aplicativo pode estar executando o NodeJS. Ao usar o `searchsploit`, um invasor pode encontrar um código malicioso para explorar uma vulnerabilidade do NodeJS.

Para instalar esta ferramenta, basta digitar o seguinte no seu terminal OSX:

```sh
⚠️ 'O próximo comando irá instalar vários códigos de exploração em seu sistema e muitos deles podem acionar alertas de antivírus'

brew install exploitdb
```

Em seguida, basta procurar por "NodeJS":

```sh
searchsploit nodejs
```

<p align="center">
    <img src="images/available_exploits.png"/>
</p>

Embora ainda não saibamos qual versão do NodeJS está em execução no momento, obtivemos informações valiosas para nossa fase de enumeração. Quanto mais um invasor souber sobre o aplicativo que está sendo analisado, maiores serão as chances de explorá-lo. 

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Ver os erros detalhados
- Fazer login com credenciais padrão
- Ver nomes de token detalhados

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [these pull requests](https://github.com/globocom/secDevLabs/pulls?utf8=%E2%9C%93&q=is%3Aclosed+is%3Apr+label%3AA6-OWASP-2017+label%3AStegonography)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10006
[dirb]: https://tools.kali.org/web-applications/dirb
