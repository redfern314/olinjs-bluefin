/*
This handles the ajax twitter bit. it returns tweets about a specific venue
from users from a specific place.
*/

var request = require('request');

exports.twitterSearch = function(req, res) {
	console.log(req.query.query);
	var twitterQuery = "https://search.twitter.com/search.json?q=" + req.query.query + "&geocode=37.7955,-122.3937,10mi&result_type=recent";
    request({url: twitterQuery, json:true}, function(error, twitterResponse, twitterData){
      console.log(twitterData)
      res.render("tweets", {tweets: twitterData.results});
   	});
}


function packageTweets(twitterData) {
	return twitterData.results.map(function (each) {
        return {text : each.text, username : each.from_user, user_id : each.from_user_id, name : each.from_user_name, created_at : each.created_at};
    });
}