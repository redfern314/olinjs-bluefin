var request = require('request');
/*
 * GET home page.
 */

exports.index = function(req, res){
  if(!req.session.location){
    req.session.location = {lat:37.7955,lng:-122.3937};
    req.session.city = "San Francisco"
  }
  var foursquareQuery = "https://api.foursquare.com/v2/venues/trending?ll=37.7955,-122.3937&oauth_token="+process.env.FOURSQUARE_KEY;
  request({url: foursquareQuery, json:true}, function(error, foursquareResponse, foursquareData){
  	  if (!error) {
        console.log(foursquareResponse.body.response.venues);
   	  	res.render('index', {title: "Insider Opinion", city : req.session.city, trending: foursquareResponse.body.response.venues, GOOGLE_KEY: process.env.GOOGLE_KEY});
  	  }
  });
};
