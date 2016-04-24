//require the Twilio module and create a REST client
var twilio = require('twilio');
var client = new twilio.RestClient('AC09db92561066aa710c0566b9781d0dbb', '047443e3d27230482becadaa3ff69585');

client.sms.messages.create({
    to:'+19178418303',
    from:'+16505626104',
    body:'Bourne, this is officially your first text from a cylon. Welcome to the future.'
}, function(err, message) {
     if (!err) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.body);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log("error: "+err.message);
    }

});
/*

client.makeCall({

    to:'+19176573289', // Any number Twilio can call
    from: '+16505626104', // A number you bought from Twilio and can use for outbound communication
    url: 'localhost:3000/callmemaybe' // A URL that produces an XML document (TwiML) which contains instructions for the call

}, function(err, responseData) {

    //executed when the call has been initiated.
    console.log(responseData.err); // outputs "+14506667788"

});*/

// //Send an SMS text message
// client.sendMessage({

//     to:'+19176573289', // Any number Twilio can deliver to
//     from: '+16505626104', // A number you bought from Twilio and can use for outbound communication
//     body: 'Putin!' // body of the SMS message

// }, function(err, responseData) { //this function is executed when a response is received from Twilio

//     if (!err) { // "err" is an error received during the request, if any

//         // "responseData" is a JavaScript object containing data received from Twilio.
//         // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
//         // http://www.twilio.com/docs/api/rest/sending-sms#example-1

//         console.log(responseData.from); // outputs "+14506667788"
//         console.log(responseData.body); // outputs "word to your mother."

//     }
// });
