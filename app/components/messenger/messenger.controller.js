'use strict';

const _ = require('lodash');

function MessengerController() {
  let self = this;

  function init() {
    // You can remove it and init() if you don't need initialization function
  }

  init();

  /// Attributes
  ///////

  self.verifiyToken = 'dkjlAsdlksjA';

  /// Public Methods
  ///////

  self.getMessenger   = getMessenger;
  self.postMessenger  = postMessenger;
  self.patchMessenger = patchMessenger;

  function getMessenger(req, res) {
    if (req.query['hub.verify_token'] == self.verifiyToken) {
      return res.send(req.query['hub.challenge']);
    }

    res.send('not ok');
  }

  function postMessenger(req, res) {
    console.log('body', req.body);

    if (_.isUndefined(req.body.entry) || !_.isArray(req.body.entry)) {
      res.send('ok');
    }

    _.forEach(req.body.entry, function(entry) {
      console.log(entry, entry.messaging);
    });

    res.send('ok');
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
