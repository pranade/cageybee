var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
   password: 'X45twbw841Ix',
  username: '554040b8-dca0-4cd9-80b6-387e09d034c6',
  version: 'v1',
});

var params = {
  audio: fs.createReadStream('recording.wav'),
  content_type: 'audio/wav',
  continuous:true,
  interim_results: true,
  inactivity_timeout: 30,
  timestamps: true,
  model: 'en-US_NarrowbandModel'
};



speech_to_text.recognize(params, function(err, transcript) {
  if (err)
    console.log(err);
  else
    // console.log(JSON.stringify(transcript, null, 2));
  fs.writeFile(
    'message.txt', JSON.stringify(transcript, null, 2), (err) => 
      {
        if (err) throw err;
        console.log('It\'s saved!');
      }
      );

});
