var search = require('./search');
var path = require('path');
var authenticate = require('./authenticate');
var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');

function main() {
    const RESULTFILEPATH = path.join(__dirname, 'videos.json');
    return (async () => {
        try {
            const auth = await authenticate.authorize();
            const pid = await search.getPlaylistId(auth, "", 'UCYO_jab_esuFRV4b17AJtAw');
            var videoIds = await search.getVideoIds(auth, pid);
            videoIds = videoIds.map((video) => video.contentDetails.videoId);
            const videos = await search.getVideos(auth, videoIds);
            console.log('%s video(s) found', videos.length);
            fs.writeFileSync(RESULTFILEPATH, JSON.stringify(videos));
            console.log('Results saved at', RESULTFILEPATH);
        } catch (err) {
            console.log(err);
        }
    })();
}

main();