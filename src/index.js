import _ from "lodash";
// import fs from "fs";

import { getPlayback } from './spotify-interaction';
import { postTweet } from './twitter-interaction';

const MINUTES_TO_WAIT = 1;
const MS_TO_WAIT = MINUTES_TO_WAIT * 60 * 1000;

const currentSong = {
    id: null,
    name: null,
};

const main = () => {
    getPlayback(res => {
        if (_.isEmpty(res)) {
            currentSong.id = null;
            currentSong.name = null;
        }
        else if (currentSong.id !== res.id || currentSong.name !== res.name) {
            currentSong.id = res.id;
            currentSong.name = res.name;
            postTweet(res).catch(err => { console.log(err); });
        }
        else {
            console.log(`Still Playing: ${currentSong.name} - ${currentSong.id}`);
        }

        setTimeout(main, MS_TO_WAIT);
    });
};

main();