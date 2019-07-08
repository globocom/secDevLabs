var uglifycss = require('../');
var should = require('should');
var gutil = require('gulp-util');
var fs = require('fs');
var pj = require('path').join;

function createVinyl(filename, contents) {
    var base = pj(__dirname, 'fixtures');
    var filePath = pj(base, filename);

    return new gutil.File({
        cwd: __dirname,
        base: base,
        path: filePath,
        contents: contents || fs.readFileSync(filePath)
    });
}

describe('gulp-uglifycss', function () {
    describe('uglifycss()', function () {
        it('should pass file when it isNull()', function (done) {
            var stream = uglifycss();
            var emptyFile = {
                isNull: function () { return true; }
            };
            stream.on('data', function (data) {
                data.should.equal(emptyFile);
                done();
            });
            stream.write(emptyFile);
        });

        it('should emit error when file isStream()', function (done) {
            var stream = uglifycss();
            var streamFile = {
                isNull: function () { return false; },
                isStream: function () { return true; }
            };
            stream.on('error', function (err) {
                err.message.should.equal('Stream is not supported');
                done();
            });
            stream.write(streamFile);
        });

        it('should uglify single css file', function (done) {
            var styleFile = createVinyl('simple.css');

            var stream = uglifycss();
            stream.on('data', function (cssFile) {
                should.exist(cssFile);
                should.exist(cssFile.path);
                should.exist(cssFile.relative);
                should.exist(cssFile.contents);
                cssFile.path.should.equal(pj(__dirname, 'fixtures', 'simple.css'));
                String(cssFile.contents + "\n").should.equal(
                    fs.readFileSync(pj(__dirname, 'expect/simple.css'), 'utf8'));
                done();
            });
            stream.write(styleFile);
        });

        it('should compile multiple css files', function (done) {
            var files = [
                createVinyl('buttons.css'),
                createVinyl('layout.css'),
                createVinyl('simple.css')
            ];

            var stream = uglifycss();
            var count = files.length;
            stream.on('data', function (cssFile) {
                should.exist(cssFile);
                should.exist(cssFile.path);
                should.exist(cssFile.relative);
                should.exist(cssFile.contents);
                if (!--count) { done(); }
            });

            files.forEach(function (file) {
                stream.write(file);
            });
        });
    });
});
