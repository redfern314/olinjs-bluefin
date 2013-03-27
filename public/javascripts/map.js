//--------------Google Maps/Places API code-----------------

var map;
var service;
var infowindow;
var venue = "restaurant";
var pins = [];

var mapLocation;

function initialize() {
  mapLocation = new google.maps.LatLng(-33.8665433,151.1956316);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: mapLocation,
      zoom: 14
    });

  var request = {
    location: mapLocation,
    radius: '5000',
    query: venue
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, findPlacesCallback);
  google.maps.event.trigger(map, 'resize')
}

function findPlacesCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i],String.fromCharCode(i+65));
    }
  }
}

function findCoordinates(place,callback) {
  clearMarkers();
  $.post("/getLocation",{place:place},function(data){
    mapLocation = new google.maps.LatLng(data.lat,data.lng);
    map.setOptions({center:mapLocation});
    var request = {
      location: mapLocation,
      radius: '5000',
      query: venue
    };

    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, findPlacesCallback);
    })
}


//creates a custom marker corresponding to the given letter and places it on the map
function createMarker(place,letter) {
  console.log(place);
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    snippet: "lorem ipsum",
    icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld="+letter+"%7Cff0000%7C000000"
  });
  pins.push(marker);
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
    venue = $("#venue").val();
    findCoordinates($("#location").val(),console.log);
    return false;
  });
  $('#newlist').on("submit",function () {
    return false;
  });
})