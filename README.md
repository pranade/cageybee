# cageybee
##Essential files
* **server.js** a basic node.js express web server. This also includes code that executes when the recording (triggered by twiliotest2.js, below) completes. Upon completion, it thanks the user and then saves the file locally as recording.wav. The way it does this is it looks for the latest recording from our account on the Twilio server and retrieves it
* **twiliotest2.js** This file creates the phone call. It tells twilio to hit the server up for /hellomonkey.xml for TwiML instructions
* **hellomonkey.xml** this provides TwiML instructions to Twilio to trigger a phone call to a particular number. We should move this into the express server as well (will be easier once it has a permanent web URL, otherwise we will need to update the ngrok URL here each time)
* **transcription_v_lowFrequency.js** This file usees IBM (bluemix)'s  Watson API to transcribe a low frequency (phone calls are limited to a sampling rate of 8kHz) wav file into text. It saves it as json to a local text file called message.txt. It reads from a file called recording.wav
