# Snake Pro

[Access content in English](README.md)

<p align="center">
    <img src="images/banner.png"/>
</p>

O Snake Pro é um Golang Web App simples que contém um exemplo de vulnerabilidade de falha criptográfica e seu principal objetivo é descrever como um usuário mal-intencionado pode explorá-lo.

## Index

- [Definição](#o-que-é-falha-na-criptográfia)
- [Como inicializar o aplicativo?](#como-inicializar-o-aplicativo)
- [Narrativa de ataque](#narrativa-de-ataque)
- [Objetivos](#proteger-este-aplicativo)
- [Soluções](#pr-soluções)
- [Contribuição](#contribuição)

## O que é falha na criptográfia? 

Muitos aplicativos da Web e APIs não protegem adequadamente dados confidenciais, como financeiros, de saúde e senhas. Os invasores podem roubar ou modificar esses dados pouco protegidos para conduzir fraudes de cartão de crédito, roubo de identidade ou outros crimes. Dados confidenciais podem ser comprometidos sem proteção extra, como criptografia em repouso ou em trânsito, e requerem precauções especiais quando trocados com o navegador.

O principal objetivo deste aplicativo é discutir como as vulnerabilidades do **Falha na Criptográfia** podem ser exploradas e incentivar os desenvolvedores a enviar solicitações pull no **SecDevLabs** sobre como eles corrigiriam essas falhas.

## Como inicializar o aplicativo?

Para iniciar este **aplicativo inseguro** intencionalmente, você precisará do [Docker][Docker Install] e do [Docker Compose][Docker Compose Install]. Depois de clonar o repositório [secDevLabs](https://github.com/globocom/secDevLabs), no seu computador, você deve digitar os seguintes comandos para iniciar o aplicativo:

```sh
cd secDevLabs/owasp-top10-2021-apps/a2/snake-pro
```

```sh
make install
```

Depois é só visitar [localhost:10003][app] ! 😆

## Conheça o app 💵

Para entender corretamente como esse aplicativo funciona, você pode seguir esse passo a passo:

- Registre-se como um novo usuário!
- Tente bater o nosso recorde! 😝

## Narrativa de ataque

Agora que você conhece o propósito deste aplicativo, o que pode dar errado? A seção a seguir descreve como um invasor pode identificar e, eventualmente, encontrar informações confidenciais sobre o aplicativo ou seus usuários. Recomendamos que você siga estas etapas e tente reproduzi-las por conta própria para entender melhor o ataque! 😜

### 👀

#### A falta de criptografia ao transmitir senhas de texto simples permite um ataque man-in-the-middle

Após revisar como a aplicação armazena as senhas dos usuários no MongoDB, foi possível ver que dados sensíveis estão sendo armazenados em textos não criptografados, como pode ser visto na função `Register()`(routes.go) e na estrutura em `UserData`(types.go): 

<p align="center">
    <img src="images/attack1.png"/>
</p>

<p align="center">
    <img src="images/attack2.png"/>
</p>

Além disso, o canal está sendo usado pelos usuários para enviar seus dados confidenciais não seguros (HTTP), conforme mostrado abaixo:

<p align="center">
    <img src="images/attack3.png"/>
</p>

### 🔥

Se o banco de dados for exposto de alguma forma, as senhas de todos os usuários serão vazadas, conforme mostrado nesses documentos do MongoDB. Para visualizá-los, você pode instalar localmente o [Robo 3T](https://robomongo.org/download) e usar as credenciais padrão usadas em `config.yml`:

```
Database: snake_pro
User name: u_snake_pro
Password: svGX8SViufvYYNu6m3Kv
Address: localhost:27017
```

<p align="center">
    <img src="images/attack4.png"/>
</p>

Além disso, como as páginas de login usam HTTP para transmitir as credenciais dos usuários, um invasor na mesma rede que a vítima (mesma wifi, por exemplo) pode usar o `tcpdump` para realizar um ataque man-in-the-middle.

Para instalar o tcpdump no Mac, use o seguinte comando:

```sh
brew install tcpdump
```

Para começar a farejar senhas do SnakePro, um invasor pode usar o seguinte comando:

```sh
sudo tcpdump -i lo0 -X host localhost | grep -C 2 pass --color
```

<p align="center">
    <img src="images/attack5.png"/>
</p>

## Proteger este aplicativo

Como você arrumaria essa vulnerabilidade? Após suas alterações, um invasor não poderá:

- Capturar informações confidenciais farejando pacotes de rede.
- Bônus: Que tal usar HTTPS?

## PR Soluções

[Alerta de spoiler 🚨 ] Para entender como essa vulnerabilidade pode ser resolvida, confira [these pull requests](https://github.com/globocom/secDevLabs/pulls?q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3ASnakePro)!

## Contribuição

Nós encorajamos você a contribuir com o SecDevLabs! Por favor, confira a seção Contribuição no SecDevLabs para orientações sobre como proceder !🎉

[docker install]: https://docs.docker.com/install/
[docker compose install]: https://docs.docker.com/compose/install/
[app]: http://localhost:10003
[dirb]: https://tools.kali.org/web-applications/dirb
