import { miniprogramThis } from '../internals/global'
import { getSystemInfoSync } from './useNativeAPI'
import { useRef } from './useDOM'

export function getCanvasRef(canvasId, vm) {
    return useRef(`#${canvasId}`, vm)
        .then((res) => {
            if (!res) {
                return Promise.reject({
                    errMsg: 'Canvas is not supported in the current environment.',
                })
            }
            return res.node
        })
}

export function createImage({ imageWidth, imageHeight, imageUrl }, canvas) {
    return new Promise((resolve, reject) => {
        if (typeof canvas.createImage === 'function') {
            const ratio = getSystemInfoSync(['window']).pixelRatio
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

/**
 * 把当前画布指定区域的内容导出生成指定大小的图片
 *
 * @export
 * @param {number} width 指定的画布区域的宽度
 * @param {number} height 指定的画布区域的高度
 * @param {string} type 目标文件的类型，可选值为 png, jpg, jpeg, webp
 * @param {number} quality 图片的质量，目前仅对 jpg 有效。取值范围为 (0, 1]，不在范围内时当作 1.0 处理。
 * @param {object} canvas 画布标识，传入 canvas 组件实例 （canvas type="2d" 时使用该属性）。
 * @return {string} 
 */
export function toDataURL({
    width,
    height,
    type ='png',
    quality = 1,
}, canvas) {
    return new Promise((resolve) => {
        if (typeof canvas.toDataURL === 'function') {
            // 基础库 2.11.0 开始支持
            // @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/Canvas.toDataURL.html
            const fileType = type === 'jpg' || type === 'jpeg' ? 'jpeg' : type
            resolve(canvas.toDataURL(`image/${fileType}`, quality))
        } else if (typeof miniprogramThis.canvasToTempFilePath === 'function') {
            // 基础库 1.9.6 开始支持
            // @see https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasToTempFilePath.html
            const ratio = getSystemInfoSync(['window']).pixelRatio
            const fileType = type === 'jpg' || type === 'jpeg' ? 'jpg' : 'png'
            miniprogramThis.canvasToTempFilePath({
                destWidth: width * ratio,
                destHeight: height * ratio,
                canvas,
                fileType,
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
            miniprogramThis.downloadFile({
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
