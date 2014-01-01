/*
Copyright (c) 2012 Peter Sanford
Copyright (c) 2013-2014 Brandon Cheng

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var util = require('util');
var stream = require('stream');
var Writable = stream.Writable;

exports.createReqHandler = function(req, res) {
  return new MjpegServer(req, res);
};

function MjpegServer(req, res, options) {
  if (!(this instanceof MjpegServer))
    return new MjpegServer(req, res, options);

  Writable.call(this, options);

  this.req = req;
  this.res = res;

  res.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=myboundary',
    'Cache-Control': 'no-cache',
    'Connection': 'close',
    'Pragma': 'no-cache'
  });
}
util.inherits(MjpegServer, Writable);

MjpegServer.prototype._write = function(jpeg, encoding, done) {
  this.res.write("--myboundary\r\n");
  this.res.write("Content-Type: image/jpeg\r\n");
  this.res.write("Content-Length: " + jpeg.length + "\r\n");
  this.res.write("\r\n");
  this.res.write(jpeg, 'binary');
  this.res.write("\r\n");
  done();
};

MjpegServer.prototype.close = function() {
  this.res.end();
};