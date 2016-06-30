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
      var itinArray = $('.itinerary-item');
      var selected = $(this).parent().find($('select'));
      var optionVal = selected.val(); //index of the array
      var optionType = selected.data('type'); //hotel
      var locationArr;

      if(optionType === 'hotel'){

        //push into itinerary object
        updateCurrentDay(currentDay.hItin, hotels[optionVal]);

        //update the itinerary div
        updateItinDiv(0,hotels[optionVal].name);

        locationArr = hotels[optionVal].place.location;
        //initializeMap(locationArr);
        //update maps
        drawMarker('hotel', locationArr);

      } else if (optionType === 'restaurant') {
        //push into itinerary object
        updateCurrentDay(currentDay.rItin, restaurants[optionVal]);

        //update the itinerary div
        updateItinDiv(1,restaurants[optionVal].name);


        locationArr = restaurants[optionVal].place.location;
        //update maps
        drawMarker('restaurant', locationArr);
      } else {
        //push into itinerary object
        updateCurrentDay(currentDay.aItin, activities[optionVal]);
        //update the itinerary div
        updateItinDiv(2,activities[optionVal].name);

        locationArr = activities[optionVal].place.location;
        //update maps
        drawMarker('activity', locationArr);
      }
    })

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
}

function updateCurrentDay(itinType, itinObjToPushIn){
  itinType.push(itinObjToPushIn);
}

function updateItinDiv(index, text){
  var itinArray = $('.itinerary-item');
  $(itinArray[index]).append("<span class='title'>" + text + "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button>");
}


});
