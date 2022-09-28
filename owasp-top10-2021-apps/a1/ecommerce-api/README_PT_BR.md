# Vulnerable eCommerce API

[Access content in English](README.md)

<p align="center">
    <img src="images/a5-banner.png"/>
</p>

A API do Vulnerable eCommerce é um aplicativo web simples de Golang que contém um exemplo de vulnerabilidade de controle de acesso quebrado e seu principal objetivo é descrever como um usuário mal-intencionado pode explorá-lo.

## Index

- [Definição](#o-que-é-quebra-de-controle-de-acesso)
- [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
- [Narrativa de ataque](#narrativa-de-ataque)
- [Objetivos](#proteger-este-aplicativo)
- [Soluções](#pr-soluções)
- [Contribuição](#contribuição)

## O que é quebra de controle de acesso?

As restrições sobre o que os usuários autenticados podem fazer geralmente não são aplicadas corretamente.

Os invasores podem explorar essas falhas para acessar funcionalidades e/ou dados não autorizados, como acessar a contas de outros usuários, visualizar arquivos confidenciais, modificar dados de outros usuários, alterar direitos de acesso, etc.

O principal objetivo deste aplicativo é discutir como as vulnerabilidades do **Quebra de Controle de Acesso** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações pull no **SecDevLabs** sobre como eles corrigiriam essas falhas.

## Como inicializar o aplicativo?

Para iniciar este **aplicativo inseguro** intencionalmente, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a1/ecommerce-api
```

```sh
make install
```

Depois é só visitar [localhost:10005][app] ! 😆

## Conheça o app 💵

Para entender corretamente como esse aplicativo funciona, você pode seguir esse passo a passo:

- Registrar um usuário;
- Realizar um login.

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### 👀

#### A falta de validação do ID do usuário permite que um invasor obtenha tickets de outros usuários

Para entender melhor como essa API funciona, dois usuários, `user1` e `user2`, foram criados conforme mostrado abaixo:

Usando linha de comando:

```sh
curl -s -H "Content-Type: application/json" -d '{"username":"user1","password":"pass"}' http://localhost:10005/register
```

```sh
curl -s -H "Content-Type: application/json" -d '{"username":"user2","password":"pass"}' http://localhost:10005/register
```

<p align="center">
    <img src="images/attack0.png"/>
</p>

Ou usando a interface web:

<p align="center">
    <img src="images/attack1.png"/>
</p>

Os usuários criados acima são registrados no MongoDB e podemos obter seu `userID` através dos seguintes comandos curl:

```sh
curl -s -H "Content-Type: application/json" -d '{"username":"user1","password":"pass"}' http://localhost:10005/login
```

```sh
curl -s -H "Content-Type: application/json" -d '{"username":"user2","password":"pass"}' http://localhost:10005/login
```

<p align="center">
    <img src="images/attack2.png"/>
</p>

Isso também pode ser observado através da interface web. Na interface web é possível verificar que após o preenchimento do formulário de login, são feitas duas requisições à API.

<p align="center">
    <img src="images/attack3.png"/>
</p>

### 🔥

Tendo ambos `userID`, podemos verificar que a rota "`GET /ticket/:userID`" não verifica se a requisição foi feita pelo mesmo usuário ou por outra pessoa sem a devida permissão, conforme mostra a imagem:

```sh
curl -vvv http://localhost:10005/ticket/GUID
```

<p align="center">
    <img src="images/attack4.png"/>
</p>

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Acessar os tickets de outros usuários.

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Vulnerable+Ecommerce+API%22)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10005
[secdevlabs]: https://github.com/globocom/secDevLabs
[2]: https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2017-apps/a5/ecommerce-api
