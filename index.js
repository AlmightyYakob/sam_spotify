import SpotifyWebApi from "spotify-web-api-node";
import _ from 'lodash';
import {
    client_id,
    client_secret,
    redirect_uri,
    access_token,
    refresh_token,
} from "./credentials.json";

const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
});
spotifyApi.setAccessToken(access_token);
spotifyApi.setRefreshToken(refresh_token);

const getPlayback = () => {
    spotifyApi.getMyCurrentPlaybackState({}).then(
        data => {
            // Output items
            console.log(data);
            if (_.isEmpty(data.body)){
                console.log("Not playing anything!");
            }
            else{
                console.log(data.body.item);
                console.log(`Now Playing: ${data.body.item.name} by ${data.body.item.artists[0].name}`);
                console.log("ID: ", data.body.item.id);
            }
        },
        err => {
            console.log("Something went wrong!", err);
            refreshAccessToken();
        }
    );
};

const refreshAccessToken = () => {
    spotifyApi.refreshAccessToken().then(
        (data) => {
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body.access_token);
            console.log(data.body.access_token);

            console.log('The access token has been refreshed!');
        },
        (err) => {
            console.log('Could not refresh access token', err);
        }
    );
};

getPlayback();