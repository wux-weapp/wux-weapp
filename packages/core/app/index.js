import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import warning from '../helpers/libs/warning'
import { omit } from '../helpers/shared/omit'
import { defaults as dialogConfig, defaultOptions as dialogOptions } from '../dialog/utils'
import { defaults as loadingConfig } from '../loading/utils'
import { defaults as notificationConfig } from '../notification/utils'
import { defaults as toastConfig } from '../toast/utils'
import { defaults as toptipsConfig } from '../toptips/utils'

let uuid = 0

const appConfig = {
    dialog: omit({
        ...dialogConfig,
        ...dialogOptions,
        resetOnClose: true,
    }, ['onCancel', 'onConfirm']),
    loading: { ...loadingConfig },
    notification: omit(notificationConfig, ['onClick', 'onClose']),
    toast: omit(toastConfig, ['success']),
    toptips: omit(toptipsConfig, ['success']),
}

const warningUnhooked = (valid, componentName) => {
    if (!valid && console !== undefined) {
        warning(false, `<${componentName} /> 无法找到对应的组件，请按文档说明使用组件`)
    }
}

const useComponentRef = (componentName, vm) => {
    const { prefixCls, uuid } = vm.data
    const selector =  `#${prefixCls}__${componentName}-${uuid}`
    const componentCtx = vm.querySelector(selector)

    return {
        current: componentCtx,
    }
}

const useDialog = (props, vm) => {
    const holderRef = useComponentRef('dialog', vm)
    const wrapAPI = {}
    const keys = ['show', 'open', 'alert', 'confirm', 'prompt']
    keys.forEach((type) => {
        wrapAPI[type] = (config) => {
            if (!holderRef.current) {
                warningUnhooked(false, 'Dialog')
                const fakeResult = () => {}
                fakeResult.then = () => {}
                return fakeResult
            }
            return holderRef.current[type]({ ...props, ...config })
        }
    })
    return [
        wrapAPI,
        holderRef,
    ]
}

const useLoading = (props, vm) => {
    const holderRef = useComponentRef('loading', vm)
    const show = (config) => {
        if (!holderRef.current) {
            warningUnhooked(false, 'Loading')
            const fakeResult = () => {}
            fakeResult.then = () => {}
            return fakeResult
        }
        return holderRef.current.show({ ...props, ...config })
    }
    const hide = () => {
        if (holderRef.current) {
            holderRef.current.hide()
        }
    }
    return [
        { show, hide },
        holderRef,
    ]
}

const useNotification = (props, vm) => {
    const holderRef = useComponentRef('notification', vm)
    const show = (config) => {
        if (!holderRef.current) {
            warningUnhooked(false, 'Notification')
            const fakeResult = () => {}
            fakeResult.then = () => {}
            return fakeResult
        }
        return holderRef.current.show({ ...props, ...config })
    }
    const hide = () => {
        if (holderRef.current) {
            holderRef.current.hide()
        }
    }
    return [
        { show, hide },
        holderRef,
    ]
}

const useToast = (props, vm) => {
    const holderRef = useComponentRef('toast', vm)
    const wrapAPI = {}
    const keys = ['show', 'success', 'warning', 'info', 'error']
    keys.forEach((type) => {
        wrapAPI[type] = (config) => {
            if (!holderRef.current) {
                warningUnhooked(false, 'Toast')
                const fakeResult = () => {}
                fakeResult.then = () => {}
                return fakeResult
            }
            return holderRef.current[type]({ ...props, ...config })
        }
    })
    return [
        wrapAPI,
        holderRef,
    ]
}

const useToptips = (props, vm) => {
    const holderRef = useComponentRef('toptips', vm)
    const wrapAPI = {}
    const keys = ['show', 'success', 'warn', 'info', 'error']
    keys.forEach((type) => {
        wrapAPI[type] = (config) => {
            if (!holderRef.current) {
                warningUnhooked(false, 'Toptips')
                const fakeResult = () => {}
                fakeResult.then = () => {}
                return fakeResult
            }
            return holderRef.current[type]({ ...props, ...config })
        }
    })
    return [
        wrapAPI,
        holderRef,
    ]
}

baseComponent({
    useExport: true,
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-app',
        },
        config: {
            type: Object,
            value: appConfig,
        },
        shadowRoot: {
            type: Boolean,
            value: false,
        },
        // 自定义类名
        wrapCls: {
            type: String,
            value: '',
        },
        // 自定义样式
        wrapStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
        },
    },
    data: {
        extStyle: '',
        uuid,
        memoizedAPI: null,
    },
    observers: {
        ['prefixCls, config'](...args) {
            this.updateMemoizedAPI(args[1])
        },
    },
    computed: {
        classes: ['prefixCls, uuid', function(prefixCls, uuid) {
            const wrap = classNames(prefixCls)
            const dialog = `${prefixCls}__dialog-${uuid}`
            const loading = `${prefixCls}__loading-${uuid}`
            const notification = `${prefixCls}__notification-${uuid}`
            const toast = `${prefixCls}__toast-${uuid}`
            const toptips = `${prefixCls}__toptips-${uuid}`

            return {
                wrap,
                dialog,
                loading,
                notification,
                toast,
                toptips,
            }
        }],
    },
    methods: {
        updateMemoizedAPI(config) {
            const [dialogAPI] = useDialog(appConfig.dialog, this)
            const [loadingAPI] = useLoading(config.loading, this)
            const [notificationAPI] = useNotification(config.notification, this)
            const [toastAPI] = useToast(config.toast, this)
            const [toptipsAPI] = useToptips(config.toptips, this)
            const memoizedAPI = {
                dialog: dialogAPI,
                loading: loadingAPI,
                notification: notificationAPI,
                toast: toastAPI,
                toptips: toptipsAPI,
            }
            if (this.data.memoizedAPI !== memoizedAPI) {
                this.setData({
                    memoizedAPI,
                })
            }
        },
        ['export']() {
            return {
                useApp: () => this.data.memoizedAPI,
            }
        },
    },
    attached() {
        this.setData({
            uuid: ++uuid,
        })
        this.updateMemoizedAPI(this.data.config)
    },
})
