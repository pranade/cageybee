var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  console.log(path.join(__dirname,''));
  console.log(path.join(__dirname,'/hellomonkey.xml'));
  res.sendFile(path.join(__dirname,'/hellomonkey.xml'));
  //res.send('Ready for action...');
});

app.get('/callmemaybe', function (req, res) {
  console.log("Calling me... maybe");
  res.sendFile(path.join(__dirname,'/hellomonkey.xml'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});