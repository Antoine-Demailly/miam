'use_strict';

const request     = require('request');
const _           = require('lodash');

const APIKey = 'AIzaSyC-fD1eyEoTju7sSVy0hMCSeU4jeJIJ0CY';

function PlacesModel() {
  let self  = this;
  self.Host = 'https://maps.googleapis.com/';

  /// Public Methods
  self.fetchRestaurants = fetchRestaurants;

  function fetchRestaurants(latitude, longitude) {

    self.parameters = '?location=' +  [latitude,longitude].join(',');
    self.parameters += '&radius=500&type=restaurant';
    self.parameters += '&key=' + APIKey;

    let url = self.Host + '/maps/api/place/nearbysearch/json' + self.parameters;
    return new Promise(function(resolve, reject) {

      // Request the Google API
      request.get(url, function(error, response, body) {
        if (!error) {
          let places = JSON.parse(body).results;
          let restaurants = [];

          // Parse the result & format format for facebook response
          _.forEach(places, function(place) {
            restaurants.push({
              type: 'postback',
              title: place.name,
              payload: place.vicinity});
          });
          // console.log(restaurants);
          // Resolve the promise
          resolve(restaurants);
        } else {

          // If there is an error
          reject();
        }
      });
    });
  }

}

module.exports = new PlacesModel;
