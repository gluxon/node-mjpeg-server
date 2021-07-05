# mjpeg-server

Serve an mjpeg stream on a specified port through HTTP from multiple jpgs.

## Methods

### mjpegServer.createReqHandler(req, res)

Creates a request handler object with parameters from http.createServer.

``` javascript
var http = require('http');
var mjpegServer = require('..');

http.createServer(function(req, res) {
	mjpegReqHandler = mjpegServer.createReqHandler(req, res);
}).listen(8081);
```

### mjpegServer.update(data)

Update the stream

``` javascript
mjpegReqHandler = mjpegServer.createReqHandler(req, res);
mjpegReqHandler.update(randomJpeg37);
```

### mjpegServer.close()

Calls res.end

## Changelog

#### 0.3.1
- Fixed a deprecation warning in Node.js 16.x due to a typo in the `package.json` `main` field.

#### 0.3
- Use streams2 in Node.js v.10
