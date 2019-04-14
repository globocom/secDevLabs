# ![Popsicle](https://cdn.rawgit.com/blakeembrey/popsicle/master/logo.svg)

[![NPM version](https://img.shields.io/npm/v/popsicle.svg?style=flat)](https://npmjs.org/package/popsicle)
[![NPM downloads](https://img.shields.io/npm/dm/popsicle.svg?style=flat)](https://npmjs.org/package/popsicle)
[![Build status](https://img.shields.io/travis/blakeembrey/popsicle.svg?style=flat)](https://travis-ci.org/blakeembrey/popsicle)
[![Test coverage](https://img.shields.io/coveralls/blakeembrey/popsicle.svg?style=flat)](https://coveralls.io/r/blakeembrey/popsicle?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/blakeembrey/popsicle.svg)](https://greenkeeper.io/)

> **Popsicle** is the easiest way to make HTTP requests - a consistent, intuitive and tiny API that works on node and the browser. 9.37 kB in browsers, after minification and gzipping, including dependencies (with `url` being the bulk of it).

```js
popsicle.get('/users.json')
  .then(function (res) {
    console.log(res.status) //=> 200
    console.log(res.body) //=> { ... }
    console.log(res.headers) //=> { ... }
  })
```

## Installation

```
npm install popsicle --save
```

## Usage

```js
const popsicle = require('popsicle')

popsicle.request({
  method: 'POST',
  url: 'http://example.com/api/users',
  body: {
    username: 'blakeembrey',
    password: 'hunter2'
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
  .use(popsicle.plugins.parse('json'))
  .then(function (res) {
    console.log(res.status) // => 200
    console.log(res.body) //=> { ... }
    console.log(res.get('Content-Type')) //=> 'application/json'
  })
```

**Popsicle** is a promise-based HTTP request library designed for extensibility. Here's the functions you can import from `popsicle`:

* **request(options)** The default request handler (also `get`)
* **defaults(options)** Create a new Popsicle instance with `defaults`
* **form(obj?)** Cross-platform form data object
* **plugins** Exposes the default plugins (Object)
* **jar(store?)** Create a cookie jar instance for Node.js
* **transport** Default transportation layer (Object)
* **Request(options)** Constructor for the `Request` class
* **Response(options)** Constructor for the `Response` class

### Request Options

* **url** _(string)_ The resource location.
* **method** _(string)_ The HTTP request method (default: `"GET"`).
* **headers** _(object)_ A map of header key to value (default: `{}`).
* **query** _(object | string)_ A map or string to be appended to the URL as the query string.
* **body** _(any)_ An object, string, form data, stream (node) or other to pass with the request.
* **timeout** _(number)_ The number of milliseconds to wait before aborting the request (default: `Infinity`)
* **use** _(array)_ An array of plugins to override the defaults (default: `[stringify(), headers()]`)
* **transport** _(object)_ Set the transport layer (default: `createTransport({ type: 'text' })`)

### Built-in Plugins

#### `stringify` (default)

Automatically serialize the request body into a string (E.g. JSON, URL-encoded or multipart).

#### `headers` (default)

Sets up default headers for environments. For example, `Content-Length`, `User-Agent`, `Accept`, etc.

#### `parse`

Automatically parses allowed response type(s).

* **json** Parse response as JSON
* **urlencoded** Parse response as URL-encoded

```js
popsicle.get('/users')
  .use(popsicle.plugins.parse(['json', 'urlencoded']))
  .then(() => ...)
```

### Built-in Transports

Popsicle provides two transports, one for node (using `{http,https}.request`) and one for browsers (using `XMLHttpRequest`). These transports have a number of "types" built-in for handling the response body.

* **text** Handle response as a string (default)
* **document** `responseType === 'document'` (browsers)
* **blob** `responseType === 'blob'` (browsers)
* **arraybuffer** `responseType === 'arraybuffer'` (browsers)
* **buffer** Handle response as a buffer (node.js)
* **array** Handle response as an array of integers (node.js)
* **uint8array** Handle the response as a `Uint8Array` (node.js)
* **stream** Respond with the response body stream (node.js)

**Node transport options**

* **type** Handle the response (default: `text`)
* **unzip** Automatically unzip response bodies (default: `true`)
* **jar** An instance of a cookie jar (`popsicle.jar()`) (default: `null`)
* **agent** Custom HTTP pooling agent
* **maxRedirects** Override the number of redirects allowed (default: `5`)
* **maxBufferSize** The maximum size of the buffered response body (default: `2000000`)
* **rejectUnauthorized** Reject invalid SSL certificates (default: `true`)
* **confirmRedirect** Confirm redirects on `307` and `308` status codes (default: `() => false`)
* **ca** A string, `Buffer` or array of strings or `Buffers` of trusted certificates in PEM format
* **key** Private key to use for SSL (default: `null`)
* **cert** Public x509 certificate to use (default: `null`)

**Browser transport options**

* **type** Handle the XHR response (default: `text`)
* **withCredentials** Send cookies with CORS requests (default: `false`)
* **overrideMimeType** Override the XHR response MIME type

### Short-hand Methods

Common methods have a short hand exported (created using `defaults({ method })`).

```js
popsicle.get('http://example.com/api/users')
popsicle.post('http://example.com/api/users')
popsicle.put('http://example.com/api/users')
popsicle.patch('http://example.com/api/users')
popsicle.del('http://example.com/api/users')
```

### Default Instances

Create a new Popsicle instance with defaults pre-populated. Handy for a common cookie jar or transport to be used.

```js
const cookiePopsicle = popsicle.defaults({
  transport: popsicle.createTransport({
    jar: popsicle.jar()
  })
})
```

### Automatically Stringify Request Body

Popsicle will automatically serialize the request body using the `stringify` plugin. If an object is supplied, it will automatically be stringified as JSON unless the `Content-Type` was set otherwise. If the `Content-Type` is `application/json`, `multipart/form-data` or `application/x-www-form-urlencoded`, it will be automatically serialized accordingly.

```js
popsicle.get({
  url: 'http://example.com/api/users',
  body: {
    username: 'blakeembrey'
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
```

### Multipart Request Bodies

You can manually create a `FormData` instance by calling `popsicle.form`. When you pass a form data instance as the body, it'll automatically set the correct `Content-Type` - complete with boundary.

```js
const form = popsicle.form({
  username: 'blakeembrey',
  profileImage: fs.createReadStream('image.png')
})

form.append('x', 'y')

popsicle.post({
  url: '/users',
  body: form
})
```

### Cookie Jar (Node only)

You can create a reusable cookie jar instance for requests by calling `popsicle.jar`.

```js
const jar = popsicle.jar()

popsicle.request({
  method: 'post',
  url: '/users',
  transport: popsicle.createTransport({
    jar: jar
  })
})
```

### Request Class

Calling any of the request functions will return an instance of `Request`.

* **method** _(string)_ The request method.
* **timeout** _(number)_ Configured request timeout.
* **body** _(any)_ The request payload.
* **transport** _(object)_ The transportation layer.
* **events** _(object)_ A map of configured event listeners.
* **middleware** _(array)_ The list of configured middleware.
* **opened** _(boolean)_ A flag indicating the transport was started.
* **aborted** _(boolean)_ A flag indicating the request was aborted before finishing.
* **uploaded** _(number)_ The percentage of upload complete (between 0 and 1).
* **downloaded** _(number)_ The percentage of download complete (between 0 and 1).
* **uploadedBytes** (number)_ Number of bytes uploaded.
* **downloadedBytes** _(number)_ Number of bytes downloaded.
* **uploadLength** _(number)_ Known size of total upload bytes.
* **downloadLength** _(number)_ Known size of total download bytes.
* **error(message, code, original?)** Create a `PopsicleError` instance.
* **then(onFulfilled?, onRejected?)** Promise interface.
* **catch(onRejected)** Promise interface.
* **exec(cb)** Callback interface.
* **toOptions()** Return a new object representing the request options.
* **toJSON()** A JSON friendly representation of the request.
* **clone()** Return a new instance of `Request` from `toOptions()`.
* **use(middleware)** Append middleware to the current request.
* **on(event, fn)** Attach an event listener.
* **off(event, fn)** Detach an event listener.
* **once(event, fn)** Attach an event listener that automatically detaches after the first execution.
* **emit(event, ...args)** Emit an event (mostly internal use).
* **abort()** Abort the current request by emitting the `abort` event.

**P.S.** When cloning a request instance, the current middleware and events are copied. This allows event tricks like `abort()` to also abort cloned request instances (e.g. in the case where working with request retries, and aborting should still work on re-attempts).

#### Promises

Promises are the most expressive interface. Just chain using `Request#then` or `Request#catch` and continue.

```js
popsicle.get('/users')
  .then(function (res) {
    // Success!
  })
  .catch(function (err) {
    // Something broke.
  })
```

If you live on the edge, try with generators ([co](https://www.npmjs.com/package/co)) or ES7 `async`/`await`.

```js
co(function * () {
  const users = yield popsicle.get('/users')
})

async function () {
  const users = await popsicle.get('/users')
}
```

#### Callbacks

For tooling that expects node-style callbacks, you can use `Request#exec`. This accepts a single function to call when the response is complete.

```js
popsicle.get('/users')
  .exec(function (err, res) {
    if (err) {
      // Something broke.
    }

    // Success!
  })
```

### Aborting

All requests can be aborted before or during execution by calling `Request#abort`.

```js
const request = popsicle.get('http://example.com')

setTimeout(function () {
  request.abort()
}, 100)

request.catch(function (err) {
  console.log(err) //=> { message: 'Request aborted', code: 'EABORTED' }
})
```

#### Progress

The request object can be used to check progress at any time.

* **request.uploadedBytes** Current upload size in bytes
* **request.uploadLength** Total upload size in bytes
* **request.uploaded** Total uploaded as a percentage
* **request.downloadedBytes** Current download size in bytes
* **request.downloadLength** Total download size in bytes
* **request.downloaded** Total downloaded as a percentage
* **request.completed** Total uploaded and downloaded as a percentage

All percentage properties (`request.uploaded`, `request.downloaded`, `request.completed`) are a number between `0` and `1`. Aborting the request will emit a progress event, if the request had started.

```js
const request = popsicle.get('http://example.com')

request.uploaded //=> 0
request.downloaded //=> 0

request.on('progress', function () {
  console.log(request) //=> { uploaded: 1, downloaded: 0, completed: 0.5, aborted: false }
})

request.then(function (response) {
  console.log(request.downloaded) //=> 1
})
```

#### Errors

All response methods can return an error. Errors have a `popsicle` property set to the request object and a `code` string. The built-in codes are documented below, but custom errors can be created using `request.error(message, code, cause)`.

* **EABORT** Request has been aborted by user
* **EUNAVAILABLE** Unable to connect to the remote URL
* **EINVALID** Request URL is invalid
* **ETIMEOUT** Request has exceeded the allowed timeout
* **ESTRINGIFY** Request body threw an error during stringification plugin
* **EPARSE** Response body threw an error during parse
* **EMAXREDIRECTS** Maximum number of redirects exceeded (Node only)
* **EBODY** Unable to handle request body (Node only)
* **EBLOCKED** The request was blocked (HTTPS -> HTTP) (Browsers only)
* **ECSP** Request violates the documents Content Security Policy (Browsers only)
* **ETYPE** Invalid transport type

### Response Class

Every response will give a `Response` instance on success. T

* **status** The HTTP response status code
* **body** The response body from the transport layer (usually text or a stream)
* **headers** An object of lower-cased keys to header values
* **url** The final response URL (after redirects)
* **statusType()** Return an integer with the HTTP status type (E.g. `200 -> 2`)
* **get(key)** Retrieve a HTTP header using a case-insensitive key
* **name(key)** Retrieve the original HTTP header name using a case-insensitive key
* **type()** Return the response type (E.g. `application/json`)

### Plugins

Plugins can be set as an array with the initial options (which overrides default plugins), or they can be used via `Request#use`.

#### External Plugins

* [Server](https://github.com/blakeembrey/popsicle-server) - Automatically mount a server on an available for the request (helpful for testing a la `supertest`)
* [Status](https://github.com/blakeembrey/popsicle-status) - Reject responses on HTTP failure status codes
* [No Cache](https://github.com/blakeembrey/popsicle-no-cache) - Prevent caching of HTTP requests in browsers
* [Basic Auth](https://github.com/blakeembrey/popsicle-basic-auth) - Add a basic authentication header to each request
* [Prefix](https://github.com/blakeembrey/popsicle-prefix) - Prefix all HTTP requests
* [Resolve](https://github.com/blakeembrey/popsicle-resolve) - Resolve all HTTP requests against a base URL
* [Limit](https://github.com/blakeembrey/popsicle-limit) - Transparently handle API rate limits by grouping requests
* [Group](https://github.com/blakeembrey/popsicle-group) - Group requests and perform operations on them all at once
* [Proxy Agent](https://github.com/blakeembrey/popsicle-proxy-agent) - Enable HTTP(s) proxying under node (with environment variable support)
* [Retry](https://github.com/blakeembrey/popsicle-retry) - Retry a HTTP request on network error or server error
* [Rewrite](https://github.com/lbovet/popsicle-rewrite) - Rewrite request URLs dynamically
* [Cache](https://github.com/blakeembrey/popsicle-cache) - Enable caching for HTTP requests into a store (E.g. filesystem)

#### Helpful Utilities

* [`throat`](https://github.com/ForbesLindesay/throat) - Throttle promise-based functions with concurrency support
* [`is-browser`](https://github.com/ForbesLindesay/is-browser) - Check if your in a browser environment (E.g. Browserify, Webpack)
* [`parse-link-header`](https://github.com/thlorenz/parse-link-header) - Handy for parsing HTTP link headers

#### Creating Plugins

Plugins must be a function that accept config and return a middleware function. For example, here's a basic URL prefix plugin.

```js
function prefix (url) {
  return function (self, next) {
    self.url = url + self.url
    return next()
  }
}

popsicle.request('/user')
  .use(prefix('http://example.com'))
  .then(function (response) {
    console.log(response.url) //=> "http://example.com/user"
  })
```

Middleware functions accept two arguments - the current request and a function to proceed to the next middleware function (a la Koa `2.x`).

**P.S.** The middleware array is exposed on `request.middleware`, which allows you to clone requests and tweak middleware - for example, using `request.middleware.slice(request.middleware.indexOf(currentFn))`. This is useful, as the pre and post steps of previous middleware attach before `currentFn` is executed.

### Transportation Layers

Creating a custom transportation layer is just a matter creating an object with `open`, `abort` and `use` options set. The open method should set any request information required between called as `request._raw`. Abort must abort the current request instance, while `open` must **always** resolve to a promise. You can set `use` to an empty array if no plugins should be used by default. However, it's recommended you keep `use` set to the defaults, or as close as possible using your transport layer.

## JavaScript

This module is designed for ES5 environments, but requires two ES2015 polyfills to work:

1. `Promise` - `popsicle` is designed heavily with promises in mind
2. `Object.assign` - used internally for object cloning

## TypeScript

This project is written using [TypeScript](https://github.com/Microsoft/TypeScript) and [typings](https://github.com/typings/typings). Since version `1.3.1`, you can install the type definition using `typings`.

```
typings install npm:popsicle --save
```

Note that for a brand new project you might need to add the definition for node via the following command:

```
typings install env~node --save --global
```

Make sure you add `typings/index.d.ts` to your TypeScript project (using `files` or `includes` in `tsconfig.json`) if it isn't already.

## Development

Install dependencies and run the test runners (node and Electron using Tape).

```
npm install && npm test
```

## Related Projects

* [Superagent](https://github.com/visionmedia/superagent) - HTTP requests for node and browsers
* [Fetch](https://github.com/github/fetch) - Browser polyfill for promise-based HTTP requests
* [Axios](https://github.com/mzabriskie/axios) - HTTP request API based on Angular's $http service

## License

MIT
