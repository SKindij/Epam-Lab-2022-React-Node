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
This is the foundation for data communication for the World Wide Web (i.e. internet) since 1990.\
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





