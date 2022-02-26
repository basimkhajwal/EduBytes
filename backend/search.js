var { google } = require('googleapis');

function getChannel(auth, username) {
    var service = google.youtube('v3');
    var promise = new Promise((resolve, reject) => {
        service.channels.list({
            auth: auth,
            part: 'snippet,contentDetails,statistics',
            forUsername: username
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject(err);
            }
            var channels = response.data.items;
            console.log(channels);
            if (channels.length == 0) {
                console.log('No channel found.');
                reject(err);
            } else {
                console.log('%s channels found', channels.length);
                console.log('The first channel\'s ID is %s. Its title is \'%s\', and ' +
                    'it has %s views.',
                    channels[0].id,
                    channels[0].snippet.title,
                    channels[0].statistics.viewCount);
                resolve(channels[0]);
            }
        });
    });
    promise.then(function (result) {
        return result;
    }).catch(function (err) {
        console.log(err);
    });

}

function getVideos(auth, playlistId) {
    var service = google.youtube('v3');
    service.playlistItems.list({
        auth: auth,
        part: 'snippet',
        maxResults: 50,
        playlistId: playlistId
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var videos = response.data.items;
        console.log(videos);
        if (videos.length == 0) {
            console.log('No video found.');
        } else {
            console.log('%s videos found', videos.length);
            return videos;
        }
    });
}

module.exports = {
    getChannel: getChannel,
    getVideos: getVideos
}