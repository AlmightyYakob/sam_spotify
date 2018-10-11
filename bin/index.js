"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _spotifyInteraction = require("./spotify-interaction");

var _twitterInteraction = require("./twitter-interaction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fs from "fs";
var MINUTES_TO_WAIT = 1;
var MS_TO_WAIT = MINUTES_TO_WAIT * 60 * 1000;
var currentSongID = null;

var main = function main() {
  (0, _spotifyInteraction.getPlayback)(function (res) {
    if (_lodash.default.isEmpty(res)) {
      currentSongID = null;
    } else if (currentSongID !== res.id) {
      currentSongID = res.id;
      (0, _twitterInteraction.postTweet)(res);
    }

    setTimeout(main, MS_TO_WAIT);
  });
};

main();