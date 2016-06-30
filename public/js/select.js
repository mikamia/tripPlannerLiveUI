
var hotels = {{ hotels | json }};
var restaurants = {{ restaurants | json }};
var activities = {{ activities | json }};
// hotels.forEach(function(h){
//   $('#hotel-choices').html("<option value = '" + h.name + "'>" + h.name + "</option>");
// });

$(document).ready(function(){
    console.log('this is working!');
  });
