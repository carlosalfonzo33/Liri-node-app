var keys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");
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

    case "movie-this":
    myMovie();
    break;

    case "do-what-it-says":
    mySays();
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
                append('Artist(s): ' + response.artists[0].name + '\n');
                append('Track Name: ' + response.name  + '\n');
                append('Track Preview: ' + response.preview_url + '\n');
                append('Album: ' + response.album.name + '\n');
                append('=====================================================\n');
        }

    });
}

// Funtion for Movie this. 

function myMovie(){

     if (!searchTitle){
        searchTitle = 'Mr. Nobody';
    }
    var omdbUrl = "http://www.omdbapi.com/?&t=" + searchTitle + "&apikey=40e9cece";
    console.log(searchTitle);
    
    request(omdbUrl, function (error, response, body) {
                
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        var movie = JSON.parse(body);
            
        console.log(
            '\n' +
            'Title: ' + movie.Title + '\n' +
            'Year: '+ movie.Year + '\n' +
            'IMDB Rating: ' + movie.imdbRating + '\n' +
            'Rotten Tomatoes Rating: ' + movie.Ratings[1].Value + '\n' +
            'Country: ' + movie.Country + '\n' +
            'Language: ' + movie.Language + '\n' +
            'Plot: ' + movie.Plot + '\n' +
            'Actors: ' + movie.Actors + '\n'
        );
            append('=====================================================\n');
            append('Title: ' + movie.Title + '\n');
            append('Year: '+ movie.Year + '\n');
            append('IMDB Rating: ' + movie.imdbRating + '\n');
            append('Rotten Tomatoes Rating: ' + movie.Ratings[1].Value + '\n');
            append('Country: ' + movie.Country + '\n');
            append('Language: ' + movie.Language + '\n');
            append('Plot: ' + movie.Plot + '\n');
            append('Actors: ' + movie.Actors + '\n');
            append('\n');
            

    });
}

// Function for do-what-it-says

function mySays(){
     fs.readFile("random.txt", "utf8", function(error, data) {
            
        if (error) {
            return console.log('Error occurred: ' + error);
        }
    
        var splitData = data.split(",");

        clientSpotify.search({ type: 'track', query: splitData[1] }, function(error, data) {
            
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
                    append('=====================================================\n');
                    append('Artist(s): ' + response.artists[0].name + '\n');
                    append('Track Name: ' + response.name  + '\n');
                    append('Track Preview: ' + response.preview_url + '\n');
                    append('Album: ' + response.album.name);
                    append('\n');
        });
    });
}


function append(append) {
    fs.appendFile('log.txt', append, (err) => {
        if (err) throw err;
    });
}

