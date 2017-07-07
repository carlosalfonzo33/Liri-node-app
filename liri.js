var keys = require("./keys.js");
var twitter = require("twitter");
var fs = require("fs");
var liriCommand = process.argv[2];
var twitterKeys = keys.twitterKeys;

var twitterUser = new twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
});

//console.log(twitterUser.consumer_key);    

switch(liriCommand) {
    case "my-tweets":
    myTweets();
    break;
}

function myTweets(){
    twitterUser.get('search/tweets', {q: 'carlosalfonzo33', count: 20}, function(error, tweet, response) {
        if(error){
            console.log(error);
        }else{
            console.log(tweet);
        }
    });
};