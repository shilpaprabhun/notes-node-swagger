# NodeJS-Swagger Notes application
This application has been developed using [swagger-node](https://github.com/swagger-api/swagger-node). It is a simple application that provides API to do CRUD operations on an in-memory notes list.

### Pre-requesites
Node version 12.1.0

Before running the application, you must have swagger installed. You can do that using
`npm install -g swagger`

### To run the application 
In order to run the application, use
`swagger project start`

In order to run the Swagger UI, make sure that the application is running and then use
`http://127.0.0.1:57473/#!/`

In order to run the automated unit tests, use
`npm run test`
