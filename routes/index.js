var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Place = require('../models/place');
var Promise = require('bluebird');

var selectItems = {};
router.get('/', function (req, res, next) {

    var findingHotels = Hotel.findAll({
        include: [Place]
    });

    var findingActivities = Activity.findAll({
        include: [Place]
    });

    var findingRestaurants = Restaurant.findAll({
        include: [Place]
    });

    Promise.all([
            findingHotels,
            findingActivities,
            findingRestaurants
        ])
        .spread(function (hotels, activities, restaurants) {
            // res.render('index', {
            //     hotels: hotels,
            //     activities: activities,
            //     restaurants: restaurants
            // });
            selectItems = {hotels: hotels,
                 activities: activities,
                 restaurants: restaurants};
            res.render('index');
        })
        .catch(next);

});
module.exports = {router: router,
                selectItems: selectItems};
