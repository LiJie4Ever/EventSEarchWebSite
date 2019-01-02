var express = require('express');
var SpotifyWebApi = require('spotify-web-api-node');
var router = express.Router();

const ClientID = "f339dc50cb214046b9d395f599ab7f39";
const ClientSecret = "0a7a8cdd242b400492fbe648c0fd0166";

// spotifyApi.searchArtists('Love')
//   .then(function(data) {
//     console.log('Search artists by "Love"', data.body);
//   }, function(err) {
//     console.error(err);
//   });
function getArtistInfo(keyword, callback){
	// spotifyApi.searchArtists('Love')
 //  		.then(function(data) {
 //    	callback(data.body);
 //  	}, function(err) {
 //    	if (err.statusCode == 401) {
 //    		spotifyApi.clientCredentialsGrant().then(
 //  			function(data) {
 //    			console.log('The access token is ' + data.body['access_token']);
 //    			spotifyApi.setAccessToken(data.body['access_token']);

 //  			},
 //  			function(err) {
 //    			console.log('Something went wrong!', err);
 //  			});
 //    	}
 //  	});
 	var spotifyApi = new SpotifyWebApi({
  		clientId: 'f339dc50cb214046b9d395f599ab7f39',
  		clientSecret: '0a7a8cdd242b400492fbe648c0fd0166',
	});
 
 	spotifyApi.clientCredentialsGrant().then(
  	function(data) {
    	console.log('The access token is ' + data.body['access_token']);
    	spotifyApi.setAccessToken(data.body['access_token']);
    	spotifyApi.searchArtists(keyword)
  		.then(function(data) {
    		callback(data.body);
  		}, function(err) {
    		console.error(err);
  		});
  	},
  	function(err) {
    	console.log('Something went wrong!', err);
  	});
}

router.get('/', function(req, res, next){
	var keyword = req.query.artistName;
	getArtistInfo(keyword, function(ret){
		res.send(ret);
	});
});

module.exports = router;
