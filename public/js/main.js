var mapCanvas = document.getElementById('map-canvas');
var currentMap;
var markers = [];

var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
};

function drawMarker (type, coords) {
  var latLng = new google.maps.LatLng(coords[0], coords[1]);
  var iconURL = iconURLs[type];
  var marker = new google.maps.Marker({
    icon: iconURL,
    position: latLng
  });
  markers.push(marker);
  marker.setMap(currentMap);
}

function drawAll(currentDay){
  //hotel
  currentDay.hItin.forEach(function(h){
    var location = h.place.location;
    drawMarker('hotel', location);
  });
  //restaurants
  currentDay.rItin.forEach(function(r){
    var location = r.place.location;
    drawMarker('restaurant', location);
  });
  //activities
  currentDay.aItin.forEach(function(a){
    var location = a.place.location;
    drawMarker('activity', location);
  });
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
  markers = [];
}

function clearMarker(location){
  markers.forEach(function(marker){
   var lat = marker.getPosition().lat();
   var long = marker.getPosition().lng();
    if(lat === location[0]){
      marker.setMap(null);
    }
  })
}

  //drawMarker('hotel', locationArr);

$(function initializeMap (locationArr){
  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);
  currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });
});

