const gulp = require('gulp')
const uglifycss = require('gulp-uglifycss')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')

gulp.task('default', () => {
    gulp.start('app')
})

gulp.task('app', ['app.html', 'app.css', 'app.js', 'deps.js', 'app.fonts', 'app.cursor', 'app.imgs'])

gulp.task('app.html', () => {
    return gulp.src('src/assets/views/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('src/public/views'))
})

gulp.task('app.css', () => {
    return gulp.src('src/assets/css/*.css')
        .pipe(uglifycss({"uglyComments": true}))
        .pipe(gulp.dest('src/public/css'))
})

gulp.task('app.js', () => {
    return gulp.src('src/assets/js/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('src/public/js'))
})

gulp.task('deps.js', () => {
    return gulp.src('src/assets/js/external/*')
        .pipe(gulp.dest('src/public/js/external'))
})

gulp.task('app.imgs', () => {
    return gulp.src('src/assets/img/*.*')
        .pipe(gulp.dest('src/public/img'))
})

gulp.task('app.cursor', () => {
    return gulp.src('src/assets/cursors/*')
        .pipe(gulp.dest('src/public/cursors'))
})

gulp.task('app.fonts', () => {
    return gulp.src('src/assets/fonts/*')
        .pipe(gulp.dest('src/public/fonts'))
})