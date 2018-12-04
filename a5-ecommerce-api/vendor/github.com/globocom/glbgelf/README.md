GLB GELF
========

GLB GELF is a Go library used for structured log messages generation. They could be a directly stdout output type and/or an output to a Graylog server.

Installation
----------

```shell
go get gopkg.in/Graylog2/go-gelf.v2/gelf
go get github.com/globocom/glbgelf
```

Usage
-----------

A previous initialization is required calling `InitLogger(graylogAddr, appName, tags, dev)` function.

- **graylogAddr**: Graylog address and port server. Format: _string(`hostname:port`)_.
- **appName**: Application name that is using GlbGelf. Format: _string(`application_name`)_.
- **tags**: Reference tags used for the app. This is a field used in the Graylog server. Format _string(`tag1, tag2, tag3, ...`)_.
- **development**: Boolean defining the operation mode. Case it's true, logs will be send directly to stdout. Otherwise, it will send both stdout and Graylog server. Format _boolean(true or false)_.

Through the inicialization function, struct `Logger` can be used in the application. This struct stores a list of parameters (listed bellow) previously defined and it has a function called `SendLog` for log message generation in Graylog format.

```
{
    "version": GLB GELF library version, 
    "host": Hostname, 
    "short_message": Message defined and generated in the app, 
    "full_message": Same message configured in the previous parameter, 
    "timestamp": Unix format timestamp message generation, 
    "level": Message loglevel, 
    "file": Correspodent file where the log message was generated, 
    "line": Log message line number, 
    "tags": Tags defined in the inicialization function, 
    "app": App's name defined in the inicialization function, 
    "extras": Extra field passed in a map[string]interface variable
    
}
```


```go
function SendLog(extra map[string]interface{}, loglevel string, messages ...interface{})
```
where:

- **extra**: _map_ struct with its _string_ key defining the extra field name and _interface_ value its content.
- **loglevel**: _string_ defining message loglevel. Through the _string_, JSON "level" field is filled out with the correspondent numerical value. It is accepted the following strings (with its correspondent value). It is accepted the following loglevel strings:
    - **"EMERG"**: loglevel 0.
    - **"ALERT"**: loglevel 1.
    - **"CRIT"**: loglevel 2.
    - **"ERROR"**: loglevel 3.
    - **"WARNING"**: loglevel 4.
    - **"NOTICE"**: loglevel 5.
    - **"INFO"**: loglevel 6.
    - **"DEBUG"**: loglevel 7.

- **messages**: _string_ that fills "short_message" and "full_message" fields.


Usage examples
--------------


The example bellow shows previous defined functions being called and the message log output expected.

```go
import "github.com/globocom/glbgelf"

glbgelf.InitLogger("log.example.com:12201","app-name","TAG1,TAG2,app-name",true)

glbgelf.Logger.SendLog(nil, "INFO", "First gelf message! :)")

```

Log message output expected:

```javascript
{
    "version":"1.1",
    "host":"xyz.local",
    "short_message":"First gelf message! :)",
    "full_message":"First gelf message! :)",
    "timestamp":1515535933,
    "level":6,
    "app":"app-name",
    "file":"/go/src/testing_logger.go",
    "line":19,
    "tags":"TAG1,TAG2,app-name"
}
```

Usage example defining new extra fields in the log message. Map variable is defined with the extra fields and its contents.


```go

glbgelf.Logger.SendLog(map[string]interface{}{"result":"error","action":"status","info":"DB", "time":1.0, "rid":"A03B3755-0ABC-44B2-97DF-4BDCAAFDCC9F"}, "ERROR", "Database verification failed!")
```

The following log message output contains the extra fields defined in the map variable.

```javascript
{
    "version":"1.1",
    "host":"xyz.local",
    "short_message":"Database verification failed!",
    "full_message":"Database verification failed!",
    "timestamp":1515602054,
    "level":3,
    "action":"status",
    "app":"app-name",
    "file":"/go/src/testing_logger.go",
    "info":"DB",
    "line":19,
    "result":"error",
    "rid":"A03B3755-0ABC-44B2-97DF-4BDCAAFDCC9F",
    "tags":"TAG1,TAG2,app-name",
    "time":1
}
```

Environment Variables
--------------

- **GELF_GRAYLOG_SERVER**: Environment variable with graylog server address and port. If Graylog server is initialized with an empty string in `InitLogger` function, the value stored in this ENV will be used;

- **GELF_APP_NAME**: ENV used to store app's name. It will be used in case where an empty string is passed to `InitLogger` function.

- **GELF_TAGS**: It will store tags in case an empty tag string is passed in `InitLogger` function.
