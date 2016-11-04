'use strict';

function HomeController() {
  let self = this;

  /// Public Methods
  ///////

  self.getHome = getHome;

  function getHome(req, res) {
    res.send('Hello World');
  }
}

module.exports = HomeController;
