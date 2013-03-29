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

$(document).ready(function(){

	$('.boxgrid.slideleft').click(function(){
		$(".cover", this).stop().animate({left:'-600px'},{queue:false,duration:300})
	});

	$("#trend").click(function() {
		$(".cover").animate({left:'0px'},{queue:false,duration:300})
	})

});