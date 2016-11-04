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
  self.miamAccessToken = 'EAAa5IqH3a3oBAMpW1ZBixILA8RjEXlwOZAF7tC82xqR4GUOuaZA4vZBOhRCw4qq0CptmAzsfz8SCPzW5DyhJh33qM4sNy0by53fepgMrpQqKLAWKTevc46ewoZCb2ZA9FtkYRyZBZCk65mGnLZBMVJ4IS5gUWWbhYDwA1XZAjgtNnwFQZDZD';

  self.postBackURL = [
    'https://graph.facebook.com',
    '/v2.6/me/messages',
    '?access_token=',
    self.miamAccessToken
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
    // console.log('body', req.body);

    res.send('ok');

    if (_.isUndefined(req.body.entry) || !_.isArray(req.body.entry)) {
      return;
    }

    let entry = req.body.entry[0];
    let messaging = entry.messaging[0];
    // console.log('entry', entry, 'messaging', messaging);

    var options = {
      method: 'POST',
      url: self.postBackURL,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        recipient: {
          id: messaging.sender.id
        },
        message: {
          text: 'Bonjour toi !'
        }
      }
    };

    console.log('here', options);

    request(options, function(err, httpResponse, body) {
      console.log('err', err);
      console.log('bodyResponse', body);
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
