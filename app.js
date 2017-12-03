var express = require('express');
var async = require('async');
var request = require('request');

var app = express();

//This api will give your city weather details based on your ip address.This is not the best solution.
//Please use this for educational purpose.

app.post('/', function (req, res) {
    //var geoUrl = 
    async.waterfall([
        function (next) {
            //Using ip-api to get ip address details
            var ipUrl = 'http://ip-api.com/json';
            request(ipUrl, function (error, response, body) {
                var bodyJson = JSON.parse(body);
                next(null, bodyJson.lat, bodyJson.lon);

            })
        },
        function (lat, lon, next) {
            //Weather 
            var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&cnt=10&APPID=bd12f9c41a85e844d4a853a020eb62a5';
            request(weatherUrl, function (error, response, body) {
                res.json(JSON.parse(body));
            })
        }
    ])
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});