"use strict";

var _spotifyWebApiNode = _interopRequireDefault(require("spotify-web-api-node"));

var _express = _interopRequireDefault(require("express"));

var _credentials = require("./credentials.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scopes = 'user-read-playback-state user-read-currently-playing';
var spotifyApi = new _spotifyWebApiNode.default({
  clientId: _credentials.client_id,
  clientSecret: _credentials.client_secret,
  redirectUri: _credentials.redirect_uri
});
var authorizationURL = spotifyApi.createAuthorizeURL([scopes]);
var app = (0, _express.default)();
app.get('/sam-spotify', function (req, res) {
  res.redirect(authorizationURL);
});
app.get('/sam-spotify/callback', function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  res.send("Hey thanks").end();
  var code = req.query.code || null;
  console.log(code);
  spotifyApi.authorizationCodeGrant(code).then(function (data) {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']); // Set the access token on the API object to use it in later calls

    spotifyApi.setAccessToken(data.body.access_token);
    spotifyApi.setRefreshToken(data.body.refresh_token);
    spotifyApi.getMyCurrentPlaybackState({}).then(function (data) {
      // Output items
      console.log("Now Playing: ", data.body);
    }, function (err) {
      console.log("Something went wrong!", err);
    });
  }, function (err) {
    console.log('Something went wrong!', err);
  });
});
app.listen(8888);
console.log('Listening on 8888');