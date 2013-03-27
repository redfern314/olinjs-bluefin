$(document).ready(function() {
	$(".getTweetsButton").click(function() {
		twitterSearch($(this)); 
	});
})

function twitterSearch(sender) {
	var city  = sender.attr("data-city");
	var venue = sender.attr("data-venue");
	$.get("/tweets", {city : city, query : venue}, function(data, err) {
		$('#relevantTweets').html(data);
	});
}
