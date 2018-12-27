# Amarelo Designs
 > This is a simple web application built with Flask that contains an example of an Insecure Deserialization vulnerability.

<img src="images/Amarelo-Designs.png" align="center"/>

## What is Insecure Deserialization?

Definition from [OWASP](https://www.owasp.org/index.php/Deserialization_of_untrusted_data):

Serialization is the process of turning some object into a data format that can be restored later. People often serialize objects in order to save them to storage, or to send as part of communications. Deserialization is the reverse of that process -- taking data structured from some format, and rebuilding it into an object.

However, many programming languages offer a native capability for serializing objects. These native formats usually offer more features than JSON or XML, including customizability of the serialization process. Unfortunately, the features of these native deserialization mechanisms can be repurposed for malicious effect when operating on untrusted data. Attacks against deserializers have been found to allow denial-of-service, access control, and remote code execution attacks.

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to start the vulnerable application:

```sh
make install
```

Then simply visit [localhost:5000][App] !

## Attack Narrative

To understand how this vulnerability can be exploited, check this other section!

## Mitigating the vulnerability

To understand how this vulnerability can be mitigated, check this other section!

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
[App]: http://127.0.0.1:5000

## Contributing

Yes, please. :zap:
