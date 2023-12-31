## Module overview

* Node.js Intro, NPM, standard libraries;
* Express.js framework; 
* Databases, MongoDB;
* Authorization, Authentication;
* Building APIs, REST API, MVC; 
* Deploy, Docker


### Client-server architecture

It is a producer/consumer computing architecture where the server acts as the producer and the client as a consumer.\
The server houses and provides high-end, computing-intensive services to the client on demand.\
These services can include application access, storage, file sharing, printer access and/or direct access to the server’s raw computing power.

<p align="center">
  <img src="https://github.com/SKindij/SKindij/blob/main/recources/client-server-architecture.jpg" 
    title="client-server architecture" alt="client-server architecture" width="800" height="240"/>  
</p> 

Client/server architecture works when the client computer sends a resource or process request to the server over the network connection, which is then processed and delivered to the client.\
A server computer can manage several clients simultaneously, whereas one client can be connected to several servers at a time, each providing a different set of services.\
In its simplest form, the internet is also based on client/server architecture where web servers serve many simultaneous users with website data.


#### Modern web applications

<p align="center">
  <img src="https://github.com/SKindij/SKindij/blob/main/recources/modern-web-application.jpg" 
    title="modern web-application" alt="modern web-application" width="700" height="400"/>  
</p> 

#### MPA vs SPA

<p align="center">
  <img src="https://github.com/SKindij/SKindij/blob/main/recources/MPA-vs-SPA.jpg" 
    title="MPA vs SPA" alt="MPA vs SPA" width="700" height="400"/>  
</p> 


### HTTP

The Hypertext Transfer Protocol (HTTP) is an application-level protocol for distributed, collaborative, hypermedia information systems.\
This is the foundation for data communication for the World Wide Web (i.e. internet) since 1990.

<p align="center">
  <img src="https://github.com/SKindij/SKindij/blob/main/recources/Hypertext-Transfer-Protocol.jpg" 
    title="Hypertext Transfer Protocol" alt="Hypertext Transfer Protocol" width="700" height="240"/>  
</p> 

HTTP is a generic and stateless protocol which can be used for other purposes as well using extensions of its request methods, error codes, and headers.


A **Uniform Resource Identifier (URI)** provides a simple and extensible means for identifying a resource (straight from RFC 3986). It’s just an identifier; don’t overthink it.

A **Uniform Resource Locator (URL)** is an identifier that tells you how to get to it.



#### Mime types

- .css - text/css
- .csv - text/csv
- .gif - image/gif
- .html - text/html
- .js - text/javascript
- .json - application/json
- .txt - text/plain
- .xml - application/xml
- Url encoded - application/x-www-form-urlencoded


### RESTful API

It is acronym for REpresentational State Transfer. It is architectural style for distributed hypermedia systems.

The key abstraction of information in **REST** is a resource. Any information that can be named can be a resource: a document or image, a temporal service, a collection of other resources, a non-virtual 
object (e.g. a person), and so on. **REST** uses a resource identifier to identify the particular resource involved in an interaction between components.

#### REST Design Principles

* Everything is a Resource
* Each Resource is identifiable by Unique URI
* Use the standard HTTP methods
* Allow multiple representations for the same Resource
* Communication should always be stateless

REST is a sofware architectual style that defines a set of constraints to be used for creating Web Services (API).

+ ``GET /users/`` returns a list of registered users
+ ``POST /users/`` creates a user using a body data
+ ``PUT /users/123`` update user 123 with body data
+ ``GET /users/123`` returns the details of user 123
+ ``DELETE /users/123`` deletes user 123


### Built-in HTTP Module

```node
   var http = require('http');
```

_Now your application has access to the HTTP module, and is able to create a server:_

```node
  http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
  }).listen(8080);
```


### Web server architecture

<p align="center">
  <img src="https://github.com/SKindij/SKindij/blob/main/recources/web-server-arch.jpg" 
    title="web server architecture" alt="web server architecture" width="700" height="390"/>  
</p> 


## Web frameworks

### Express.js

```node
  const express = require('express');
  const app = express();
  app.get('/', function (req, res) { 
    res.json({ ok: true });
  });
  app.listen(3000);
```

#### Routing / Express.js 4.x API reference

<p align="center">
  <img src="https://github.com/SKindij/SKindij/blob/main/recources/routing-expres.jpg" 
    title="routing expres" alt="routing expres" width="900" height="580"/>  
</p>

#### Response

* Represents the HTTP response that an Express app sends for HTTP request
* Sending response:
  - res.end() 
  - res.sendStatus() 
  - res.send() 
  - res.sendFile()
  - res.json()
  - res.redirect() 
  - res.render()
* **Express = Routing + Middlewares**
  - • Execute any code
  - • Make changes to the request and/or the response objects
  - • End the request-response cycle
  - • Call the next middleware in the stack

#### REQUEST -> RESPONSE CYCLE

<p align="center">
  <img src="https://github.com/SKindij/SKindij/blob/main/recources/Request-Response-Cycle.jpg" 
    title="Request Response Cycle" alt="Request Response Cycle" width="800" height="400"/>  
</p>

##### Example

```node
  app.put('/employees/:id', async (req, res) => {
    const employee = await getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(400).json({message: ‘No employee found'});
    }
    await employee.update(req.body); 
    res.json({ status: 'ok' });
  });
```

#### Request: body

+ Contains submitted data as key-value pairs and undefined by default
+ Use express.json() middleware to populate body from json

```node
  const express = require('express');
  const app = express();

  app.use(express.json());
```

#### Router

```node
  const express = require('express');
  const app = express();
  const router = express.Router();

  router.use((req, res, next) => {
    // some middleware
    next();
  });

  router.get('/:id', (req, res) => { 
    res.json({ id: req.params.id })
  });

  app.use('/users', router);
```

## Authentication

* Authentication types
  - Basic(Password-based authentication) 
  - JSON Web Token (JWT)
  - OAuth
* Credentials transfer in HTTP
  - Request body 
  - HTTP header

#### Basic Auth




#### Oauth2.0





#### JWT





### Cookie vs Token Authentication
















