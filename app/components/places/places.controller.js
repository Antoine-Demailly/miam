'use strict';

const http   = require('http');

const APIKey = 'AIzaSyC-fD1eyEoTju7sSVy0hMCSeU4jeJIJ0CY';
const Host   = 'https://maps.googleapis.com/';
const path   = '/maps/api/place/nearbysearch/json';

function PlacesController() {
  let self = this;

  self.location = '48.866096,2.373295';
  self.parameters = '?location=' + self.location + '&radius=500&type=restaurant';


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
    console.log('hello');
    http.get(sel,)
    var req = http.request(self.options, function(res) {
      console.log(res.body);
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
