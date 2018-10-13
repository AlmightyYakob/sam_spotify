"use strict";

var _spotifyWebApiNode = _interopRequireDefault(require("spotify-web-api-node"));

var _express = _interopRequireDefault(require("express"));

var _spotify_credentials = require("../credentials/spotify_credentials.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const scopes = 'user-read-playback-state user-read-currently-playing';
const spotifyApi = new _spotifyWebApiNode.default({
  clientId: _spotify_credentials.client_id,
  clientSecret: _spotify_credentials.client_secret,
  redirectUri: _spotify_credentials.redirect_uri
});
const authorizationURL = spotifyApi.createAuthorizeURL([scopes]);
const app = (0, _express.default)();
app.get('/sam-spotify', (req, res) => {
  res.redirect(authorizationURL);
});
app.get('/sam-spotify/callback', (req, res) => {
  // Callback URI with passed access code.
  res.send("Hey thanks").end();
  const code = req.query.code || null;
  console.log(code);
  spotifyApi.authorizationCodeGrant(code).then(data => {
    console.log('The token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    console.log('The refresh token is ' + data.body['refresh_token']); // Set the access token on the API object to use it in later calls

    spotifyApi.setAccessToken(data.body.access_token);
    spotifyApi.setRefreshToken(data.body.refresh_token);
  }, err => {
    console.log('Something went wrong!', err);
  });
});
app.listen(8888);
console.log('Listening on 8888');