var express = require('express');
var app = express();
var path = require('path');
var twilio = require('twilio');
var resp = new twilio.TwimlResponse();
var fs = require('fs');
var https = require("https");
var accountSid = 'AC09db92561066aa710c0566b9781d0dbb';
var authToken = "047443e3d27230482becadaa3ff69585";
var client = require('twilio')(accountSid, authToken);
var recordingURLs = [];
var recordingWavURLs = [];
var twilioHost = 'api.twilio.com';

app.use(express.static('public'));

app.get('/finishedrecording', function (req,res) {
	resp.say('Thank you for using KGB, agent Hunt.', {
		voice:'woman',
		language:'en-gb'
	});
	res.type('text/xml');
	res.send(resp.toString());

	client.recordings.list(function(err, data) {
	    // iterator tracks us as we step through all recordings on the twilio server, for our account
	    var iterator = 0;
	    
	    data.recordings.forEach(function(recording) {
	        
	        console.log("Iteration: "+iterator);
	        //recordingSids.push(recording.sid);
	        recordingURLs.push(recording.uri);
	        
	        // Change recordingURL to map to .wav file, vs .json and push to reocordingWavURLs array
	        var temp = recordingURLs[iterator].slice(0,-4);
	        temp = temp.concat("wav");
	        recordingWavURLs.push(temp);
	        iterator++;
	    });    
	    var file = fs.createWriteStream("recording.wav");        

	    var options = {
	      host: twilioHost,
	      path: recordingWavURLs[0] // request the newest recording from the server (twilio adds newest recordings to the front of the array)
	    };

	    callback = function(response) {
	      response.pipe(file); // wrires the repsonse to the file
	    }

	    https.get(options, callback).end(); // we want to call this only once we know that the recording has completed!
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});