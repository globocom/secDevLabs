# ViniJR Blog
 > Cool but vulnerable blog.

This blog is a simple PHP web application that contains an example of an XML External Entity (XXE) vulnerability.

<img src="images/blog-fe.png" align="center"/>

## What is XXE?

Definition from [OWASP](https://www.owasp.org/index.php/XML_External_Entity_(XXE)_Processing):

```
An XML External Entity attack is a type of attack against an application that parses XML input. This attack occurs when XML input containing a reference to an external entity is processed by a weakly configured XML parser. This attack may lead to the disclosure of confidential data, denial of service, server side request forgery, port scanning from the perspective of the machine where the parser is located, and other system impacts.
```

## Requirements

To build this lab you will need [Docker][Docker Install] and [Docker Compose][Docker Compose Install].

## Deploy and Run

After cloning this repository, you can type the following command to start the vulnerable application:

```sh
make install
```

Then simply visit [localhost:8080](localhost:8080) !

## Attack Narrative

To understand how this vulnerability can be exploited, check this section!

## Mitigating the vulnerability

To understand how this vulnerability can be mitigated, check this other section!

[Docker Install]:  https://docs.docker.com/install/
[Docker Compose Install]: https://docs.docker.com/compose/install/
