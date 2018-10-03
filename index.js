let SpotifyWebApi = require('spotify-web-api-node');
let { client_id, client_secret } = require('./credentials.js');

// credentials are optional
let spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: 'http://www.example.com/callback'
});

spotifyApi.getMyCurrentPlaybackState({})
    .then(function (data) {
        // Output items
        console.log("Now Playing: ", data.body);
    }, function (err) {
        console.log('Something went wrong!', err);
    });