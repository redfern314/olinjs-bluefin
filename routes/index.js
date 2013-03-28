var request = require('request');
/*
 * GET home page.
 */

exports.index = function(req, res){
  var foursquareQuery = "https://api.foursquare.com/v2/venues/trending?ll=37.7955,-122.3937&oauth_token="+process.env.FOURSQUARE_KEY;
  request({url: foursquareQuery, json:true}, function(error, foursquareResponse, foursquareData){
  	  if (!error) {
        console.log(foursquareResponse.body.response.venues);
   	  	res.render('index', {title: "Welcome to San Francisco!", city : "San Francisco", trending: foursquareResponse.body.response.venues});
  	  }
  });
};
