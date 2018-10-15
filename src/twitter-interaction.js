import Twit from 'twit';
import fetch from 'node-fetch';
// import fs from "fs";
// import _ from "lodash";

import {
    api_key,
    api_key_secret,
    access_token,
    access_token_secret,
} from "../credentials/twitter_credentials.json";

const twitter = new Twit({
    consumer_key: api_key,
    consumer_secret: api_key_secret,
    access_token,
    access_token_secret,
});

const postMedia = (imageURL) => {
    return new Promise((resolve, reject) => {
        fetch(imageURL)
            .then(res => res.buffer())
            .then(buffer => {
                const base64String = Buffer.from(buffer, 'binary').toString('base64');

                twitter.post('media/upload', { media_data: base64String },
                    (err, data) => {
                        if (!err) {
                            console.log("Media Upload Successful");
                            console.log(data);
                            resolve(data);
                        }
                        else reject(err);
                    });
            })
            .catch(err => { console.log("ERROR: ", err); });
    });
};

export const postTweet = async (playInfo) => {
    const params = {};
    params.status = `Sam is now listening to: ${playInfo.name}`;
    if (playInfo.is_local && playInfo.artists[0].name == "") params.status = `${params.status}.`;
    else params.status = `${params.status} by ${playInfo.artists[0].name}.`;

    if (playInfo.external_urls && playInfo.external_urls.spotify !== '') params.status = `${params.status}\n\n${playInfo.external_urls.spotify}`;

    if (playInfo.album && (playInfo.album.images.length > 1) && playInfo.album.images[1].url) {
        const mediaUploadResponse = await postMedia(playInfo.album.images[1].url).catch(err => { console.log(err); });
        if (mediaUploadResponse !== undefined) params.media_ids = [mediaUploadResponse.media_id_string];
    }

    twitter.post('statuses/update', params, (err, data) => {
        if (!err) console.log("Posted: ", params.status);
        else {
            console.log("ERROR: ", err);
            console.log("DATA: ", data);
        }
    });
};
