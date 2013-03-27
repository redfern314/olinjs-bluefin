
/*
 * GET map testing page.
 */

var http = require('http');

exports.map = function(req, res){
  console.log(process.env.GOOGLE_KEY);
  res.render('map', { title: 'Map Test', GOOGLE_KEY: process.env.GOOGLE_KEY });
};

exports.getLocation = function(req, res) {
  place = req.body.place
  console.log('-----------------');
  console.log(place);
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