gulp-uglifycss
==============

Gulp plugin to use [UglifyCSS](https://github.com/fmarcia/UglifyCSS).

[![Build Status](https://travis-ci.org/ubirak/gulp-uglifycss.svg?branch=master)](https://travis-ci.org/ubirak/gulp-uglifycss)

## Install

```
npm install --save gulp-uglifycss
```

## Usage
```javascript
var uglifycss = require('gulp-uglifycss');

gulp.task('css', function () {
  gulp.src('./styles/**/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/'));
});
```

## Options

No specific options. You can use all the [UglifyCSS](https://github.com/fmarcia/UglifyCSS) options.
