var { google } = require('googleapis');


function getPlaylistId(auth, channelId) {
    var service = google.youtube('v3');
    var promise = new Promise((resolve, reject) => {
        var parameters = {
            auth: auth,
            part: 'snippet,contentDetails',
            id: channelId,
        }
        console.log(parameters);
        service.channels.list(parameters, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject(err);
                return;
            }
            var channels = response.data.items;
            if (channels == undefined || channels.length == 0) {
                console.log('No channel found.');
                reject(err);
            } else {
                console.log('%s channels found', channels.length);
                console.log('The first channel\'s ID is %s. Its title is \'%s\'.',
                    channels[0].id,
                    channels[0].snippet.title);
                resolve(channels[0].contentDetails.relatedPlaylists.uploads);
            }
        });
    });
    return promise;
}

function getVideoIds(auth, playlistId, pageToken = "") {
    var service = google.youtube('v3');
    var searchPromise = new Promise((resolve, reject) => {
        service.playlistItems.list({
            auth: auth,
            part: 'snippet,contentDetails',
            maxResults: 50,
            playlistId: playlistId,
            pageToken: pageToken
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject(err);
                return;
            }
            var videos = response.data.items;
            console.log('%s video(s) found', videos.length);
            const res = {
                "videos": videos,
                "nextPageToken": response.data.nextPageToken
            }
            resolve(res);
            return;
        });
    });
    var promise = new Promise((resolve, reject) => {
        searchPromise.then(res => {
            const videos = res.videos;
            const nextPageToken = res.nextPageToken;
            console.log(nextPageToken);
            if (nextPageToken != undefined) {
                console.log("Moving onto next page");
                getVideoIds(auth, playlistId, nextPageToken).then(newVideos => {
                    resolve(videos.concat(newVideos));
                    return;
                }).catch(err => { reject(err); });
            } else {
                console.log("Last page");
                resolve(videos);
                return;
            }
        }).catch((err) => {
            reject(err);
            return;
        });
    });
    return promise;
}

function getVideos(auth, videoIds) {
    var service = google.youtube('v3');
    var searchPromise = new Promise((resolve, reject) => {
        var parameters = {
            auth: auth,
            part: 'snippet,contentDetails,statistics',
            id: videoIds.slice(0, 50).join(',')
        }
        service.videos.list(parameters, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                reject(err);
                return;
            }
            var videos = response.data.items;
            console.log('%s video(s) retrieved', videos.length);
            resolve(videos);
            return;
        });
    });
    var promise = new Promise((resolve, reject) => {
        searchPromise.then(videos => {
            if (videoIds.length <= 50) { resolve(videos); return; }
            console.log("Moving onto next batch");
            getVideos(auth, videoIds.slice(50)).then(newVideos => {
                resolve(videos.concat(newVideos));
                return;
            }).catch(err => { reject(err); return; });
        }).catch((err) => {
            reject(err);
            return;
        });
    });
    return promise;
}

module.exports = {
    getPlaylistId: getPlaylistId,
    getVideoIds: getVideoIds,
    getVideos: getVideos
}