// import request from 'request';
import {
    Twitter,
} from 'twitter-node-client';

// import _ from "lodash";
// import fs from "fs";

import {
    api_key,
    api_key_secret,
    access_token,
    access_token_secret,
    redirect_uri,
} from "./twitter_credentials.json";

const twitter = new Twitter({
    consumerKey: api_key,
    consumerSecret: api_key_secret,
    accessToken: access_token,
    accessTokenSecret: access_token_secret,
    callBackUrl: redirect_uri,
});

export const postTweet = (status) => {
    twitter.postTweet({
        status,
    }, err => {
        console.log("ERROR: ", err);
    }, () => {
        console.log("SUCCESS");
    });
}