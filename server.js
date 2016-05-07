var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('public'));

/*app.get('/', function (req, res) {
  console.log(path.join(__dirname,''));
  console.log(path.join(__dirname,'/static/hellomonkey.xml'));
  res.sendFile(path.join(__dirname,'/public/hellomonkey.xml'));
  //res.send('Ready for action...');
});*/

/*app.get('/record', function (req, res) {
  console.log("GET request to /record...");
  console.log("With params: ",req);
  console.log(path.join(__dirname,''));
  console.log(path.join(__dirname,'/record-notes.php'));
  res.sendFile(path.join(__dirname,'/record-notes.php'));
  //res.send('Ready for action...');
});
*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});