// var hItin = [];
// var rItin = [];
// var aItin = [];
var Day = function(){
  this.hItin = [];
  this.rItin = [];
  this.aItin = [];
}

var days = [new Day()];


$(document).ready(function(){
    hotels.forEach(function(h,index){
      $('#hotel-choices').append("<option value = '" + index + "'>" + h.name + "</option>");
    });
    restaurants.forEach(function(r,index){
      $('#restaurant-choices').append("<option value = '" + index + "'>" + r.name + "</option>");
    });
    activities.forEach(function(a,index){
      $('#activity-choices').append("<option value = '" + index + "'>" + a.name + "</option>");
    });

    var currentDay = days[getCurrentDay()-1];
    console.log(currentDay);
    $('#options-panel .btn.btn-primary').click(function(){
        populateOptions($(this));
      });

    $(document).on('click', '.day-btn', function(){
      if($(this).is('#day-add')) return;
      if($(this).hasClass('current-day')) return;
      $(this).closest('.day-buttons').find('.day-btn.current-day').removeClass('current-day');
      $(this).addClass('current-day');
      setCurrentDay();
      console.log(currentDay);

    });

    //Itinerary Day
    $('#day-add').on('click',function(){
      var lastChild = $('.day-buttons button:nth-last-child(2)');
      var newNum = Number(lastChild.text()) + 1;
      var newButton = "<button class='btn btn-circle day-btn'>" +
      newNum + "</button>";
      $(lastChild).after(newButton);
      days.push(new Day());
    });

function getCurrentDay(){
  return Number($('.current-day').text());
}

function setCurrentDay(){
  currentDay = days[getCurrentDay()-1];
  var itinArray = $('.itinerary-item');
  itinArray.empty();
  clearMarkers();
  drawAll(currentDay);
  addBackOptions();
}

function updateCurrentDay(itinType, itinObjToPushIn){
  itinType.push(itinObjToPushIn);
}

function updateItinDiv(index, text){
  var itinArray = $('.itinerary-item');
  $(itinArray[index]).append("<span class='title'>" + text + "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button>");
}

function addBackOptions(){
  currentDay.hItin.forEach(function(h){
    addHotel(h, true);
  });
  currentDay.rItin.forEach(function(r){
    addRestaurant(r, true);
  });
  currentDay.aItin.forEach(function(a){
    addActivity(a, true);
  });
}

function addHotel(hotel, addBack ){
    if(!addBack){
      updateCurrentDay(currentDay.hItin, hotel);
    }
    //update the itinerary div
    updateItinDiv(0,hotel.name);

    //initializeMap(locationArr);
    locationArr = hotel.place.location;
    //update maps
    drawMarker('hotel', locationArr);
}

function addRestaurant(restaurant, addBack){
  if(!addBack){
    updateCurrentDay(currentDay.rItin, restaurant);
  }
    //update the itinerary div
    updateItinDiv(1,restaurant.name);
    locationArr = restaurant.place.location;
    //update maps
    drawMarker('restaurant', locationArr);
}

function addActivity(activity, addBack){
  if(!addBack){
   updateCurrentDay(currentDay.aItin, activity);
  }
    //update the itinerary div
    updateItinDiv(2,activity.name);

    locationArr = activity.place.location;
    //update maps
    drawMarker('activity', locationArr);
}



function populateOptions(clicked){
  //var itinArray = $('.itinerary-item');
  var selected = $(clicked).parent().find($('select'));
  var optionVal = selected.val(); //index of the array
  var optionType = selected.data('type'); //hotel
  var locationArr;

  if(optionType === 'hotel'){
    addHotel(hotels[optionVal], false);
  } else if (optionType === 'restaurant') {
    addRestaurant(restaurants[optionVal], false);
  } else {
    addActivity(activities[optionVal], false);
  }
}


});
