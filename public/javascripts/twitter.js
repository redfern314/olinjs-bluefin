$(document).ready(function() {

	$("#trend").click(function() {
		console.log('here');
		$('#trendHeader').html("Trending Venues");
		// $(".cover").animate({left:'0px'},{queue:false,duration:300})
	})

	$(".getTweetsButton").click(function() {
		$(".cover").animate({left:'-600px'},{queue:false,duration:300})
		twitterSearch($(this)); 
	});
})

function twitterSearch(sender) {
	var city  = sender.attr("data-city");
	var venue = sender.attr("data-venue");
	var backButton = '<a style="font-size: small; margin-left: 20px" id="trend"> back <a>'
	$.get("/tweets", {city : city, query : venue}, function(data, err) {
		$('#relevantTweets').html(data);
		// $('#trendHeader').html(venue + backButton);
		$('#trendHeader').html('yo');
	});
}
