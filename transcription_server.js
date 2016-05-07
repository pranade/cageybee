var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
   password: 'X45twbw841Ix',
  username: '554040b8-dca0-4cd9-80b6-387e09d034c6',
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api'
});

var params = {
  content_type: 'audio/wav',
  continuous: true,
  interim_results: true,
  inactivity_timeout: 30,
  timestamps: true
};

// Create the stream.
var recognizeStream = speech_to_text.createRecognizeStream(params);

// Pipe in some audio.
fs.createReadStream('recording.wav').pipe(recognizeStream);

// Pipe out the transcription.
recognizeStream.pipe(fs.createWriteStream('transcription.txt'));

// Get strings instead of buffers from `data` events.
recognizeStream.setEncoding('utf8');

// Listen for 'data' events for only the final results.
// Listen for 'results' events to get interim results.
['data', 'results', 'error', 'connection-close'].forEach(function(eventName)
  {

    recognizeStream.on(eventName,
      console.log.bind(console, eventName + ' event: '));
  }
);





