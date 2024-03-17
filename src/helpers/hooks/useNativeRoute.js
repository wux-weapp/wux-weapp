import { miniprogramThis } from '../internals/global'

/**
 * openType 属性可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch
 */
const NATIVE_ROUTES = [
    'navigateTo',
    'redirectTo',
    'switchTab',
    'navigateBack',
    'reLaunch',
]

export function useNativeRoute(props, vm) {
    const { url, openType = 'navigateTo', delta = 1 } = props
    const promisify = (method, params) => {
        return new Promise((resolve, reject) => {
            miniprogramThis[method].call(miniprogramThis, {
                ...params,
                success: resolve,
                fail: reject,
            })
        })
    }
    if (!url) {
        return Promise.reject(
            `Invalid value of prop "url" of "${vm.is}": Expected an Non-empty String.`
        )
    } else if (!NATIVE_ROUTES.includes(openType)) {
        return Promise.reject(
            `Invalid value of prop "openType" of "${vm.is}": expected "${NATIVE_ROUTES.join(',')}", ` +
            `but got ${openType}.`
        )
    } else if (openType === 'navigateBack') {
        return promisify(openType, { delta })
    } else {
        return promisify(openType, { url })
    }
}
