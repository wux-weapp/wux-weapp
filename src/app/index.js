import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import styleToCssString from '../helpers/styleToCssString'
import { omit } from '../helpers/omit'
import { defaults as dialogConfig, defaultOptions as dialogOptions } from '../dialog/utils'
import { defaults as loadingConfig } from '../loading/utils'
import { defaults as notificationConfig } from '../notification/utils'
import { defaults as toastConfig } from '../toast/utils'
import { defaults as toptipsConfig } from '../toptips/utils'

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

let uuid = 0

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
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const dialog = `${prefixCls}__dialog-${this.uuid}`
            const loading = `${prefixCls}__loading-${this.uuid}`
            const notification = `${prefixCls}__notification-${this.uuid}`
            const toast = `${prefixCls}__toast-${this.uuid}`
            const toptips = `${prefixCls}__toptips-${this.uuid}`

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
        getCtx(componentName) {
            const { prefixCls } = this.data
            const selector =  `#${prefixCls}__${componentName}-${this.uuid}`
            const componentCtx = this.selectComponent(selector)

            if (!componentCtx) {
                throw new Error('无法找到对应的组件，请按文档说明使用组件')
            }

            return componentCtx
        },
        ['export']() {
            const useApp = () => {
                const { config: appConfig } = this.data

                // ============================== Dialog ===============================
                const dialogInst = this.getCtx('dialog')
                const dialogApi = {
                    show: (config) => dialogInst.show({ ...appConfig.dialog, ...config }),
                    open: (config) => dialogInst.open({ ...appConfig.dialog, ...config }),
                    alert: (config) => dialogInst.alert({ ...appConfig.dialog, ...config }),
                    confirm: (config) => dialogInst.confirm({ ...appConfig.dialog, ...config }),
                    prompt: (config) => dialogInst.prompt({ ...appConfig.dialog, ...config }),
                }

                // ============================== Loading ===============================
                const loadingInst = this.getCtx('loading')
                const loadingApi = {
                    show: (config) => loadingInst.show({ ...appConfig.loading, ...config }),
                    hide: loadingInst.hide.bind(loadingInst),
                }
                
                // ============================== Notification ===============================
                const notificationInst = this.getCtx('notification')
                const notificationApi = {
                    show: (config) => notificationInst.show({ ...appConfig.notification, ...config }),
                    hide: notificationInst.hide.bind(notificationInst),
                }

                // ============================== Toast ===============================
                const toastInst = this.getCtx('toast')
                const toastApi = {
                    show: (config) => toastInst.show({ ...appConfig.toast, ...config }),
                    success: (config) => toastInst.success({ ...appConfig.toast, ...config }),
                    warning: (config) => toastInst.warning({ ...appConfig.toast, ...config }),
                    error: (config) => toastInst.error({ ...appConfig.toast, ...config }),
                    info: (config) => toastInst.info({ ...appConfig.toast, ...config }),
                }

                // ============================== Toptips ===============================
                const toptipsInst = this.getCtx('toptips')
                const toptipsApi = {
                    show: (config) => toptipsInst.show({ ...appConfig.toptips, ...config }),
                    success: (config) => toptipsInst.success({ ...appConfig.toptips, ...config }),
                    warn: (config) => toptipsInst.warn({ ...appConfig.toptips, ...config }),
                    error: (config) => toptipsInst.error({ ...appConfig.toptips, ...config }),
                    info: (config) => toptipsInst.info({ ...appConfig.toptips, ...config }),
                }

                return {
                    dialog: dialogApi,
                    loading: loadingApi,
                    notification: notificationApi,
                    toast: toastApi,
                    toptips: toptipsApi,
                }
            }

            return {
                useApp,
            }
        },
    },
    created() {
        this.uuid = ++uuid
    },
})
