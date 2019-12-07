import util from 'gulp-util'
import through2 from 'through2'

/**
 * 自定义插件 - px to rpx
 */
const px2Rpx = () => {

    // 正则匹配
    const pxReplace = (value = '') => {
        const pxRegExp = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)px/g
        const pxReplace = (m, $1) => {
            if (!$1) return m
            const pixels = parseFloat(m)
            return pixels === 0 ? 0 : `${2 * pixels}rpx`
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

        file.contents = typeof Buffer.from === 'function' ? Buffer.from(content) : new Buffer(content)

        // 下面这两句基本是标配，可参考 through2 的 API
        this.push(file)
        cb()
    })
}

export default px2Rpx
