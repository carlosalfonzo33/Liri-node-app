var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var value = "";
var fs = require("fs");
var liriCommand = process.argv[2];
var searchTitle = process.argv[3];
var twitterKeys = keys.twitterKeys;
var twitterUser = new twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
});
var clientSpotify = new spotify({
    id: "ff2a3cc226c943ea818893c3844831b5",
    secret: "0d9d0344157640f2b3cc2ccdc9b733fb"
});



//console.log(twitterUser.consumer_key);    

switch (liriCommand) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
    mySpotify();
    break;
}


// function for Twitter 
function myTweets() {
    twitterUser.get('statuses/user_timeline', {
        q: 'carlosalfonzo33',
        count: 20
    }, function(error, tweet, response) {
        if (!error) {
            for (var i = 0; i < tweet.length; i++) {
                console.log(tweet[i].text);
                console.log(tweet[i].created_at);
                console.log('====================================================');
                append(tweet[i].text + '\n');
                append(tweet[i].created_at + '\n');
                append('=====================================================\n');


            }
        }
    });
};

// function for Spotify


function mySpotify() {

        if (!searchTitle){
        searchTitle = 'Ace Of Base - The Sign';
    }

        clientSpotify.search({ type: 'track', query: searchTitle }, function(error, data) {
    
        if (error) {
            return console.log('Error occurred: ' + error);
        }
     
        for (var i = 0; i < data.tracks.items.length; i++) {

            var response = data.tracks.items[i];
        
            console.log(
                '\n' +
                'Artist(s): ' + response.artists[0].name + '\n' +
                'Track Name: ' + response.name  + '\n' +
                'Track Preview: ' + response.preview_url + '\n' +
                'Album: ' + response.album.name
            )
        }

    });
}

function append(append) {
    fs.appendFile('log.txt', append, (err) => {
        if (err) throw err;
    });
}

