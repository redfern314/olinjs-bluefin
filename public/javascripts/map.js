/*function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(-34.397, 150.644),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);*/

var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '5000',
    query: 'restaurant'
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

google.maps.event.addDomListener(window, 'load', initialize);

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i],i+65);
    }
  }
}

function createMarker(place,letter) {
  console.log(place);
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
    title: place.name,
    snippet: "lorem ipsum",
    icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld="+String.fromCharCode(letter)+"%7Cff0000%7C000000"
  });
}