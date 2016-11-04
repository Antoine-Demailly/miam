'use strict';

function SMSController() {
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

  self.getSMS   = getSMS;
  self.postSMS  = postSMS;
  self.patchSMS = patchSMS;

  function getSMS() {

  }

  function postSMS() {

  }

  function patchSMS() {

  }

  /// Private Methods
  ///////

  function privateMethodExample() {
    /*
      Do Something
    */
  }
}

module.exports = SMSController;
