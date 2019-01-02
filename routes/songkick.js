var request = require('request');
var express = require('express');
var router = express.Router();

const key = "e3m4okIWkNcfnvmc";

function getVenueEvents(name, callback){
	var url = "https://api.songkick.com/api/3.0/search/venues.json?query="+name+"&apikey="+key;
	url = url.replace(/ /g, '+');
	request.get(url, function(error, res, body){
		var jsonObj = JSON.parse(body);
		if (jsonObj.resultsPage.results == undefined || jsonObj.resultsPage.results.venue == undefined) {
			id = "";
		} else {
			var id = jsonObj.resultsPage.results.venue[0].id;
		}
		url = "https://api.songkick.com/api/3.0/venues/"+id+"/calendar.json?apikey="+key;
		url = url.replace(/ /g, '+');
		request.get(url, function(error, res, body){
			callback(JSON.parse(body));
		});
	});
}


router.get('/', function(req, res, next){
	var name = req.query.venueName;
	getVenueEvents(name, function(ret){
		res.send(ret);
	});
});

module.exports = router;