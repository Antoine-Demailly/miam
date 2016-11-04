'use strict';

const request = require('request');
const _       = require('lodash');

const APIKey  = 'AIzaSyC-fD1eyEoTju7sSVy0hMCSeU4jeJIJ0CY';
const Host    = 'https://maps.googleapis.com/';

function PlacesController() {
  let self = this;

  self.location   = '48.866096,2.373295';

  self.parameters = '?location=' +  self.location;
  self.parameters += '&radius=500&type=restaurant';
  self.parameters += '&key=' + APIKey;


  function init() {
    // You can remove it and init() if you don't need initialization function
  }

  init();

  /// Attributes
  ///////

  self.attribute1 = '';

  /// Public Methods
  ///////

  self.getPlaces   = getPlaces;
  self.postPlaces  = postPlaces;
  self.patchPlaces = patchPlaces;

  function getPlaces(req, res) {

    let url = Host + '/maps/api/place/nearbysearch/json' + self.parameters;
    console.log(url);
    request.get(url, function(error, response, body) {

      if (!error) {
        let places = JSON.parse(body);

        _.forEach(places.results, function(place) {
          console.log(place.name);
        });

      }
    });

  }

  function postPlaces() {

  }

  function patchPlaces() {

  }

  /// Private Methods
  ///////

  function privateMethodExample() {
    /*
      Do Something
    */
  }
}

module.exports = PlacesController;
