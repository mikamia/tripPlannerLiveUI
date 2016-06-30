var hItin = [];
var rItin = [];
var aItin = [];


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

    $('#options-panel .btn.btn-primary').click(function(){
      var itinArray = $('.itinerary-item');
      var selected = $(this).parent().find($('select'));
      var optionVal = selected.val(); //index of the array
      var optionType = selected.data('type'); //hotel
      var locationArr;
      if(optionType === 'hotel'){

        //push into itinerary object
        hItin.push(hotels[optionVal]);

        //update the itinerary div
        $(itinArray[0]).append("<span class='title'>" + hotels[optionVal].name + "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button>");

          locationArr = hotels[optionVal].place.location;
        //initializeMap(locationArr);
        //update maps
        drawMarker('hotel', locationArr);

      } else if (optionType === 'restaurant') {
        //push into itineary object
        rItin.push(restaurants[optionVal]);

        //update the itinerary div
        $(itinArray[1]).append("<span class='title'>" + restaurants[optionVal].name + "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button>");

        locationArr = restaurants[optionVal].place.location;
        //update maps
        drawMarker('restaurant', locationArr);
      } else {
        //push into itineary object
        aItin.push(activities[optionVal]);
        $(itinArray[2]).append("<span class='title'>" + activities[optionVal].name + "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button>");

        locationArr = activities[optionVal].place.location;
        //update maps
        drawMarker('activity', locationArr);


      }
      //hotels[optionVal].place.location[0]


      //$this.val();
    })

    //Itinerary Day
    $('#day-add').click(function(){
      var lastChild = $('.day-buttons button:nth-last-child(2)');
      var newNum = Number(lastChild.text()) + 1;
      var newButton = "<button class='btn btn-circle day-btn'>" + 
      newNum + "</button>";
      console.log(lastChild.text());
      $(lastChild).after(newButton);
    });

    


});
