"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _spotifyInteraction = require("./spotify-interaction");

var _twitterInteraction = require("./twitter-interaction");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fs from "fs";
const MINUTES_TO_WAIT = 1;
const MS_TO_WAIT = MINUTES_TO_WAIT * 60 * 1000;
const currentSong = {
  id: null,
  name: null
};

const main = () => {
  (0, _spotifyInteraction.getPlayback)(res => {
    if (_lodash.default.isEmpty(res)) {
      currentSong.id = null;
      currentSong.name = null;
    } else if (currentSong.id !== res.id || currentSong.name !== res.name) {
      currentSong.id = res.id;
      currentSong.name = res.name;
      (0, _twitterInteraction.postTweet)(res).catch(err => {
        console.log(err);
      });
    } else {
      console.log(`Still Playing: ${currentSong.name} - ${currentSong.id}`);
    }

    setTimeout(main, MS_TO_WAIT);
  });
};

main();