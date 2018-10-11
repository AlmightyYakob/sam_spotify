import SpotifyWebApi from "spotify-web-api-node";
import express from 'express';
import {
    client_id,
    client_secret,
    redirect_uri,
} from "../credentials/spotify_credentials.json";

const scopes = 'user-read-playback-state user-read-currently-playing';
const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
});
const authorizationURL = spotifyApi.createAuthorizeURL([scopes]);

const app = express();
app.get('/sam-spotify', (req, res) => {
    res.redirect(authorizationURL);
});

app.get('/sam-spotify/callback', (req, res) => {
    // Callback URI with passed access code.
    res.send("Hey thanks").end();

    const code = req.query.code || null;
    console.log(code);

    spotifyApi.authorizationCodeGrant(code).then(
        (data) => {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);

            // Set the access token on the API object to use it in later calls
            spotifyApi.setAccessToken(data.body.access_token);
            spotifyApi.setRefreshToken(data.body.refresh_token);

            spotifyApi.getMyCurrentPlaybackState({}).then(
                data => {
                    // Output items
                    console.log("Now Playing: ", data.body);
                },
                err => {
                    console.log("Something went wrong!", err);
                }
            );
        },
        (err) => {
            console.log('Something went wrong!', err);
        }
    );
});

app.listen(8888);
console.log('Listening on 8888');