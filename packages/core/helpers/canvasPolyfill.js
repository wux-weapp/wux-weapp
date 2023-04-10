export function getCanvas({ canvasId, node = true, size = true }, vm) {
    return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery().in(vm)
        query.select(`#${canvasId}`)
            .fields({ node, size })
            .exec((res) => {
                if (!res[0]) {
                    reject({
                        errMsg: 'Canvas is not supported in the current environment.',
                    })
                    return
                }
                resolve(res[0].node)
            })
    })
}

export function createImage({ imageWidth, imageHeight, imageUrl }, canvas) {
    return new Promise((resolve, reject) => {
        if (typeof canvas.createImage === 'function') {
            const ratio = wx.getSystemInfoSync().pixelRatio
            const ctx = canvas.getContext('2d')
            const img = canvas.createImage()
            img.onload = () => {
                ctx.drawImage(
                    img,
                    (-imageWidth * ratio) / 2,
                    (-imageHeight * ratio) / 2,
                    imageWidth * ratio,
                    imageHeight * ratio
                )
                resolve(imageUrl)
            }
            img.onerror = () => {
                reject({
                    errMsg: 'Image creation failed in canvas.createImage.',
                })
            }
            img.src = imageUrl
        } else {
            reject({
                errMsg: 'Canvas.createImage is not a function.',
            })
        }
    })
}

export function toDataURL({
    width,
    height,
    type ='image/png',
    quality = 1,
}, canvas) {
    return new Promise((resolve) => {
        if (typeof canvas.toDataURL === 'function') {
            // 基础库 2.11.0 开始支持
            // @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/Canvas.toDataURL.html
            resolve(canvas.toDataURL(type, quality))
        } else if (typeof wx.canvasToTempFilePath === 'function') {
            const ratio = wx.getSystemInfoSync().pixelRatio
            wx.canvasToTempFilePath({
                destWidth: width * ratio,
                destHeight: height * ratio,
                canvas,
                fileType: type.indexOf('png') !== -1 ? 'png' : 'jpg',
                quality,
                success: (res) => resolve(res.tempFilePath),
                fail: () => resolve(''),
            })
        } else {
            resolve('')
        }
    })
}

export function downloadImage(imageUrl) {
    return new Promise((resolve, reject) => {
        if (
            /^http/.test(imageUrl) &&
            // @ts-ignore
            !/^http:\/\/tmp/.test(imageUrl)
        ) {
            wx.downloadFile({
                url: imageUrl,
                success: (res) => {
                    if (res.statusCode === 200) {
                        resolve(res.tempFilePath)
                    } else {
                        reject({ errMsg: res.errMsg })
                    }
                },
                fail(err) {
                    reject(err)
                },
            })
        } else {
            // 支持本地地址
            resolve(imageUrl)
        }
    })
}
