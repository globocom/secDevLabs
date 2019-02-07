# How to install and use Dirb on OSX
The main goal of this document is to describe how Dirb can be installed, configured and used on a OSX environment. This tool must only be used in SecDevLabs apps and on systems you have proper authorization.

## Installation 🔧

All you need to do is follow the commands below, and Dirb will be installed in no time!

First, we need to download the installer from [SourceForge]:
```sh
curl -L https://sourceforge.net/projects/dirb/files/dirb/2.22/dirb222.tar.gz/download -o dirb222.tar.gz
```
Now we need to tar extract the files, which can be done through the commands:
```sh
tar xvzf dirb222.tar.gz
```
In order to properly install Dirb, the installer needs to have `write` and `read` permissions, which is granted through the recursive command:
```sh
chmod 766 dirb222
cd dirb222
find . -type d -exec chmod 766 {} \;
```
Now, to make the `configure` script executable, we need to grant it execution permission: 
```sh 
chmod +x configure
./configure
```
Before compiling the code itself, we strongly advice developers to read the source code first! 🔍

Now that you gave it a look, to compile the code, simply run:
```sh
make && make install
```

---

## How to use Dirb 👨‍💻

For this course, we are providing you with a wordlist of common URL directories from [SecLists], which can be found [here][1], to be used with Dirb. Feel free to use your own though 😉 !

To use Dirb, we need an URL and a wordlist. What the tool does now is try to access each and every URL directory present in the wordlist to see which ones are available. This is done by having a look at the response Status Code and we can confirm that by having a look at Figure 1, in which only the pages that returned a status code of 200 (OK) are shown.

#### Be sure to only use Dirb on SecDevLabs apps and on systems you have proper authorization

An example on how to use it would be as follows:

```sh
dirb http://localhost:5000 ./docs/common.txt
```

<figure align="center">
    <img src="../owasp-top10-2017-apps/a8/amarelo-designs/docs/attack2.png"/>
    <figcaption>Fig.1 - Dirb demonstration</figcaption>
</figure>

[SecLists]:https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/common.txt
[SourceForge]: https://sourceforge.net/
[1]: ./common.txt
