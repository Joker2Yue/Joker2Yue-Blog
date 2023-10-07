//Plugins模块获取
const gulp = require('gulp');
const minifycss = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin');
const htmlclean = require('gulp-htmlclean');

//压缩css
gulp.task('minify-css', async function () {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});

//压缩html
gulp.task('minify-html', async function () {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))

        .pipe(gulp.dest('./public'))
});

//压缩js 不压缩min.js
gulp.task('minify-js', async function () {
    return gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});

// 压缩 public/images 目录内图片(Version>3)
gulp.task('minify-images', async function (done) {
    gulp.src('./public/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./public/images'));
    done();
});

// 开始任务
gulp.task('default', gulp.parallel('minify-html', 'minify-css', 'minify-js', async function () {
    // Do something after a, b, and c are finished.
}));
