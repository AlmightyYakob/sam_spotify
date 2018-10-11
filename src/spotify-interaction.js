import SpotifyWebApi from "spotify-web-api-node";
import _ from "lodash";
import fs from "fs";
import path from "path";

import {
    client_id,
    client_secret,
    redirect_uri,
    access_token,
    refresh_token,
} from "../credentials/spotify_credentials.json";
const __dirname = path.resolve();
const CREDENTIALS_FILE = `${__dirname}/credentials/spotify_credentials.json`;

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
});

spotifyApi.setAccessToken(access_token);
spotifyApi.setRefreshToken(refresh_token);

export const getPlayback = (callback) => {
    spotifyApi.getMyCurrentPlaybackState({}).then(
        data => {
            if (_.isEmpty(data.body)) {
                console.log("Not playing anything!");
                callback({});
            } else {
                const selected = _.pick(data.body.item,
                    [
                        'external_urls.spotify',
                        'artists[0]',
                        'name',
                        'id',
                        'album.images[0].url',
                    ]
                );

                callback(selected);
            }
        },
        err => {
            console.log("Something went wrong!", err);
            refreshAccessToken(() => {
                getPlayback(callback);
            });
        }
    ).catch(rej => {
        console.log("REJECT: ", rej);
    });;
};

const refreshAccessToken = (callback) => {
    spotifyApi.refreshAccessToken().then(
        data => {
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body.access_token);
            console.log(data.body.access_token);

            console.log("The access token has been refreshed!");

            // Write access token to credentials file to be used in the future
            const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_FILE));
            credentials.access_token = spotifyApi.getAccessToken();
            fs.writeFileSync(
                CREDENTIALS_FILE,
                JSON.stringify(credentials, null, 4)
            );
            callback();
        },
        err => {
            console.log("Could not refresh access token", err);
        }
    ).catch(rej => {
        console.log("REJECT: ", rej);
    });
};