var watson = require('watson-developer-cloud');  
var fs = require('fs');  
var path = require('path');  

var speech_to_text = watson.speech_to_text({
   password: 'X45twbw841Ix',
  username: '554040b8-dca0-4cd9-80b6-387e09d034c6',
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api'
});


    var params = {
      content_type: 'audio/wav',
      timestamps: true,
      continuous: true
    };

    var results = [];

    // create the stream
    var recognizeStream = speech_to_text.createRecognizeStream(params);

    // pipe in some audio
    fs.createReadStream('test.wav').pipe(recognizeStream);

    // Pipe out the transcription.
    recognizeStream.pipe(fs.createWriteStream('transcription.txt'));


    // listen for 'data' events for just the final text
    // listen for 'results' events to get the raw JSON with interim results, timings, etc.

    recognizeStream.setEncoding('utf8'); // to get strings instead of Buffers from `data` events

    recognizeStream.on('results', function(e) {
      if (e.results[0].final) {
        results.push(e);
      }
    });

    // ['data', 'results', 'error', 'connection-close'].forEach(function(eventName) {
    //   recognizeStream.on(eventName, console.log.bind(console, eventName + ' event: '));
    // });


    recognizeStream.on('results', function() {
        var transcriptFile = path.join(__dirname, '/transcript.json');
      fs.writeFile(transcriptFile, JSON.stringify(results), function(err) {
        if (err) {
          console.log('error!');
        }
      });
    });
  

   