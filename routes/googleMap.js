var request = require('request');
var express= require('express');
var router = express.Router();

const key = 'AIzaSyAOqitb3kNnSBiFjZzL1421-rqeUipgO-I';

function getGeoLocation(addr, callback){
	var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + addr + "&key=" + key;
	url = url.replace(/ /g, '+');
	request.get(url, function(error, res, body){
		callback(JSON.parse(body));
	});
}

router.get('/', function(req, res, next){
	var addr = req.query.addr;
	getGeoLocation(addr, function(ret){
		res.send(ret);
	});
})

module.exports = router;