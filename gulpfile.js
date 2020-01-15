const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");

//配置gulp服务器
gulp.task('server', function(){
	connect.server({
		root:'dist',    //根目录设置为dist文件夹
		livereload:true    //设置修改文件后页面自动刷新
	});
});


//拷贝html文件
gulp.task('copyHTML', function(){
	gulp.src('html/*.html').pipe(gulp.dest('dist/html'));
	gulp.src('index.html').pipe(gulp.dest('dist')).pipe(connect.reload());
});


//拷贝图片文件
gulp.task('copyImage', function(){
	return gulp.src('images/*').pipe(gulp.dest('dist/images'));
});


//两个文件夹同时拷贝到某一文件夹下
gulp.task('copyData', function(){
	gulp.src(['xml/*.xml','json/*.json']).pipe(gulp.dest('dist/data'));
});

//拷贝css文件
gulp.task('copyCss',function(){
	gulp.src('css/*.css').pipe(gulp.dest('dist/css'));
})

//改变sass文件为css文件
gulp.task("sass",function(){
	gulp.src("css/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compact'}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"));
});


//把js文件变为es5格式并合并js文件,并对js文件进行压缩
gulp.task("common_concat",function(){
	gulp.src(["js/common.js"])
	.pipe(babel({"presets":["es2015"]}))
	.pipe(concat("common.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename({suffix:".min"}))
	.pipe(gulp.dest("dist/js"));	
});

//index的js文件转es5并压缩
gulp.task("index_concat",function(){
	gulp.src(["js/index.js"])
	.pipe(babel({"presets":["es2015"]}))
	.pipe(concat("index.js"))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename({suffix:".min"}))
	.pipe(gulp.dest("dist/js"));	
});

//js文件转es5并压缩
gulp.task("sp_show_uglify",function(){
	gulp.src(["js/*.js", "!js/index.js", "!js/common.js", "!js/*.min.js"])
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"))
	.pipe(uglify())
	.pipe(rename({suffix:".min"}))
	.pipe(gulp.dest("dist/js"));	
});

//对js文件进行压缩
gulp.task("uglify",function(){
	gulp.src(["dist/js/*.js","!dist/js/*.min.js"])
	.pipe(uglify())
	.pipe(rename({suffix:".min"}))
	.pipe(gulp.dest("dist/js"));
});


//将js变为es5的格式
gulp.task("babel",function(){
	gulp.src("js/*.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"))
});

//多个任务一起执行(类似default)
gulp.task('build',['copyHTML','copyImage','copyData','copyCss','sass','common_concat','index_concat', 'sp_show_uglify'],function(){
	console.log('congratulations!!!');
})

//侦测文件变化,改变后自动执行对应命令
gulp.task('watch', function(){
	gulp.watch(['images/*','json/*.json','css/*.css','css/*.scss','js/*.js','html/*.html','index.html'],['copyImage','copyData','copyCss','sass','common_concat',"index_concat",'sp_show_uglify','copyHTML','copyHTML']);
})


gulp.task('default',['server','watch']);