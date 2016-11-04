'use strict';

const _ = require('lodash');
const unirest = require('unirest');
const PlacesModel = require('./../places/places.model.js');

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

    let latitude = 48.866096;
    let longitude = 2.373295;

    PlacesModel.fetchRestaurants(latitude, longitude)
      .then(function(restaurants) {

        let options = {
          recipient: {
            id: messaging.sender.id
          },
          message: {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: 'What do you want to eat ?',
                buttons: restaurants
              },
            }
          }
        };

        console.log('options', options);

        unirest.post(self.postBackURL)
          .header('content-type', 'application/json')
          .send(options)
          .end(function(response) {
            console.log('response code', response.status);
            console.log('response', response.body);
          });

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
