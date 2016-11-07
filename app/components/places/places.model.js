'use_strict';

const request     = require('request');
const unirest     = require('unirest');
const _           = require('lodash');

const APIKey = 'AIzaSyC-fD1eyEoTju7sSVy0hMCSeU4jeJIJ0CY';

function PlacesModel() {
  let self  = this;
  self.Host = 'https://maps.googleapis.com/';
  self.yelpAPIKey = null;

  function init() {
    yelpOauth2().then(function(token) {
      // fetchRestaurants(48.866096, 2.373295);
    });

  }

  init();

  /// Private Methods
  function yelpOauth2() {
    var body =  {
      grant_type:    'client_credentials',
      client_id:     'cJbX-C_kjpnQ8FoRbbfUgQ',
      client_secret: 'LAmyZ33FiKz2i4j3tV0kxtTiCcKAw5I00HtqUwWaDBhnUfF22tOA4ljspFE8rzNB'
    };

    return new Promise(function(resolve, reject) {
      unirest.post('https://api.yelp.com/oauth2/token')
      .send(body)
      .end(function(response) {
        self.yelpAPIKey = response.body.access_token;
        resolve(self.yelpAPIKey);
      });
    });

  }

  /// Public Methods
  self.fetchRestaurants = fetchRestaurants;
  self.fetchGoogleRestaurants = fetchGoogleRestaurants;

  function fetchRestaurants(latitude, longitude, categories = 'restaurants', radius = 500) {
    let parameters = {latitude: latitude, longitude: longitude, radius: radius,categories: categories};

    return new Promise(function(resolve, reject) {
      let restaurants = [];

      unirest.get('https://api.yelp.com/v3/businesses/search')
      .headers({'Authorization': 'Bearer ' + self.yelpAPIKey})
      .query(parameters)
      .end(function(response) {

        _.forEach(response.body.businesses, function(place) {
          restaurants.push({
            title:     place.name,
            image_url: place.image_url,
            subtitle:  formatDescription(place.rating, place.price)
          });
        });

        restaurants = _.shuffle(restaurants);
        restaurants = _.chunk(restaurants, 10)[0];
        resolve(restaurants);
        console.log(restaurants);
      });

    });
  }

  function formatDescription(rating, price) {
    let desc = '';
    let rate = Math.ceil(rating);
    desc    += Array(rate).fill('&#9733;').join('');
    desc    += Array(5 - rate).fill('&#9734;').join('');
    desc    += '\n';
    desc    += price;
    return desc;
  }

  function fetchGoogleRestaurants(latitude, longitude) {

    let parameters = '?location=' +  [latitude,longitude].join(',');
    parameters += '&radius=500&type=restaurant';
    parameters += '&key=' + APIKey;

    let url = self.Host + '/maps/api/place/nearbysearch/json' + parameters;
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
          restaurants = _.shuffle(restaurants);
          restaurants = _.chunk(restaurants, 3)[0];
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
