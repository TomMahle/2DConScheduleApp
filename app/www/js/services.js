'use strict';

angular.module('starter.services', []).factory('Events', function () {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var events = [{
    id: 0,
    name: 'Chris Kluwe and Andrew Reiner Keynote',
    //startTime: moment('2016-06-04T11:00:00').calendar(),
    //endTime: moment('2016-06-04T13:00:00').calendar(),
    description: 'Our guests of honor wax poetic about what it is to be a gamer. The entire scope of gaming\'s present, past, and future will be their playground.',
    face: 'img/KluweKarmaTrain.gif'
  }, {
    id: 1,
    name: 'Super Smash Bros 4 / Melee Tournaments',
    startTime: '2016-06-04T13:00:00',
    endTime: '2016-06-04T17:30:00',
    description: 'People fight each other with gaming\'s most epic icons. Prizes are at stake here, people. Prizes!!',
    face: 'img/smashbros.png'
  }];

  return {
    all: function all() {
      return events;
    },
    remove: function remove(chat) {
      events.splice(events.indexOf(chat), 1);
    },
    get: function get(eventId) {
      for (var i = 0; i < events.length; i++) {
        if (events[i].id === parseInt(eventId)) {
          return events[i];
        }
      }
      return null;
    }
  };
});