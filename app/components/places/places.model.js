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
      // console.log(token);
      // fetchRestaurants(48.866096, 2.373295);
    });

  }

  init();

  /// Private Methods
  function yelpOauth2() {
    let body =  {
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
    let parameters = {latitude: latitude, longitude: longitude, categories: categories};

    if (radius) {
      parameters.radius = radius;
    }

    return new Promise(function(resolve, reject) {
      unirest.get('https://api.yelp.com/v3/businesses/search')
        .headers({'Authorization': 'Bearer ' + self.yelpAPIKey})
        .query(parameters)
        .end(function(response) {
          if (response.body.businesses.length < 10 && radius != false) {
            return fetchRestaurants(latitude, longitude, categories, false)
              .then(function(restaurants) {
                resolve(restaurants);
              }) ;
          }

          let restaurants = [];

          _.forEach(response.body.businesses, function(place) {
            let location = place.location;
            let buttons  = [];

            if (!_.isUndefined(place.phone)) {
              buttons.push({
                type:    'phone_number',
                title:   'Call Restaurant',
                payload: place.phone
              });
            }

            if (!_.isUndefined(location)) {
              buttons.push({
                type:    'postback',
                title:   'Itinerary',
                payload: location.address1 + ', ' + location.zip_code + ', ' + location.city
              });
            }

            buttons.push({
              type: 'element_share'
            });

            restaurants.push({
              title:     place.name,
              image_url: place.image_url,
              subtitle:  formatDescription(place),
              buttons:   buttons
            });
          });

          restaurants = _.shuffle(restaurants);
          restaurants = _.chunk(restaurants, 10)[0];

          resolve(restaurants);
        });

    });
  }

  function formatDescription(place) {
    let categories = [];
    let desc       = '';

    _.forEach(place.categories, function(category) {
      categories.push(category.title);
    });

    if (categories.length != 0) {
      desc    += categories.join(', ') + '\n';
    }

    desc += 'Rating: ' + place.rating + '\n';

    // let rate = Math.ceil(rating);
    // desc    += Array(rate).fill('&#9733;').join('');
    // desc    += Array(5 - rate).fill('&#9734;').join('');
    // desc    += '\n';

    let price = !_.isUndefined(place.price) ? place.price : 'Inconnu';
    desc += 'Price: ' + price;
    // desc += 'Distance: ' + Math.floor(place.distance) + 'm' + '\n';
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
