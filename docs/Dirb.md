# How to install and use Dirb for Mac OS

## Installation 🔧

All you need to do is follow the commands below, and Dirb will be installed in no time!

```sh
curl -L https://sourceforge.net/projects/dirb/files/dirb/2.22/dirb222.tar.gz/download -o dirb222.tar.gz
tar xvzf dirb222.tar.gz
chmod 766 dirb222
cd dirb222
find . -type d -exec chmod 766 {} \;
chmod +x configure
./configure
make && make install
```

---

## How to use Dirb 👨‍💻

For this course, we are providing you with a wordlist of common URL directories, which can be found [here][1], to be used with Dirb. Feel free to use your own though 😉 !

To use Dirb, we need an URL and a wordlist. What the tool does now is try to access each and every URL directory present in the wordlist to see which ones are available. Be sure to only use Dirb with SecDevLabs machines and for educational purposes.

An example on how to use it would be as follows:

```sh
$ dirb http://localhost:5000 ./docs/common.txt
```

<p align="center">
    <img src="../owasp-top10-2017-apps/a8/amarelo-designs/docs/attack2.png"/>
</p>

[1]: ./common.txt