import _ from "lodash";
// import fs from "fs";

import { getPlayback } from './spotify-interaction';
import { postTweet } from './twitter-interaction';

const MINUTES_TO_WAIT = 1;
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
        else {
            console.log('Still Playing the same thing D A W G');
        }

        setTimeout(main, MS_TO_WAIT);
    });
};

main();