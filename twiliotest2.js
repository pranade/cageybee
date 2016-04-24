var accountSid = 'AC09db92561066aa710c0566b9781d0dbb';
var authToken = "047443e3d27230482becadaa3ff69585";
var client = require('twilio')(accountSid, authToken);
 
client.calls.create({
    url: 'http://ba789785.ngrok.io/', // Was localhost:3000, now exposing localhost:3000 to public internet via ngrok
    to: '+19176573289',
    from: '+16505626104',
    method: 'GET'
}, function(err, call) {
    console.log("Error: "+err);
    console.log("call.sid: "+call.sid);
    //process.stdout.write(call.sid);
});