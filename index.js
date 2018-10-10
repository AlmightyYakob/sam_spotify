import _ from "lodash";
// import fs from "fs";

import { getPlayback } from './spotify-interaction';
import { postTweet } from './twitter-interaction';

const MINUTES_TO_WAIT = 5;
const MS_TO_WAIT = MINUTES_TO_WAIT*60*1000;

let currentSongID = null;

const main = () => {
    getPlayback(res => {
        if (_.isEmpty(res)){
            currentSongID = null;
        }
        else if (currentSongID !== res.id) {
            currentSongID = res.id;
            postTweet(res);
        }

        setTimeout(main, MS_TO_WAIT);
    });
};

main();