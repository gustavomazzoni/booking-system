# Booking flow (Booking System)
## Goal
Create a basic Booking application with a simple 'booking flow', that could be added a link to, from a product page, an order confirmation or something similar. The flow should enable the customer to choose the date and slot, on which they want to try the experience.

## Solution
A single-page application was built using [AngularJS](https://angularjs.org/), for the client side, consuming a RESTful API, built in NodeJS, that exposes the service/product basic information, the available slots/dates and booking registration. The REST API is integrated to a MongoDB database to save and query objects.

### Key Solutions
* Simple, Modular, Decoupled and Reusabable code.
* Created Angular directive for the Calendar component designed specially for booking purpose with the ability to drill down to slot selection.
* Booking flow with wizard structure using UI-Router with nested states and views, and scope inheritance.

Both the client side webapp and the server side api are independently deployable software packages.

Modules dependencies in client side:
* AngularJS
* [AngularUI Router](https://github.com/angular-ui/ui-router)
* [angular-translate](https://angular-translate.github.io/)
* Bootstrap 3
* Less
* Jasmine
* Karma
* Grunt
* [Bower](http://bower.io)
* [ngBoilerplate](https://github.com/ngbp/ngbp)

Modules required in server side:
* NodeJS
* ExpressJS
* MongoDB
* Mongoose

## Next versions
* Unit test
* Security to REST API
* Confirmation page
* Payment process

## Running the app
### Download the project
Download or clone the project with the following command:
```sh
$ git clone https://github.com/gustavomazzoni/booking-system
```

### NodeJS RESTful API
#### Install
Make sure Node.js is installed and then:
Install MongoDB
```sh
$ brew install mongodb
```
Inside server folder:
Install project dependencies
```sh
$ npm install
```
#### Run
Run mongo db server
```sh
$ mongod
```
Then start the server
```sh
$ npm start
```
### Test
#### SERVICE ID
The first time application start, it will populate de DB with one service and some slots for this service so we can see the web app working. At the console, after 'npm start', find for '### SERVICE ID:' and get ID string for the service created.

### Test the API
#### Available Dates
To receive available dates for a service as a json result, use the following URL format informing serviceID and month like:
```sh
http://localhost:3000/api/v1/services/<SERVICE_ID>/availability/dates/<MONTH>
http://localhost:3000/api/v1/services/578950539443219907a74827/availability/dates/2016-08
```
You can also filter by vacancy number using '?quantity' parameter.
#### Available Slots
To receive available slots in a day for a service as a json result, use the following URL format informing serviceID and date like:
```sh
http://localhost:3000/api/v1/services/578950539443219907a74827/availability/slots?date=2016-08-22&quantity=3
```
Filtering by vacancy number ('quantity' parameter) is optional. If not informed it will get with at least on vacancy.


### AngularJS Webapp
Make sure Node.js is installed and then:
Inside client folder:
#### Install
Install project dependencies
```sh
$ sudo npm -g install grunt-cli karma bower
$ npm install
```
#### Build & watch
Grunt you build and keep watching your project during development:
```sh
$ grunt watch
```
#### Run
Start the server
```sh
$ npm start
```

### Test the web app
Open on your browser:
```sh
http://localhost:8000/#/booking/<SERVICE_ID>
```
#### With Date and Quantity already selected
```sh
http://localhost:8000/#/booking/578fdec3bd91bed81bb13a69?date=2016-08-13&quantity=3
```
