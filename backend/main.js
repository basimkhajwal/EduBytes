var search = require('./search');
var path = require('path');
var authenticate = require('./authenticate');
var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');

function getChannelInfo() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'channel_names.json')));
}

function main() {
    const RESULTFILEPATH = path.join(__dirname, 'videos.json');
    const channelInfo = getChannelInfo();
    fs.writeFileSync(RESULTFILEPATH, '[]');
    const f = (async (channelId) => {
        try {
            const auth = await authenticate.authorize();
            if (auth == undefined) { throw new Error('Authentication failed.'); }
            const pid = await search.getPlaylistId(auth, channelId);
            if (pid == undefined) { throw new Error('Playlist ID not found.'); }
            var videoIds = await search.getVideoIds(auth, pid);
            if (videoIds == undefined) { throw new Error('Video IDs not found.'); }
            videoIds = videoIds.map((video) => video.contentDetails.videoId);
            const videos = await search.getVideos(auth, videoIds);
            if (videos == undefined) { throw new Error('Videos not found.'); }
            console.log('%s video(s) found', videos.length);
            const res = JSON.parse(fs.readFileSync(RESULTFILEPATH));
            res.push(...videos);
            fs.writeFileSync(RESULTFILEPATH, JSON.stringify(res));
            console.log('Results saved at', RESULTFILEPATH);
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
    channelInfo.forEach(x => { console.log("Grabbing", x.channelName, "..."); f(x.channelId); });
    return true;
}

main();