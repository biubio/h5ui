// 引入gulp和组件
var gulp        = require('gulp');                          // 引入gulp
var concat      = require('gulp-concat');                   // 文件合并
var uglify      = require('gulp-uglify');                   // js压缩
var jshint      = require('gulp-jshint');                   // js语法检查
var less        = require('gulp-less');                     // less编译
var header      = require('gulp-header');                   // 添加文件头
var cssnano     = require('gulp-cssnano');                  // css压缩
var rename      = require('gulp-rename');                   // 文件更名


// 文件头申明
var banner = [
    '/**',
    ' * H5UI (http://h5ui.io)',
    ' * Copyright (C) <%= new Date().getFullYear() %> H5UI.io',
    ' * Licensed under the MIT license (https://mit-license.org)',
    ' */',
    ''].join('\n');


// Less编译[任务]
gulp.task('less', function() {
    return gulp.src(['./src/less/h5ui.less', './src/less/example.less']) // 编译目标文件(less)
        .pipe(less()) // less编译
        .pipe(header(banner)) // 头部申明
        .pipe(gulp.dest('./dist/css')) // 输出文件存放目录
        .pipe(cssnano({ // css压缩
            zindex: false,
            autoprefixer: false
        }))
        .pipe(header(banner)) // 头部申明
        .pipe(rename({suffix: '.min'})) // 文件更名(*.min)
        .pipe(gulp.dest('./dist/css')); // 输出压缩文件存放目录
});


// JS文件合并[任务]
var paths = {
    scripts: [
        './src/js/fastclick/fastclick.js',              // FastClick jsv2 (https://github.com/ftlabs/fastclick)
        './src/js/lazyload/jquery.lazyload.min.js',     // Lazyload 1.9.7 (https://github.com/tuupola/jquery_lazyload)
        './src/js/widget/button.js',                    // Bootstrap: button.js
        './src/js/widget/modal.js',                     // Bootstrap: modal.js
        './src/js/widget/tab.js',                       // Bootstrap: tab.js
        './src/js/widget/slider.js',                    // Bootstrap: slider.js
        './src/js/base.js'                              // Base js
    ]
};
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('h5ui.js')) // js文件合并
        .pipe(header(banner)) // 头部申明
        .pipe(gulp.dest('./dist/js')) // 输出文件存放目录

        .pipe(uglify()) // js压缩
        .pipe(header(banner)) // 头部申明
        .pipe(rename({suffix: '.min'})) // 文件更名(*.min)
        .pipe(gulp.dest('./dist/js')); // 输出压缩文件存放目录
});

// 监听文件[任务]
gulp.task('watch', function() {
    gulp.watch('./src/less/**/*.less', ['less']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
});


// 默认执行任务
gulp.task('default', ['scripts', 'less', 'watch']);