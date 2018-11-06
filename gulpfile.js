var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var csso        = require('gulp-csso');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var pug         = require('gulp-pug');
var babel       = require('gulp-babel');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};




/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

// Minifi CSS

gulp.task('csso', function(){
    return gulp.src('_site/css/*')
       .pipe(csso())
       .pipe(gulp.dest('_site/css'))
})

/**
 * Compile files from _sass into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('0_working/1_sass/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('1_src/css'));
        //csso()
});


/** 
 *  Get and compile pug files into HTML
 */

 gulp.task('pug', function(){
     return gulp.src('0_working/0_pugFiles/**/*.pug')
     .pipe(pug())
     .pipe(gulp.dest('1_src/_includes'))
 });


//  Babelize JS

gulp.task('babel', function(){
    return gulp.src('0_working/2_js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('1_src/js'))
})
/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('0_working/1_sass/**/*', ['sass']);
    gulp.watch('_site/css/*', ['csso']);
    gulp.watch(['1_src/*.html', '1_src/_layouts/*.html', '1_src/_posts/*', '1_src/_includes/*', 'assets/js/*', '_config.yml'], ['jekyll-rebuild']);
    gulp.watch('0_working/0_pugFiles/**/*.pug', ['pug']);
    gulp.watch('0_working/2_js/*.js', ['babel']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
