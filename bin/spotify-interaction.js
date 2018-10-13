"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlayback = void 0;

var _spotifyWebApiNode = _interopRequireDefault(require("spotify-web-api-node"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _spotify_credentials = require("../credentials/spotify_credentials.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _dirname = _path.default.resolve();

const CREDENTIALS_FILE = `${_dirname}/credentials/spotify_credentials.json`;
const spotifyApi = new _spotifyWebApiNode.default({
  clientId: _spotify_credentials.client_id,
  clientSecret: _spotify_credentials.client_secret,
  redirectUri: _spotify_credentials.redirect_uri
});
spotifyApi.setAccessToken(_spotify_credentials.access_token);
spotifyApi.setRefreshToken(_spotify_credentials.refresh_token);

const getPlayback = callback => {
  spotifyApi.getMyCurrentPlaybackState({}).then(data => {
    if (_lodash.default.isEmpty(data.body)) {
      console.log("Not playing anything!");
      callback({});
    } else {
      // console.log(JSON.stringify(data.body, null, 4));
      const selected = _lodash.default.pick(data.body.item, ['external_urls.spotify', 'artists[0]', 'name', 'id', 'album.images[0].url', 'is_local']); // console.log("Current Track: ", selected);


      callback(selected);
    }
  }, err => {
    console.log("Something went wrong!", err);
    refreshAccessToken(() => {
      getPlayback(callback);
    });
  }).catch(rej => {
    console.log("REJECT: ", rej);
  });
};

exports.getPlayback = getPlayback;

const refreshAccessToken = callback => {
  spotifyApi.refreshAccessToken().then(data => {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body.access_token); // console.log(data.body.access_token);

    console.log("The access token has been refreshed!"); // Write access token to credentials file to be used in the future

    const credentials = JSON.parse(_fs.default.readFileSync(CREDENTIALS_FILE));
    credentials.access_token = spotifyApi.getAccessToken();

    _fs.default.writeFileSync(CREDENTIALS_FILE, JSON.stringify(credentials, null, 4));

    callback();
  }, err => {
    console.log("Could not refresh access token", err);
  }).catch(rej => {
    console.log("REJECT: ", rej);
  });
};