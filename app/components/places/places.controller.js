'use strict';

const PlacesModel = require('./places.model.js');

function PlacesController() {
  let self = this;

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
    let latitude = 48.866096;
    let longitude = 2.373295;

    PlacesModel.fetchRestaurants(latitude, longitude)
    .then(function(restaurants) {
      console.log(restaurants);
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
