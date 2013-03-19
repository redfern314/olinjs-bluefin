var request = require('request');

/*
 * GET home page.
 */

exports.index = function(req, res){
  var foursquareQuery = "https://api.foursquare.com/v2/venues/trending?ll=37.7955,-122.3937&oauth_token="+process.env.FOURSQUARE_KEY;
  request({url: foursquareQuery, json:true}, function(error, response, data){
    res.render('index', {title: "Welcome to San Francisco!", trending: response.body.response.venues});
  });
};