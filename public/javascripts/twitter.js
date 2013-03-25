$(document).ready(function() {
	$(".getTweetsButton").click(function() {
		twitterSearch($(this)); 
	});
})

function twitterSearch(sender) {
	var city  = sender.attr("data-city");
	var venue = sender.attr("data-venue");
	$.post("/tweets", {city : city, query : venue}, function(data, err) {
		sender.parent().append(JSON.stringify(data.map(function (e) {return e.text})));
	});
}
