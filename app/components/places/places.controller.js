'use strict';

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

  function getPlaces() {

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
