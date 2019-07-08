'use strict';

var BufferStreams = require('bufferstreams');
var htmlmin = require('html-minifier');
var PluginError = require('plugin-error');
var Transform = require('readable-stream/transform');
var tryit = require('tryit');

module.exports = function gulpHtmlmin(options) {
  return new Transform({
    objectMode: true,
    transform: function htmlminTransform(file, enc, cb) {
      if (file.isNull()) {
        cb(null, file);
        return;
      }

      function minifyHtml(buf, done) {
        var result;
        tryit(function() {
          result = new Buffer(htmlmin.minify(String(buf), options));
        }, function(err) {
          if (err) {
            options = Object.assign({}, options, {fileName: file.path});
            done(new PluginError('gulp-htmlmin', err, options));
            return;
          }
          done(null, result);
        });
      }

      var self = this;

      if (file.isStream()) {
        file.contents.pipe(new BufferStreams(function(none, buf, done) {
          minifyHtml(buf, function(err, contents) {
            if (err) {
              self.emit('error', err);
              done(err);
            } else {
              done(null, contents);
              self.push(file);
            }
            cb();
          });
        }));
        return;
      }

      minifyHtml(file.contents, function(err, contents) {
        if (err) {
          self.emit('error', err);
        } else {
          file.contents = contents;
          self.push(file);
        }
        cb();
      });
    }
  });
};
