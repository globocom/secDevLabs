var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var through2 = require('through2');
var uglifycss = require('uglifycss');

module.exports = function (options) {
    return through2.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError('gulp-uglifycss', 'Stream is not supported'));
        }

        var str = file.contents.toString('utf8');
        file.contents = new Buffer(uglifycss.processString(str, options));

        return cb(null, file);
    });
};
