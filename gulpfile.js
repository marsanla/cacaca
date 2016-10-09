const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');
const nodemon = require('nodemon');
const exec = require('child_process').exec;

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.series(gulp.parallel('other', 'webpack:dist')));
gulp.task('test', gulp.series('karma:single-run'));
gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('serve', gulp.series('webpack:watch', 'watch', 'browsersync', 'api'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);
gulp.task('api', api);

gulp.task('fake', gulp.series('fake-authors', 'fake-books'));
gulp.task('fake-authors', fakeAuthor);
gulp.task('fake-books', fakeBook);

function reloadBrowserSync(cb) {
    browserSync.reload();
    cb();
}

function watch(done) {
    gulp.watch(conf.path.src('app/**/*.html'), reloadBrowserSync);
    done();
}

function api() {
    nodemon({
        script: 'server/server/server.js',
        env: {
            'NODE_ENV': 'development'
        }
    })
}

function fakeAuthor(done) {
    const amount = 40;
    const schema = {
        "id": "id",
        "name": "full_name",
        "gender": "random_element|[\"male\",\"female\"]",
        "email":"email"
    };

    exec('faking -c ' + amount + ' -s \'' + JSON.stringify(schema) + '\' server/server/db/seeds/development/authors.json', done);
}


function fakeBook(done) {
    const amount = 1000;
    const schema = {
        "id": "id",
        "name": "title",
        "authorId": "random_element|[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]",
        "genre":"random_element|[\"horror\",\"comedy\",\"romantic\",\"drama\",\"science\",\"other\"]",
        "publish_date": "year"
    };

    exec('faking -c ' + amount + ' -s \'' + JSON.stringify(schema) + '\' server/server/db/seeds/development/books.json', done);
}
