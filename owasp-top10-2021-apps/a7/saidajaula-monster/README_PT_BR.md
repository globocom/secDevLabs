# Saidajaula Monster Fit

<p align="center">
    <img src="images/img1.png"/>
    <a href="README.md"><img height="24" title="Access content in English" src="https://img.shields.io/badge/Access%20content%20in-English-blue"/></a>
</p>

Saidajaula Monstro Fit é uma API Flask criada para demonstrar como um usuário mal-intencionado pode explorar uma vulnerabilidade de falha de identidade e autenticação e aumentar seus privilégios. 

## Index

- [Saidajaula Monster Fit](#saidajaula-monster-fit)
  - [Index](#index)
  - [O que é falha de identidade e autenticação?](#o-que-é-falha-de-identidade-e-autenticação)
  - [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
  - [Conheça o app 🏋️‍](#conheça-o-app-️)
  - [Narrativa de ataque](#narrativa-de-ataque)
  - [Proteger este aplicativo](#proteger-este-aplicativo)
  - [PR Soluções](#pr-soluções)
  - [Contribuição](#contribuição)

## O que é falha de identidade e autenticação?

As funções do aplicativo relacionadas à autenticação e ao gerenciamento de sessão geralmente são implementadas incorretamente, permitindo que invasores comprometam senhas, chaves ou tokens de sessão ou explorem outras falhas de implementação para assumir a identidade de outros usuários temporária ou permanentemente.

O principal objetivo deste aplicativo é discutir como as vulnerabilidades de **falha de identidade e autenticação** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações de pull do secDevLabs sobre como mitigar essas falhas.

## Como inicializar o aplicativo?

Para iniciar este aplicativo **intencionalmente inseguro**, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a7/saidajaula-monster
```

```sh
make install
```

Depois é só visitar [localhost:10002][app] ! 😆

## Conheça o app 🏋️‍

Para entender corretamente como esse aplicativo funciona, você pode seguir estes passos simples:

- Visite a página inicial!
- Tente se registrar como um novo usuário.

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### 👀

#### A validação de cookie de sessão insegura permite o escalonamento de privilégios

É possível acessar a aplicação web do servidor através da porta HTTP 10002, como podemos ver na imagem abaixo:

<p align="center">
    <img src="images/img1.png"/>
</p>

Podemos se inscrever para uma nova conta clicando no botão 'INSCREVA-SE' no canto superior direito. Em seguida, somos redirecionados para a página `/register`. Como mostra a imagem abaixo: 

<p align="center">
    <img src="images/attack1.png"/>
</p>

Após criar uma conta, somos redirecionados para a página `/login` e, para entender melhor como a aplicação está tratando as requisições, iremos realizar o login utilizando o seguinte comando `curl`. Como mostra a imagem:

```sh
curl -i -L localhost:10002/login -F "username=daniel" -F "password=daniel" -X POST
```

<p align="center">
    <img src="images/attack2.png"/>
</p>

Como podemos ver na imagem acima, o aplicativo define um cookie para o usuário, `sessionId`. Ao examinar melhor este cookie, descobrimos que ele é codificado em base64 e seu conteúdo é o seguinte: 

<p align="center">
    <img src="images/attack3.png"/>
</p>

Agora, dando uma olhada no código do aplicativo, é possível ver que todas as informações para gerar este cookie são conhecidas por qualquer usuário, conforme mostra a imagem a seguir:

<p align="center">
    <img src="images/attack4.png"/>
</p>

### 🔥

Sabendo como o cookie está sendo gerado, um usuário mal-intencionado pode criar o seu próprio para ter acesso a páginas que ele não deveria ter. Um invasor pode obter privilégios de administrador alterando o campo `permission` do cookie, conforme ilustrado na imagem abaixo: 

<p align="center">
    <img src="images/attack5.png"/>
</p>

Também é possível gerar este cookie a partir do terminal usando o comando `shasum`: 

```sh
echo -n '{"permissao": 1, "username": "daniel"}' | shasum -a 256
```

Depois disso, o invasor precisa concatenar os campos do cookie e o hash, separados por um ponto. Como mostra a imagem a seguir:

<p align="center">
    <img src="images/attack6.png"/>
</p>

O servidor espera que o cookie esteja no formato base64, portanto, o invasor precisa codificar seu cookie. Como podemos ver na imagem abaixo usando o comando:

```sh
echo -n '{"permissao": 1, "username": "daniel"}.35771d6998cf216aa3297d1fb54462e04d85443be6092a02961b52b24c2d3250' | base64
```

<p align="center">
    <img src="images/attack7.png"/>
</p>

Agora, tudo o que um invasor precisa fazer é tentar acessar apenas a página `/admin`. Como mostra a imagem abaixo:

```sh
curl -v --cookie "sessionId=eyJwZXJtaXNzYW8iOiAxLCAidXNlcm5hbWUiOiAiZGFuaWVsIn0uMzU3NzFkNjk5OGNmMjE2YWEzMjk3ZDFmYjU0NDYyZTA0ZDg1NDQzYmU2MDkyYTAyOTYxYjUyYjI0YzJkMzI1MA==" http://localhost:10002/admin
```

<p align="center">
    <img src="images/attack8.png"/>
</p>

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Faça login como administrador ou qualquer outro usuário, em vez de ele mesmo, modificando o cookie de sessão.

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [esses pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Saidajaula+Monster+Fit%22)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10002
[dirb]: https://tools.kali.org/web-applications/dirb
[secdevlabs]: https://github.com/globocom/secDevLabs
