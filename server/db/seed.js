// code for initializing the DB w/ an product and slots
var mongoose = require('mongoose');
var initDB = require('../lib/initDB');
var Service = require('../models/Service');
var Slot = require('../models/Slot');

var seed = {
  serviceSeed: { name: 'Faldskærmsudspring - Tandem', description: 'En ultimativ adrenalinoplevelse som oplevelsesgave?', duration: 60, priceBase: 2300.00 },
  slotsSeed: [
    { date: new Date("2016-07-24T08:00:00"), price: 1800.00, vacancies: 4 },{ date: new Date("2016-07-24T14:00:00"), price: 2700.00, vacancies: 1 },
    { date: new Date("2016-07-25T09:00:00"), price: 1800.00, vacancies: 3 },{ date: new Date("2016-07-25T13:00:00"), price: 1800.00, vacancies: 4 },
    { date: new Date("2016-07-26T07:00:00"), price: 2300.00, vacancies: 3 },{ date: new Date("2016-07-26T15:00:00"), price: 2300.00, vacancies: 4 },
    { date: new Date("2016-07-27T06:00:00"), price: 2100.00, vacancies: 4 },{ date: new Date("2016-07-27T15:00:00"), price: 2300.00, vacancies: 2 },
    { date: new Date("2016-07-28T06:00:00"), price: 2000.00, vacancies: 2 },{ date: new Date("2016-07-28T14:00:00"), price: 1800.00, vacancies: 2 },{ date: new Date("2016-07-28T10:00:00"), price: 2200.00, vacancies: 1 },{ date: new Date("2016-07-28T17:00:00"), price: 2000.00, vacancies: 3 },
    { date: new Date("2016-07-29T08:00:00"), price: 1800.00, vacancies: 4 },{ date: new Date("2016-07-29T14:00:00"), price: 1800.00, vacancies: 4 },
    { date: new Date("2016-07-30T10:00:00"), price: 2300.00, vacancies: 1 },{ date: new Date("2016-07-30T16:00:00"), price: 2500.00, vacancies: 1 },
    { date: new Date("2016-08-01T09:00:00"), price: 2300.00, vacancies: 3 },{ date: new Date("2016-08-01T14:00:00"), price: 1800.00, vacancies: 2 },
    { date: new Date("2016-08-02T09:00:00"), price: 2000.00, vacancies: 1 },{ date: new Date("2016-08-02T14:00:00"), price: 2700.00, vacancies: 2 },
    { date: new Date("2016-08-03T09:00:00"), price: 2300.00, vacancies: 7 },{ date: new Date("2016-08-03T14:00:00"), price: 2500.00, vacancies: 2 },
    { date: new Date("2016-08-04T09:00:00"), price: 1800.00, vacancies: 6 },{ date: new Date("2016-08-04T14:00:00"), price: 2500.00, vacancies: 4 },
    { date: new Date("2016-08-05T09:00:00"), price: 2700.00, vacancies: 5 },{ date: new Date("2016-08-05T14:00:00"), price: 2500.00, vacancies: 1 },
    { date: new Date("2016-08-06T09:00:00"), price: 2000.00, vacancies: 4 },{ date: new Date("2016-08-06T14:00:00"), price: 2300.00, vacancies: 4 },
    { date: new Date("2016-08-07T09:00:00"), price: 2500.00, vacancies: 4 },{ date: new Date("2016-08-07T14:00:00"), price: 2300.00, vacancies: 4 },
    { date: new Date("2016-08-08T09:00:00"), price: 2300.00, vacancies: 1 },{ date: new Date("2016-08-08T14:00:00"), price: 1800.00, vacancies: 8 },
    { date: new Date("2016-08-10T09:00:00"), price: 2500.00, vacancies: 1 },{ date: new Date("2016-08-10T14:00:00"), price: 2700.00, vacancies: 4 },
    { date: new Date("2016-08-11T09:00:00"), price: 2500.00, vacancies: 4 },{ date: new Date("2016-08-11T14:00:00"), price: 2300.00, vacancies: 4 },
    { date: new Date("2016-08-12T09:00:00"), price: 2300.00, vacancies: 3 },{ date: new Date("2016-08-12T14:00:00"), price: 2700.00, vacancies: 5 },
    { date: new Date("2016-08-13T09:00:00"), price: 1800.00, vacancies: 4 },{ date: new Date("2016-08-13T14:00:00"), price: 2700.00, vacancies: 6 },{ date: new Date("2016-08-13T08:00:00"), price: 1900.00, vacancies: 1 },{ date: new Date("2016-08-13T18:00:00"), price: 2400.00, vacancies: 3 },
    { date: new Date("2016-08-14T09:00:00"), price: 2300.00, vacancies: 4 },{ date: new Date("2016-08-14T14:00:00"), price: 1800.00, vacancies: 1 },
    { date: new Date("2016-08-15T09:00:00"), price: 2300.00, vacancies: 3 },{ date: new Date("2016-08-15T14:00:00"), price: 1800.00, vacancies: 4 },
    { date: new Date("2016-08-16T09:00:00"), price: 2000.00, vacancies: 5 },{ date: new Date("2016-08-16T14:00:00"), price: 2300.00, vacancies: 6 },
    { date: new Date("2016-08-19T09:00:00"), price: 1800.00, vacancies: 4 },{ date: new Date("2016-08-19T14:00:00"), price: 2700.00, vacancies: 4 },
    { date: new Date("2016-08-20T09:00:00"), price: 2300.00, vacancies: 1 },{ date: new Date("2016-08-20T14:00:00"), price: 2300.00, vacancies: 3 },
    { date: new Date("2016-08-21T09:00:00"), price: 2300.00, vacancies: 4 },{ date: new Date("2016-08-21T14:00:00"), price: 2300.00, vacancies: 3 },
    { date: new Date("2016-08-22T09:00:00"), price: 2000.00, vacancies: 2 },{ date: new Date("2016-08-22T14:00:00"), price: 1800.00, vacancies: 3 },
    { date: new Date("2016-08-23T09:00:00"), price: 2000.00, vacancies: 4 },{ date: new Date("2016-08-23T14:00:00"), price: 2700.00, vacancies: 4 },
    { date: new Date("2016-08-24T09:00:00"), price: 1800.00, vacancies: 4 },{ date: new Date("2016-08-24T14:00:00"), price: 2700.00, vacancies: 1 },
    { date: new Date("2016-08-25T09:00:00"), price: 1800.00, vacancies: 3 },{ date: new Date("2016-08-25T14:00:00"), price: 1800.00, vacancies: 4 },
    { date: new Date("2016-08-26T09:00:00"), price: 2300.00, vacancies: 3 },{ date: new Date("2016-08-26T14:00:00"), price: 2300.00, vacancies: 4 },
    { date: new Date("2016-08-27T09:00:00"), price: 2000.00, vacancies: 4 },{ date: new Date("2016-08-27T14:00:00"), price: 2300.00, vacancies: 2 },
    { date: new Date("2016-08-28T09:00:00"), price: 2000.00, vacancies: 2 },{ date: new Date("2016-08-28T14:00:00"), price: 1800.00, vacancies: 2 },
    { date: new Date("2016-08-29T09:00:00"), price: 1800.00, vacancies: 4 },{ date: new Date("2016-08-29T14:00:00"), price: 1800.00, vacancies: 4 },
    { date: new Date("2016-08-30T09:00:00"), price: 2300.00, vacancies: 1 },{ date: new Date("2016-08-30T14:00:00"), price: 2300.00, vacancies: 4 }
  ],

  // Insert documents needed for initial state
  setUp: function(done) {
    console.log('*** Service properties:', seed.serviceSeed);
    console.log('Checking that service does not already exist...');

    Service.findOne(seed.serviceSeed, function (err, service) {
      if ( !err && !service ) {
        console.log('Creating new service...', err, service);
        service = new Service(seed.serviceSeed);
        service.save( function(err) {
          if (err) {
            console.log('Error: ', err);
            if (done) done(err, service);
          }
          console.log('Created new service...');
          console.log('### SERVICE ID:',service._id);
          console.log(err);
          console.log(service);
          
          console.log('*** Slots properties:', seed.slotsSeed);

          // set new service id into each slot
          seed.slotsSeed.forEach(function(slot, index, array) {
            slot.service_id = service._id;
          });

          console.log('Creating new slots...');
          Slot.collection.insert( seed.slotsSeed, function(err, results) {
            if (err) {
              console.log('Error: ', err);
              if (done) done(err, results);
            }
            console.log('Created new slots...');
            console.log(err);
            console.log(results);

            // set created slots to new service
            service.slots = results;

            if (done) done(err, service);
          });
        });
      } else {
        console.log('### SERVICE ID:',service._id);
        if (err) {
          console.log('Error: ', err);
        } else {
          console.log('Service already created.');
          console.log('Nothing to do.');
        }
        if (done) done(err, service);
      }
    });

  }
};

module.exports = seed;

