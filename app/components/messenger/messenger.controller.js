'use strict';

function MessengerController() {
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

  self.getMessenger   = getMessenger;
  self.postMessenger  = postMessenger;
  self.patchMessenger = patchMessenger;

  function getMessenger() {

  }

  function postMessenger() {

  }

  function patchMessenger() {

  }

  /// Private Methods
  ///////

  function privateMethodMessenger() {
    /*
      Do Something
    */
  }
}

module.exports = MessengerController;
