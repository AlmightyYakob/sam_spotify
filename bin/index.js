"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _spotifyInteraction = require("./spotify-interaction");

var _twitterInteraction = require("./twitter-interaction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fs from "fs";
const MINUTES_TO_WAIT = 1;
const MS_TO_WAIT = MINUTES_TO_WAIT * 60 * 1000;
let currentSongID = null;

const main = () => {
  (0, _spotifyInteraction.getPlayback)(res => {
    if (_lodash.default.isEmpty(res)) {
      currentSongID = null;
    } else if (currentSongID !== res.id) {
      currentSongID = res.id;
      (0, _twitterInteraction.postTweet)(res);
    } else {
      console.log('Still Playing the same thing D A W G');
    }

    setTimeout(main, MS_TO_WAIT);
  });
};

main();