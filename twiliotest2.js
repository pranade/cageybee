var http = require("http");
var https = require("https");
var accountSid = 'AC09db92561066aa710c0566b9781d0dbb';
var authToken = "047443e3d27230482becadaa3ff69585";
var client = require('twilio')(accountSid, authToken);
var fs = require('fs');
var recordingSids = [];
var recordingURLs = [];

 
client.calls.create({
    url: 'http://30df94c2.ngrok.io/hellomonkey.xml', // Was localhost:3000, now exposing localhost:3000 to public internet via ngrok
    to: '+16503876792', // Log: pranked Matt Insler & Vik
    from: '+16505626104',
    method: 'GET'
}, function(err, call) {
    console.log("Error: "+err);
    console.log("call.sid: "+call.sid);
    console.log("call.uri: https://api.twilio.com/"+call.uri);
    //process.stdout.write(call.sid);
});

client.recordings.list(function(err, data) {
    data.recordings.forEach(function(recording) {
        //console.log("Duration: "+recording.Duration);
        //console.log("SID: "+recording.sid);
        recordingSids.push(recording.sid);
        console.log("URI: https://api.twilio.com/"+recording.uri);
        recordingURLs.push(recording.uri);
    });
});

// make GET request to retriveve our wav file;
for (var i = 0; i < recordingURLs.length; i++) {
	console.log("In for loop");
	var temp = recordingURLs[i].slice(0,-4);
	console.log("Loop element: "+temp);
}
// Pasted code
var file = fs.createWriteStream("recording.wav");
var URL = 'https://api.twilio.com/2010-04-01/Accounts/AC09db92561066aa710c0566b9781d0dbb/Recordings/REda66890b4f47f2842a8980f224ef5b15.wav';

// //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'api.twilio.com',
  path: '/2010-04-01/Accounts/AC09db92561066aa710c0566b9781d0dbb/Recordings/REda66890b4f47f2842a8980f224ef5b15.wav'
};

callback = function(response) {
  response.pipe(file);
}

https.get(options, callback).end();