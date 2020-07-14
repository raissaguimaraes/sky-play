var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

//Compilar o Sass
gulp.task('sass', function() {

    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());

});

//Converter JS para src/js
gulp.task('js', function() {

        return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
            .pipe(gulp.dest("src/js"))
            .pipe(browserSync.stream());

});

//Servidor local HTML/SCSS
gulp.task('serve', gulp.series('sass', function(){

    browserSync.init({
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], gulp.series('sass'));
    gulp.watch("src/*.html").on('change', browserSync.reload);
    
}));

gulp.task('default', gulp.parallel('js', 'serve'));