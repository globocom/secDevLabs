# Vulnerable Wordpress Misconfig

[Access content in English](README.md)

<p align="center">
    <img src="images/banner.png"/>
</p>

Este é um aplicativo web simples do Wordpress que contém um exemplo de uma vulnerabilidade de configuração incorreta de segurança. Seu principal objetivo é descrever como um usuário mal-intencionado pode explorar várias vulnerabilidades de configuração instaladas intencionalmente no SecWeb.

## Index

- [Definição](#o-que-é-configuração-insegura)
- [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
- [Narrativa de ataque](#narrativa-de-ataque)
- [Objetivos](#proteger-este-aplicativo)
- [Soluções](#pr-soluções)
- [Contribuição](#contribuição)

## O que é Configuração Insegura? 

A configuração insegura de segurança pode ocorrer em qualquer nível de um aplicativos, incluindo serviços de rede, plataforma, servidor web, servidor de aplicativos, banco de dados, estruturas, código personalizado e máquinas virtuais pré-instaladas, contêineres ou armazenamento. Os scanners automatizados são úteis para detectar configurações incorretas, uso de contas ou configurações padrão, serviços desnecessários, opções herdadas, etc.

O objetivo principal deste aplicativo é discutir como as vulnerabilidades de **Configuração Insegura** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações de pull do **secDevLabs** sobre como mitigar essas falhas. Saiba mais <a href="https://owasp.org/www-community/attacks/xss/">aqui</a>.

## Como inicializar o aplicativo?

Para iniciar este **aplicativo inseguro** intencionalmente, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a5/misconfig-wordpress
```

```sh
make install
```

Depois é só visitar [localhost:8000][app] ! 😆

## Conheça o app  📄

Para entender corretamente como esse aplicativo funciona, você pode tentar:

- Visite a página inicial!

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### 👀

#### A mensagem de erro detalhada permite a enumeração do nome de usuário

É possível acessar o site pela porta HTTP 8000, como mostra a imagem abaixo:

<p align="center">
    <img src="images/banner.png"/>
</p>

Observando mais de perto o que está escrito abaixo do `SECWEB`, temos um sinal de que o site pode estar usando o CMS WordPress. Podemos confirmar essa suspeita tentando acessar a página `/wp-admin`. Como podemos ver na imagem abaixo, nossa suspeita se confirma:

 <p align="center">
    <img src="images/attack1.png"/>
</p>

Um invasor pode tentar fazer login com o nome de usuário: `admin` e perceber, através da mensagem de erro, que `admin` é um usuário válido, conforme ilustrado na imagem abaixo: 

 <p align="center">
    <img src="images/attack2.png"/>
</p>

### 🔥

Neste momento, um invasor pode usar o [Burp Suite](https://portswigger.net/burp) para realizar um ataque de força bruta usando esta [lista de palavras] (se precisar de ajuda para configurar seu proxy, verifique este [guia](https://support.portswigger.net/customer/portal/articles/1783066-configuring-firefox-to-work-with-burp)). Para isso, após encontrar a solicitação POST de login, clique com o botão direito e envie para o Intruder, conforme mostrado abaixo:

 <p align="center">
    <img src="images/attack10.png"/>
</p>

Na aba `Positions`, todos os campos devem ser limpos primeiro através do botão `Clear §`. Para configurar `pwd` para mudar de acordo com cada senha de nossa lista de palavras do dicionário, basta clicar no botão `Add §` após selecioná-lo:

 <p align="center">
    <img src="images/attack11.png"/>
</p>

Caso seja encontrada uma senha válida, o aplicativo pode processar novos cookies e eventualmente redirecionar o fluxo para outras páginas. Para garantir que o ataque de força bruta siga este comportamento, defina `Always` nas opções `Follow Redirections` na aba `Options`, conforme mostrado abaixo:

<p align="center">
    <img src="images/attack13.png"/>
</p>

Na aba `Payloads`, basta escolher a lista de palavras da opção `Load...` e então o ataque pode ser realizado através do botão `Start attack`:

 <p align="center">
    <img src="images/attack12.png"/>
</p>

Após enviar cerca de 200 solicitações para tentar obter uma senha de administrador válida, é possível ver na imagem abaixo que o aplicativo nos redirecionou quando a senha `password` foi usada, evidenciando assim que pode ser o `admin` senha.

 <p align="center">
    <img src="images/attack3.png"/>
</p>

A suspeita foi confirmada ao tentar fazer login com essas credenciais. Como mostrado abaixo:

 <p align="center">
    <img src="images/attack3.1.png"/>
</p>

---

### 👀

#### O WordPress desatualizado é vulnerável a uma exclusão de arquivo arbitrária autenticada

Agora que sabemos que estamos lidando com um WordPress, podemos usar a ferramenta [WPScan] para realizar uma varredura no aplicativo em busca de vulnerabilidades conhecidas. O seguinte comando pode ser usado para instalá-lo: 

```sh
brew install wpscan
```

E, em seguida, use este comando para iniciar uma nova varredura simples:

```sh
wpscan -u localhost:8000
```

 <p align="center">
    <img src="images/attack4.png"/>
</p>

### 🔥

Como visto na imagem acima, a ferramenta descobriu que a versão do CMS está desatualizada e vulnerável a uma exclusão de arquivo arbitrária autenticada. Ao usar a ferramenta [searchsploit], um invasor pode encontrar um [código malicioso] para explorar essa vulnerabilidade. 

Para instalar esta ferramenta, basta digitar o seguinte no seu terminal OSX:

```sh
⚠️ 'O próximo comando instalará vários códigos de exploração em seu sistema e muitos deles podem acionar alertas de antivírus'

brew install exploitdb
```

Em seguida, basta procurar a versão do CMS encontrada:

```sh
searchsploit wordpress 4.9.6
```

 <p align="center">
    <img src="images/attack5.png"/>
</p>

---

## 👀

#### A configuração incorreta de segurança permite um diretório navegável no servidor

Observando novamente os resultados do [WPScan], é possível ver que a ferramenta encontrou um diretório navegável no aplicativo: `/wp-content/uploads/`, como podemos ver na imagem abaixo: 

 <p align="center">
    <img src="images/attack6.png"/>
</p>

## 🔥

Podemos confirmar que o diretório é navegável acessando-o por meio de um navegador web, conforme mostra a imagem a seguir:

 <p align="center">
    <img src="images/attack7.png"/>
</p>

---

## 👀

#### Cabeçalhos mal configurados fornecem informações desnecessárias sobre o servidor

Usando a ferramenta [Nikto] para realizar uma verificação de segurança, é possível ver que existem vários pontos de atenção em relação aos cabeçalhos de segurança.

Para instalá-lo, você pode usar o seguinte comando no seu terminal OSX: 

```sh
brew install nikto
```

Em seguida, verifique o aplicativo da Web usando:

```sh
nikto -h http://localhost:8000/
```

 <p align="center">
    <img src="images/attack8.png"/>
</p>

Agora, fazendo o seguinte comando curl para verificar os cabeçalhos HTTP da aplicação, podemos confirmar que ele realmente expõe a versão do PHP instalada, conforme mostra a imagem abaixo:

 <p align="center">
    <img src="images/attack9.png"/>
</p>

---

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Ver mensagens de erro detalhadas
- Realizar login com credenciais padrão
- Ver tokens detalhados
- Encontrar uma versão desatualizada do CMS

Observação: neste aplicativo específico, devido à forma como ele funciona, você pode simplesmente anotar as alterações que faria para mitigar essas vulnerabilidades e enviá-las como uma solicitação pull. 

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Vuln+Wordpress+Misconfig%22)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:8000
[wordlist]: https://github.com/danielmiessler/SecLists/blob/master/Passwords/UserPassCombo-Jay.txt
[wpscan]: https://wpscan.org/
[malicious code]: https://www.exploit-db.com/exploits/44949
[nikto]: https://cirt.net/Nikto2
[searchsploit]: https://www.exploit-db.com/searchsploit
[secdevlabs]: https://github.com/globocom/secDevLabs
