query = "some string with youtube discord javascript etc."

var fs = require('fs');

var videos = JSON.parse(fs.readFileSync("frontend/src/data/videos.json"));

compare = (arr1, arr2) => arr1.reduce((a, c) => a + arr2.includes(c), 0);

function unique_words(string) {
    
    var commonWords = ['i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of','on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www'];

    // Convert to lowercase
    string = string.toLowerCase();

    // replace unnesessary chars. leave only chars, numbers and space
    string = string.replace(/[^\w\d ]/g, '');

    var result = string.split(' ');

    // remove $commonWords
    result = result.filter(function (word) {
    return commonWords.indexOf(word) === -1;
    });

    // Unique words
    result = [... new Set(result)];
    return(result);
}

videos.forEach(function(video) {
    console.log(video);
    var str2 = video.snippet.tags.join(' ');
    video.matches = Math.min(compare(unique_words(query), unique_words(str2)), 3);
})

videos.sort(function(a, b){
    return a.matches - b.matches;
}).sort(function(a, b){
    return a.statistics.likeCount - b.statistics.likeCount;
}).reverse();

console.log(videos)