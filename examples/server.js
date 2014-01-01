var http = require('http');
var fs = require('fs');
var mjpegServer = require('..');

http.createServer(function(req, res) {
  console.log("Got request");

  mjpegReqHandler = mjpegServer.createReqHandler(req, res);

  var i = 0;
  var timer = setInterval(updateJPG, 50);

  function updateJPG() {
    fs.readFile(__dirname + '/resources/'+ i + '.jpg', sendJPGData);
    i++;
  }

  function sendJPGData(err, data) {
    mjpegReqHandler.write(data, function() {
      checkIfFinished();
    });
  }

  function checkIfFinished() {
    if (i > 100) {
      clearInterval(timer);
      mjpegReqHandler.close();
      console.log('End Request');
    }
  }
}).listen(8081);