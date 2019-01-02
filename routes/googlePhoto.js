var request = require('request');
var express = require('express');
var router = express.Router();

const key = 'AIzaSyAOqitb3kNnSBiFjZzL1421-rqeUipgO-I';
const engineId = "012046771656512843365:c0vu12vg3u8";

function getPhotos(keyword, callback){
	var url = "https://www.googleapis.com/customsearch/v1?q="+keyword+"&cx="+engineId+"&imgSize =medium&imgType=news&num=8&searchType=image&key="+key;
	url = url.replace(/ /g, '+');
	console.log(url);
	request.get(url, function(error, res, body){
		callback(JSON.parse(body));
	});
}

router.get('/', function(req, res, next){
	var name = req.query.keyword;
	getPhotos(name, function(ret){
		res.send(ret);
	});
});

module.exports = router;