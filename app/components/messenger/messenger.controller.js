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
    res.send('ok');

    if (_.isUndefined(req.body.entry) || !_.isArray(req.body.entry)) {
      return;
    }

    let entry = req.body.entry[0];
    let messaging = entry.messaging[0];

    console.log(messaging);

    if (!_.isUndefined(messaging.message)) {
      let message = messaging.message.text;
    }

    if (!_.isUndefined(messaging.postback) && !_.isUndefined(messaging.postback.payload)) {
      return sendAddress(messaging, messaging.postback.payload);
    }

    if (!_.isUndefined(message) && message.toLowerCase() == 'miam') {
      return askLocation(messaging);
    }

    let attachment = messaging.message.attachments;

    if (!_.isUndefined(attachment) && !_.isUndefined(attachment[0].payload.coordinates)) {
      let coordinates = attachment[0].payload.coordinates;
      fetchRestaurants(messaging, coordinates);
    }
  }

  function patchMessenger() {

  }

  /// Private Methods
  ///////

  function sendAddress(messaging, payload) {
    let message = [
      'Address of your restaurant:',
      payload
    ].join(' ');

    let options = {
      recipient: {
        id: messaging.sender.id
      },
      message: {
        text: message,
      }
    };

    unirest.post(self.postBackURL)
      .header('content-type', 'application/json')
      .send(options)
      .end(function(response) {
        console.log('ok');
      });
  }

  function fetchRestaurants(messaging, coordinates) {
    PlacesModel.fetchRestaurants(coordinates.lat, coordinates.long)
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
                buttons: _.chunk(restaurants, 3)[0]
              },
            }
          }
        };

        unirest.post(self.postBackURL)
          .header('content-type', 'application/json')
          .send(options)
          .end(function(response) {
            console.log('ok');
          });

      });
  }

  function askLocation(messaging) {
    let options = {
      recipient: {
        id: messaging.sender.id
      },
      message: {
        text: 'Please share your location:',
        quick_replies: [
          {
            content_type: 'location',
          }
        ]
      }
    };

    unirest.post(self.postBackURL)
      .header('content-type', 'application/json')
      .send(options)
      .end(function(response) {
        console.log('ok');
      });
  }

  function privateMethodMessenger() {
    /*
      Do Something
    */
  }
}

module.exports = MessengerController;
