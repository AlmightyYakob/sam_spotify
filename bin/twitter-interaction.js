"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postTweet = void 0;

var _twit = _interopRequireDefault(require("twit"));

var _twitter_credentials = require("../credentials/twitter_credentials.json");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import request from 'request';
// import fs from "fs";
// import _ from "lodash";
var twitter = new _twit.default({
  consumer_key: _twitter_credentials.api_key,
  consumer_secret: _twitter_credentials.api_key_secret,
  access_token: _twitter_credentials.access_token,
  access_token_secret: _twitter_credentials.access_token_secret
}); // const postMedia = () => {
//     // request({
//     //     encoding: null,
//     //     method: 'GET',
//     //     url: playInfo.album.images[0].url,
//     // }, (err, res, body) => {
//     //     if (err) console.log(err);
//     //     else {
//     //         const image = body;
//     //         fs.writeFileSync('./image.png', image);
//     //         // twitter.post('media/upload', {
//     //         //     media_data: image,
//     //         // },
//     //         // (err, data) => {
//     //         //     if (!err) console.log("Post Successful");
//     //         //     else {
//     //         //         console.log("ERROR: ", err);
//     //         //         console.log("DATA: ", data);
//     //         //     }
//     //         // });
//     //     }
//     // });
//     // twitter.post('media/upload',
//     //     {
//     //         media_data: playInfo.album.images[0].url,
//     //     },
//     //     (err, data) => {
//     //         if (!err) console.log("Post Successful");
//     //         else {
//     //             console.log("ERROR: ", err);
//     //             console.log("DATA: ", data);
//     //         }
//     //     });
// };

var postTweet = function postTweet(playInfo) {
  var status = "Sam is now listening to: ".concat(playInfo.name, " by ").concat(playInfo.artists[0].name, ".");
  twitter.post('statuses/update', {
    status: status
  }, function (err, data) {
    if (!err) console.log("Post Successful");else {
      console.log("ERROR: ", err);
      console.log("DATA: ", data);
    }
  });
};

exports.postTweet = postTweet;