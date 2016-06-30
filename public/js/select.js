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

      if(optionType === 'hotel'){

        //push into itinerary object
        hItin.push(hotels[optionVal]);

        //update the itinerary div
        $(itinArray[0]).append("<span class='title'>" + hotels[optionVal].name + "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button>");

        var locationArr = hotels[optionVal].place.location;
        console.log(locationArr);
        //initializeMap(locationArr);

        //update maps

      } else if (optionType === 'restaurant') {
        //push into itineary object
        rItin.push(restaurants[optionVal]);



        //update the itinerary div
        $(itinArray[1]).append("<span class='title'>" + restaurants[optionVal].name + "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button>");

        //update maps
      } else {
        //push into itineary object
        aItin.push(activities[optionVal]);
        $(itinArray[2]).append("<span class='title'>" + activities[optionVal].name + "</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button>");
      }
      //hotels[optionVal].place.location[0]


      //$this.val();
    })
});
