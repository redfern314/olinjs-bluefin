
/*
 * GET map testing page.
 */

var http = require('http')
  , request = require('request');

exports.map = function(req, res){
  console.log(process.env.GOOGLE_KEY);
  if(!req.session.location){
    req.session.location = {lat:37.7955,lng:-122.3937};
  }
  res.render('map', { title: 'Map Test', GOOGLE_KEY: process.env.GOOGLE_KEY });
};

exports.getLocation = function(req, res) {
  place = req.body.place
  req.session.city = place
  console.log('-----------------');
  console.log(place);
  req.session.city = place;
  http.get("http://maps.googleapis.com/maps/api/geocode/json?address="+place+"&sensor=false", function(result) {
    result.setEncoding('utf8');
    var data = '';
    result.on('data', function (chunk) {
      data += chunk;
    });
    result.on('end', function () {
      var jsondata = JSON.parse(data);
      console.log(jsondata.results[0].geometry.location);
      req.session.location = jsondata.results[0].geometry.location;
      res.send(jsondata.results[0].geometry.location);
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
}

exports.getVenues = function(req,res) {
  console.log(req.session.location)
  var foursquareQuery = "https://api.foursquare.com/v2/venues/trending?ll="+req.session.location.lat+","+req.session.location.lng+"&oauth_token="+process.env.FOURSQUARE_KEY;
  request({url: foursquareQuery, json:true}, function(error, foursquareResponse, foursquareData){
      if (!error) {
        console.log(foursquareResponse.body.response.venues);
        req.session.trending = foursquareResponse.body.response.venues;
        res.send({trending: foursquareResponse.body.response.venues});
      }
  });
}

exports.renderVenueList = function(req,res) {
  res.render('trending',{trending:req.session.trending,city:req.session.city})
}