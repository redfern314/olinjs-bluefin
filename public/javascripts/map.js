//--------------Google Maps/Places API code-----------------

var map;
var service;
var infowindow;
var pins = [];

var mapLocation;

function initialize() {
  mapLocation = new google.maps.LatLng(37.7955,-122.3937);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: mapLocation,
      zoom: 14
    });
  console.log("test");
  //google.maps.event.trigger(map, 'resize');
  findVenues();
}

function findVenues() {
  $.get("/getVenues",function(data){
    console.log(data);
    for (var i = 0; i < data.trending.length; i++) {
      createMarker(data.trending[i],String.fromCharCode(i+65));
    }
    $.get("/renderVenueList",function(data){
      console.log(data);
      $("#venues").html(data);
      $(".getTweetsButton").click(function() {
        $(".cover").animate({left:'-600px'},{queue:false,duration:300})
        twitterSearch($(this)); 
      });
      $("#trend").click(function() {
        $('#trendHeader').html("Trending Venues");
        $(".cover").animate({left:'0px'},{queue:false,duration:300})
      })
    });
    google.maps.event.trigger(map, 'resize');
  });
}



function twitterSearch(sender) {
  var city  = sender.attr("data-city");
  var venue = sender.attr("data-venue");
  $('#trendHeader').html(venue);
  console.log("searched");
  $.get("/tweets", {city : city, query : venue}, function(data, err) {
    $('#relevantTweets').html(data);
  });
}

function findCoordinates(place,callback) {
  clearMarkers();
  $.post("/getLocation",{place:place},function(data){
    mapLocation = new google.maps.LatLng(data.lat,data.lng);
    map.setOptions({center:mapLocation});
    
    findVenues();
  });
}


//creates a custom marker corresponding to the given letter and places it on the map
function createMarker(place,letter) {
  console.log(place);
  console.log(place.location);
  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(place.location.lat,place.location.lng),
    title: place.name,
    snippet: "lorem ipsum",
    icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld="+letter+"%7Cff0000%7C000000"
  });
  pins.push(marker);
  google.maps.event.addListener(marker, 'click', function() {
    $.get("/tweets", {city : place.location.city, query : place.name}, function(data, err) {
      $('#relevantTweets').html(data);
      $(".cover").stop().animate({left:'-600px'},{queue:false,duration:300})
      $("#trendHeader").html(place.name);
    });
  });
}

function clearMarkers() {
  for (var i = pins.length - 1; i >= 0; i--) {
    pins[i].setMap(null);
  };
  pins = [];
}

google.maps.event.addDomListener(window, 'load', initialize);

//--------------JQuery code-----------------
$(function() {
  $("#submit").on("click",function() {
    findCoordinates($("#location").val(),console.log);
    return false;
  });
  $('#newlist').on("submit",function () {
    return false;
  });

})