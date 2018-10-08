// import _ from "lodash";
// import fs from "fs";

import { getPlayback } from './spotify-interaction';
import { postTweet } from './twitter-interaction';

getPlayback(res => {
    console.log(res);
    console.log(res.album.images[0].url);
    postTweet(res, 'test2');
});

// const checkStatus () => {

// };