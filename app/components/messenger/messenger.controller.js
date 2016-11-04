'use strict';

const _ = require('lodash');
const request = require('request');

function MessengerController() {
  let self = this;

  function init() {
    // You can remove it and init() if you don't need initialization function
  }

  init();

  /// Attributes
  ///////

  self.verifyToken = 'dkjlAsdlksjA';
  self.postBackURL = [
    'https://graph.facebook.com',
    '/v2.6/me/messages',
    '?access_token=',
    self.verifyToken
  ].join('');

  /// Public Methods
  ///////

  self.getMessenger   = getMessenger;
  self.postMessenger  = postMessenger;
  self.patchMessenger = patchMessenger;

  function getMessenger(req, res) {
    if (req.query['hub.verify_token'] == self.verifyToken) {
      return res.send(req.query['hub.challenge']);
    }

    res.send('not ok');
  }

  function postMessenger(req, res) {
    console.log('body', req.body);

    res.send('ok');

    if (_.isUndefined(req.body.entry) || !_.isArray(req.body.entry)) {
      return;
    }

    let entry = req.body.entry[0];
    let messaging = entry[0];
    console.log(messaging.message.text);

    request.post(self.postBackURL, {
      recipient: {
        id: messaging.sender.id,
      },
      message: {
        text: 'Bonjour toi !',
      },
    });
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
