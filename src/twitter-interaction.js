import Twit from 'twit';
// import request from 'request';
// import fs from "fs";
// import _ from "lodash";

import {
    api_key,
    api_key_secret,
    access_token,
    access_token_secret,
    // redirect_uri,
} from "../credentials/twitter_credentials.json";

const twitter = new Twit({
    consumer_key: api_key,
    consumer_secret: api_key_secret,
    access_token,
    access_token_secret,
});

// const postMedia = () => {
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

export const postTweet = (playInfo) => {
    const status = `Sam is now listening to: ${playInfo.name} by ${playInfo.artists[0].name}.`;
    twitter.post('statuses/update', {
        status,
    }, (err, data) => {
        if (!err) console.log("Post Successful");
        else {
            console.log("ERROR: ", err);
            console.log("DATA: ", data);
        }
    });
};