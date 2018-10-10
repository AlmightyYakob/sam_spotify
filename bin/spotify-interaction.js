"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlayback = void 0;

var _spotifyWebApiNode = _interopRequireDefault(require("spotify-web-api-node"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _spotify_credentials = require("./credentials/spotify_credentials.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CREDENTIALS_FILE = "./credentials/spotify_credentials.json";
var spotifyApi = new _spotifyWebApiNode.default({
  clientId: _spotify_credentials.client_id,
  clientSecret: _spotify_credentials.client_secret,
  redirectUri: _spotify_credentials.redirect_uri
});
spotifyApi.setAccessToken(_spotify_credentials.access_token);
spotifyApi.setRefreshToken(_spotify_credentials.refresh_token);

var getPlayback = function getPlayback(callback) {
  spotifyApi.getMyCurrentPlaybackState({}).then(function (data) {
    if (_lodash.default.isEmpty(data.body)) {
      console.log("Not playing anything!");
      callback({});
    } else {
      // Relevant paths:
      // data.body.item.external_urls.spotify = song link
      // data.body.item.artists[0] = artist
      // data.body.item.name = name
      // data.body.item.id = song id
      // data.body.item.album.images[0].url = album image
      var selected = _lodash.default.pick(data.body.item, ['external_urls.spotify', 'artists[0]', 'name', 'id', 'album.images[0].url']);

      callback(selected);
    }
  }, function (err) {
    console.log("Something went wrong!", err);
    refreshAccessToken(function () {
      getPlayback(callback);
    });
  });
};

exports.getPlayback = getPlayback;

var refreshAccessToken = function refreshAccessToken(callback) {
  spotifyApi.refreshAccessToken().then(function (data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body.access_token);
    console.log(data.body.access_token);
    console.log("The access token has been refreshed!"); // Write access token to credentials file to be used in the future

    var credentials = JSON.parse(_fs.default.readFileSync(CREDENTIALS_FILE));
    credentials.access_token = spotifyApi.getAccessToken();

    _fs.default.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 4));

    callback();
  }, function (err) {
    console.log("Could not refresh access token", err);
  });
};