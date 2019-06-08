import { getSystemInfo, checkIPhoneX } from './checkIPhoneX'

const defaultSafeArea = {
    top: false,
    bottom: false,
}

const setSafeArea = (params) => {
    if (typeof params === 'boolean') {
        return Object.assign({}, defaultSafeArea, {
            top: params,
            bottom: params,
        })
    } else if (params !== null && typeof params === 'object') {
        return Object.assign({}, defaultSafeArea)
    } else if (typeof params === 'string') {
        return Object.assign({}, defaultSafeArea, {
            [params]: true,
        })
    }
    return defaultSafeArea
}

export default Behavior({
    properties: {
        safeArea: {
            type: [Boolean, String, Object],
            value: false,
        },
    },
    observers: {
        safeArea(newVal) {
            this.setData({ safeAreaConfig: setSafeArea(newVal) })
        },
    },
    definitionFilter(defFields) {
        const { statusBarHeight } = getSystemInfo() || {}
        const isIPhoneX = checkIPhoneX()

        Object.assign(defFields.data = (defFields.data || {}), {
            safeAreaConfig: defaultSafeArea,
            statusBarHeight,
            isIPhoneX,
        })
    },
})
