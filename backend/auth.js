var search = require("./search");
var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';


function getAuth() {
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        JSON.parse(content);
    });
}


// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // authorize(JSON.parse(content), (auth => search.getChannel(auth, 'GoogleDevelopers')));
    // Authorize a client with the loaded credentials, then call the YouTube API.
    (async () => {
        try {
            const auth = await authorize(JSON.parse(content));
            const channel = await search.getChannel(auth, 'GoogleDevelopers');
            const playlist = await search.getVideos(auth, channel.contentDetails.relatedPlaylists.uploads);
            console.log(playlist);

        } catch (err) {
            // console.log(err);
            console.log("here");
        }
    })();
    // var playlistId = channel.contentDetails.relatedPlaylists.uploads;
    // var playlist = authorize(JSON.parse(content), (auth => getVideos(auth, playlistId)));
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    return new Promise((resolve, reject) => {
        fs.readFile(TOKEN_PATH, function (err, token) {
            if (err) {
                getNewToken(oauth2Client, resolve);
            } else {
                oauth2Client.credentials = JSON.parse(token);
                resolve(oauth2Client);
            }
        });
    })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) throw err;
        console.log('Token stored to ' + TOKEN_PATH);
    });
}

// function getChannel(auth, username) {
//     var service = google.youtube('v3');
//     service.channels.list({
//         auth: auth,
//         part: 'snippet,contentDetails,statistics',
//         forUsername: username
//     }, function (err, response) {
//         if (err) {
//             console.log('The API returned an error: ' + err);
//             return;
//         }
//         var channels = response.data.items;
//         console.log(channels);
//         if (channels.length == 0) {
//             console.log('No channel found.');
//             return;
//         } else {
//             console.log('%s channels found', channels.length);
//             console.log('The first channel\'s ID is %s. Its title is \'%s\', and ' +
//                 'it has %s views.',
//                 channels[0].id,
//                 channels[0].snippet.title,
//                 channels[0].statistics.viewCount);
//             return channels[0];
//         }
//     });
// }

// function getVideos(auth, playlistId) {
//     var service = google.youtube('v3');
//     service.playlistItems.list({
//         auth: auth,
//         part: 'snippet',
//         maxResults: 50,
//         playlistId: playlistId
//     }, function (err, response) {
//         if (err) {
//             console.log('The API returned an error: ' + err);
//             return;
//         }
//         var videos = response.data.items;
//         console.log(videos);
//         if (videos.length == 0) {
//             console.log('No video found.');
//         } else {
//             console.log('%s videos found', videos.length);
//             return videos;
//         }
//     });
// }