const buildLocation = '_build';

var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var csso        = require('gulp-csso');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var babel       = require('gulp-babel');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: pink">Running:</span> $ jekyll build'
};



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

// Minify CSS

gulp.task('csso', function(){
    return gulp.src('_site/css/*')
       .pipe(csso())
       .pipe(gulp.dest('_site/css'))
})

/**
 * Compile files from _sass into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src(`${buildLocation}/_sass/main.sass`)
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(`${buildLocation}/css`));
});




//  Babelize JS

gulp.task('babel', function(){
    return gulp.src(`${buildLocation}/js/*.js`)
    .pipe(babel())
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({stream:true}))
    // .pipe(gulp.dest('work/js'))
})
/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(`${buildLocation}/_sass/**/*`, ['sass']);
    gulp.watch('_site/css/*', ['csso']);
    gulp.watch([`${buildLocation}/*.html`, `${buildLocation}/_layouts/*.html`, `${buildLocation}/_posts/*`, `${buildLocation}/_includes/*.html`, `${buildLocation}/assets/**/*`, '_config.yml'], ['jekyll-rebuild']);
    gulp.watch(`${buildLocation}/js/*.js`, ['babel']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
