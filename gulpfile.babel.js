import path from 'path'
import gulp from 'gulp'
import less from 'gulp-less'
import rename from 'gulp-rename'
import postcss from 'gulp-postcss'
import cssnano from 'gulp-cssnano'
import util from 'gulp-util'
import through2 from 'through2'
import autoprefixer from 'autoprefixer'

// 配置环境
const ENV = process.env.NODE_ENV
const isDev = ENV === 'development' || ENV === 'dev'
const isProd = ENV === 'production' || ENV === 'prod'
const buildPath = path.join(__dirname, isProd ? 'dist' : 'example/dist')

/**
 * 自定义插件 - px to rpx
 */
const px2Rpx = () => {

    // 正则匹配
    const pxReplace = (value = '') => {
        const pxRegExp = /(\d*\.?\d+)px/ig
        const pxReplace = (strArg) => {
            const str = parseFloat(strArg)
            return str === 0 ? 0 : `${2 * str}rpx`
        }
        return value.replace(pxRegExp, pxReplace)
    }

    return through2.obj(function(file, encoding, cb) {

        // 如果文件为空，不做任何操作，转入下一个操作，即下一个pipe
        if (file.isNull()) {
            this.push(file)
            return cb()
        }

        // 插件不支持对stream直接操作，抛出异常
        if (file.isStream()) {
            this.emit('error', new util.PluginError('px2Rpx', 'Streaming not supported'))
            return cb()
        }

        // 内容转换，处理好后，再转成 Buffer 形式
        const content = pxReplace(file.contents.toString())

        file.contents = new Buffer(content)

        // 下面这两句基本是标配，可参考 through2 的 API
        this.push(file)
        cb()
    })
}

gulp.task('build:styles', () => {
    gulp
        .src(
            [
                'src/**/*.wxss',
                '!src/icon/*.wxss',
            ], { base: 'src' }
        )
        .pipe(less())
        .pipe(px2Rpx())
        .pipe(postcss([
            autoprefixer(['iOS >= 8', 'Android >= 4.1']),
        ]))
        // .pipe(
        //     cssnano({
        //         zindex: false,
        //         autoprefixer: false,
        //         discardComments: { removeAll: true },
        //     })
        // )
        .pipe(
            rename((path) => (path.extname = '.wxss'))
        )
        .pipe(gulp.dest(buildPath))
})

gulp.task('build:example', () => {
    gulp
        .src(
            [
                'src/**',
                '!src/**/*.wxss',
            ], { base: 'src' },
        )
        .pipe(gulp.dest(buildPath))
})

gulp.task('watch', () => {
    gulp.watch('src/**', [
        'build:styles',
        'build:example',
    ])
})

gulp.task('default', [
    'watch',
    'build:styles',
    'build:example',
])

gulp.task('build', [
    'build:styles',
    'build:example',
])