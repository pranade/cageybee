var http = require("http");
var https = require("https");
var accountSid = 'AC09db92561066aa710c0566b9781d0dbb';
var authToken = "047443e3d27230482becadaa3ff69585";
var client = require('twilio')(accountSid, authToken);
var fs = require('fs');
var recordingSids = [];
var recordingURLs = [];
var recordingWavURLs = [];
var twilioBaseUrl = "https://api.twilio.com";

client.calls.create({
    url: 'http://db617f8d.ngrok.io/hellomonkey.xml', // Was localhost:3000, now exposing localhost:3000 to public internet via ngrok
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
    var iterator = 0;
    data.recordings.forEach(function(recording) {
        
        //console.log("Duration: "+recording.Duration);
        //console.log("SID: "+recording.sid);
        console.log("Iteration: "+iterator);
        recordingSids.push(recording.sid);
        //console.log("URI: https://api.twilio.com/"+recording.uri);
        recordingURLs.push(recording.uri);
        // List all recordingURLs (where the audio files sit on twilio) and strip off the .json at the end and replace it with .wav
        //for (var i = 0; i < recordingURLs.length; i++) {
        // set temp equal to the latest recording URL. Strip off the .json extension and replace it with .wav
        var temp = recordingURLs[iterator].slice(0,-4);
        temp = temp.concat("wav");//console.log("Loop element: "+temp);
        recordingWavURLs.push(temp);
        iterator++;
    });    
    var file = fs.createWriteStream("recording.wav");        

    // OK, need to dump this shit into a callback function... I think I can use client.recordings.list's callback for this
    var options = {
      host: 'api.twilio.com',
      path: recordingWavURLs[0]
    };

    callback = function(response) {
      response.pipe(file);
    }

    https.get(options, callback).end();
});

// Pasted code

//var URL = 'https://api.twilio.com/2010-04-01/Accounts/AC09db92561066aa710c0566b9781d0dbb/Recordings/REda66890b4f47f2842a8980f224ef5b15.wav';

// //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'

// Prepare to write file to recording.wav
