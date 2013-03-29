$(document).ready(function() {

	$("#trend").click(function() {
		$(".cover").animate({left:'0px'},{queue:false,duration:300})
	})

	$(".getTweetsButton").click(function() {
		$(".cover").animate({left:'-600px'},{queue:false,duration:300})
		twitterSearch($(this)); 
	});
})

function twitterSearch(sender) {
	var city  = sender.attr("data-city");
	var venue = sender.attr("data-venue");
	console.log("searched");
	$.get("/tweets", {city : city, query : venue}, function(data, err) {
		$('#relevantTweets').html(data);
	});
}
