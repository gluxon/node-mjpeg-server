var fs = require('fs');
var mjpegServer = (require('..'));

var server = mjpegServer.createServer(8081);

var i = 0;

server.on('request', function() {
  var timer = setInterval(updateJPG(timer), 100);
});

function updateJPG(timer) {
  fs.readFile(__dirname + '/resources/' + i + '.jpg', function(err, data) {
    server.update(data);

    if (i == 100) {
      clearInterval(timer);
      server.close();
    }
  });
  i++;
}