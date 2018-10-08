// import request from 'request';
// import {
//     Twitter,
// } from 'twitter-node-client';

import Twit from 'twit';

// import _ from "lodash";
// import fs from "fs";

import {
    api_key,
    api_key_secret,
    access_token,
    access_token_secret,
    // redirect_uri,
} from "./credentials/twitter_credentials.json";

// const twitter = new Twitter({
//     consumerKey: api_key,
//     consumerSecret: api_key_secret,
//     accessToken: access_token,
//     accessTokenSecret: access_token_secret,
//     callBackUrl: redirect_uri,
// });

const twitter = new Twit({
    consumer_key: api_key,
    consumer_secret: api_key_secret,
    access_token,
    access_token_secret,
});

export const postTweet = (playInfo, status) => {

    // twitter.post('media/upload',
    //     {
    //         media_data: playInfo.album.images[0].url,
    //     },
    //     (err, data) => {
    //         if (!err) console.log("Post Successful");
    //         else {
    //             console.log("ERROR: ", err);
    //             console.log("DATA: ", data);
    //         }
    //     });
    twitter.post('statuses/update', {
        status: status += ' ' + playInfo.album.images[0].url,
    }, (err, data) => {
        if (!err) console.log("Post Successful");
        else {
            console.log("ERROR: ", err);
            console.log("DATA: ", data);
        }
    });

    // twitter.postTweet({
    //     status,
    // }, err => {
    //     console.log("ERROR: ", err);
    // }, () => {
    //     console.log("SUCCESS");
    // });
};