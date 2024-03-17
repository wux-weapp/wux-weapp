import { miniprogramThis } from '../internals/global'

const fakeMediaResult = (request, response) => {
    if ('type' in response) {
        return response
    }
    if (request.mediaType.includes('video')) {
        return {
            tempFiles: [{
                tempFilePath: response.tempFilePath,
                size: response.size,
                duration: response.duration,
                height: response.height,
                width: response.width,
                thumbTempFilePath: response.tempFilePath,
                fileType: 'video',
            }],
            type: 'video',
        }
    }
    const { tempFilePaths = [], tempFiles = [] } = response
    return {
        tempFiles: tempFilePaths.map((tempFilePath, index) => ({
            tempFilePath: tempFiles[index].path || tempFilePath,
            size: tempFiles[index].size,
            fileType: 'image',
        })),
        type: 'image',
    }
}

/**
 * ## 拍摄或从手机相册中选择图片或视频。
 *
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
 * @export
 * @param {*} options
 * @return {*} 
 */
export function chooseMedia(options) {
    const {
        count = 9,
        mediaType = ['image', 'video'],
        sourceType = ['album', 'camera'],
        maxDuration = 10,
        sizeType = ['original', 'compressed'],
        camera = 'back',
        // @deprecated
        compressed = true,
        ...resetCbs
    } = options
    const success = (res) => {
        if (resetCbs.success) {
            resetCbs.success(fakeMediaResult(options, res))
        }
    }
    if (typeof miniprogramThis.chooseMedia === 'function') {
        return miniprogramThis.chooseMedia({ ...options, success })
    }
    if (mediaType.includes('video')) {
        const videoOptions = {
            sourceType,
            compressed,
            maxDuration: options.maxDuration === undefined ? 60 : maxDuration,
            camera,
            ...resetCbs,
            success,
        }
        return miniprogramThis.chooseVideo(videoOptions)
    }
    const imageOptions = {
        count,
        sizeType,
        sourceType,
        ...resetCbs,
        success,
    }
    return miniprogramThis.chooseImage(imageOptions)
}

export function uploadFile(options) {
    const {
        url,
        filePath,
        name = 'file',
        header = {},
        formData = {},
        timeout = 20,
        enableProfile = true,
        enableHttp2 = false,
        ...resetCbs
    } = options
    return miniprogramThis.uploadFile({
        url,
        filePath,
        name,
        header,
        formData,
        timeout,
        enableProfile,
        enableHttp2,
        ...resetCbs,
    })
}

export function getSystemInfoSync(keys = ['window', 'device', 'appBase']) {
    return typeof miniprogramThis.getWindowInfo === 'function'
        ? keys.reduce((acc, key) => ({
            ...acc,
            ...miniprogramThis[`get${key.charAt(0).toUpperCase() + key.substring(1)}Info`](),
        }), {})
        : miniprogramThis.getSystemInfoSync()
}

export function vibrateShort(options) {
    if (getSystemInfoSync(['window', 'device']).platform === 'devtools') {
        return
    }
    return miniprogramThis.vibrateShort(options)
}

export function getMenuButtonBoundingClientRectSync() {
    let menuRect
    try {
        menuRect = miniprogramThis.getMenuButtonBoundingClientRect ? miniprogramThis.getMenuButtonBoundingClientRect() : null
        if (menuRect === null) {
            throw 'getMenuButtonBoundingClientRect error'
        }
        // 取值为 0 的情况  有可能 width 不为 0, top 为 0 的情况
        if (!menuRect.width || !menuRect.top || !menuRect.left || !menuRect.height) {
            throw 'getMenuButtonBoundingClientRect error'
        }
    } catch (e) {
        const windowInfo = getSystemInfoSync(['window', 'device'])
        const isIOS = !!(windowInfo.system.toLowerCase().search('ios') + 1)
        const height = 32 // 胶囊的高度
        let width = 88 // 胶囊的宽度
        let gap = 4 // 胶囊按钮上下间距 使导航内容居中
        if (windowInfo.platform === 'android') {
            gap = 8
            width = 96
        } else if (windowInfo.platform === 'devtools') {
            if (isIOS) {
                gap = 5.5 // 开发工具中 ios 手机
            } else {
                gap = 7.5 // 开发工具中 android 和其他手机
            }
        }
        // 开启 wifi 的情况下修复 statusBarHeight 值获取不到
        if (!windowInfo.statusBarHeight) {
            windowInfo.statusBarHeight = windowInfo.screenHeight - windowInfo.windowHeight - 20
        }
        // 获取不到胶囊信息就自定义重置一个
        menuRect = {
            bottom: windowInfo.statusBarHeight + gap + height,
            height,
            left: windowInfo.windowWidth - width - 10,
            right: windowInfo.windowWidth - 10,
            top: windowInfo.statusBarHeight + gap,
            width,
        }
    }
    return menuRect
}

export function nextTick(cb) {
    if (typeof miniprogramThis.nextTick === 'function') {
        return miniprogramThis.nextTick(cb)
    } else if (typeof Promise !== 'undefined') {
        return Promise.resolve().then(cb)
    } else {
        setTimeout(() => cb(), 0)
    }
}
