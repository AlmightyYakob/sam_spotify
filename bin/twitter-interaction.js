"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postTweet = void 0;

var _twit = _interopRequireDefault(require("twit"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _twitter_credentials = require("../credentials/twitter_credentials.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fs from "fs";
// import _ from "lodash";
const twitter = new _twit.default({
  consumer_key: _twitter_credentials.api_key,
  consumer_secret: _twitter_credentials.api_key_secret,
  access_token: _twitter_credentials.access_token,
  access_token_secret: _twitter_credentials.access_token_secret
});

const postMedia = imageURL => {
  return new Promise((resolve, reject) => {
    (0, _nodeFetch.default)(imageURL).then(res => res.buffer()).then(buffer => {
      const base64String = Buffer.from(buffer, 'binary').toString('base64');
      twitter.post('media/upload', {
        media_data: base64String
      }, (err, data) => {
        if (!err) {
          console.log("Media Upload Successful");
          console.log(data);
          resolve(data);
        } else reject(err);
      });
    }).catch(err => {
      console.log("ERROR: ", err);
    });
  });
};

const postTweet = async playInfo => {
  const params = {};
  params.status = `Sam is now listening to: ${playInfo.name}`;
  if (playInfo.is_local && playInfo.artists[0].name == "") params.status = `${params.status}.`;else params.status = `${params.status} by ${playInfo.artists[0].name}.`;
  if (playInfo.external_urls && playInfo.external_urls.spotify !== '') params.status = `${params.status}\n\n${playInfo.external_urls.spotify}`;

  if (playInfo.album && playInfo.album.images.length > 1 && playInfo.album.images[1].url) {
    const mediaUploadResponse = await postMedia(playInfo.album.images[1].url).catch(err => {
      console.log(err);
    });
    if (mediaUploadResponse !== undefined) params.media_ids = [mediaUploadResponse.media_id_string];
  }

  twitter.post('statuses/update', params, (err, data) => {
    if (!err) console.log("Posted: ", params.status);else {
      console.log("ERROR: ", err);
      console.log("DATA: ", data);
    }
  });
};

exports.postTweet = postTweet;