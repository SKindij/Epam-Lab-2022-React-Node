# REST API like Uber

This is UBER like service for freight trucks, in REST style, using MongoDB as database.\
This service should help regular people to deliver their stuff and help drivers to find loads and earn some money. Application contains 2 roles, driver and shipper.

### for users

To start an app simply register, choosing your respective role and log in with your email and password.
Then the main page will appear with some basic interactive info about loads and trucks, depending on your role. Also profile page and other options are provided.

This app is simple though has some all needed features to operate loads and fast delivery.

Drivers can create trucks and assign them for future rides.
Shippers create and post loads to be picked-up by available trucks to be shipped to their destination.
Driver can interact with assigned to him load and change it's status
Shipper has a possibility to view loads and shipment info


### for developers

The entire application is contained within the `src` directory.

`.env` use for configuration, anyone should be able to run this project with config defined in this file.

`.eslint.json` use for configuration coding format.

`package.json` use for records important metadata about a project and functional attributes of a project that npm uses to install dependencies.

`openapi.yaml` use for contain API documentation. Use [Swagger](https://swagger.io) to upload it.

### Install

    npm i

### Run the app

    npm run start

### Debug the app

    npm run debug

### Additional software

- Node.js
- MongoDB
- Postman (not necessary)
