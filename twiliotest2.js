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
    url: 'http://b3be142e.ngrok.io/hellomonkey.xml', // Was localhost:3000, now exposing localhost:3000 to public internet via ngrok
    to: '+16503876792', 
    from: '+16505626104',
    method: 'GET'
}, function(err, call) {
    console.log("Error: "+err);
    console.log("call.sid: "+call.sid);
    console.log("call.uri: https://api.twilio.com/"+call.uri);
});

