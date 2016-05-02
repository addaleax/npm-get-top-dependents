'use strict';

var stream = require('readable-stream');
var https = require('https');
var getDependents = require('npm-get-dependents');
var chunker = require('object-chunker');
var sorter = require('stream-sort');
var JSONStream = require('JSONStream');

function addDownloadCounts(apiBase) {
  var transform;
  return transform = new stream.Transform({
    objectMode: true,
    transform: function(chunk, encoding, callback) {
      var req = https.request(apiBase + chunk,
        function(res) {
          var buffers = [];
          res.on('error', callback);
          res.on('data', function(buffer) {
            buffers.push(buffer);
          });
          res.on('end', function() {
            var err = null;
            try {
              var content = Buffer.concat(buffers).toString();
              var json = JSON.parse(content);
              Object.keys(json).forEach(function(key) {
                transform.push(json[key]);
              });
            } catch (e) {
              err = e;
            }

            callback(err);
          });
        });

      req.on('error', callback);
      req.end();
    }
  });
}

function getTopDependents(opts, callback) {
  if (typeof opts === 'string') {
    opts = { package: opts };
  }

  if (typeof opts !== 'object') {
    throw new TypeError('get-top-dependents needs an options object');
  }

  if (typeof opts.package !== 'string') {
    throw new TypeError('opts.package needs to be a string');
  }

  var downloadCountChunkSize = opts.downloadCountChunkSize || 20;
  var count = opts.count || 5;
  var apiBase = opts.apiBase ||
      'https://api.npmjs.org/downloads/point/last-month/';

  getDependents.createReadStream(opts.package).on('error', callback)
    .pipe(chunker(downloadCountChunkSize)).on('error', callback)
    .pipe(addDownloadCounts(apiBase)).on('error', callback)
    .pipe(sorter({
      count: count,
      compare: function(a, b) {
        return a.downloads - b.downloads;
      }
    }))
    .on('error', callback)
    .on('result', function(result) {
      callback(null, result);
    });
}

module.exports = getTopDependents;
