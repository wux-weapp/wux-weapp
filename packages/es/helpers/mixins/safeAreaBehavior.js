import { getSystemInfoSync } from '../hooks/useNativeAPI'
import { checkIPhoneX } from '../hooks/useSafeArea'

export const safeAreaProps = {
    safeArea: {
        type: [Boolean, String, Object],
        optionalTypes: [Boolean, String, Object],
        value: false,
    },
    safeAreaStyle: {
        type: String,
        value: 'default',
    },
}

const getDefaultSafeArea = () => ({
    top: false,
    bottom: false,
})

const setSafeArea = (params) => {
    if (typeof params === 'boolean') {
        return Object.assign({}, getDefaultSafeArea(), {
            top: params,
            bottom: params,
        })
    } else if (params !== null && typeof params === 'object') {
        return Object.assign({}, getDefaultSafeArea(), params)
    } else if (typeof params === 'string') {
        return Object.assign({}, getDefaultSafeArea(), {
            [params]: true,
        })
    }
    return getDefaultSafeArea()
}

export default Behavior({
    properties: { ...safeAreaProps },
    data: {
        safeAreaConfig: getDefaultSafeArea(),
        isIPhoneX: false,
    },
    observers: {
        safeArea(newVal) {
            this.setData({ safeAreaConfig: setSafeArea(newVal) })
        },
    },
    definitionFilter(defFields) {
        const windowInfo = getSystemInfoSync(['window', 'device'])
        const isIPhoneX = checkIPhoneX(windowInfo)

        Object.assign(defFields.data = (defFields.data || {}), {
            safeAreaConfig: getDefaultSafeArea(),
            isIPhoneX,
        })
    },
})
