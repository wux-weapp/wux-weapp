import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { $wuxBackdrop } from '../index'

const defaults = {
    prefixCls: 'wux-actionsheet',
    classNames: 'wux-animate--slideInUp',
    theme: 'ios',
    className: '',
    titleText: '',
    buttons: [],
    buttonClicked() {},
    cancelText: '取消',
    cancel() {},
    // destructiveText: '删除',
    // destructiveButtonClicked() {},
}

baseComponent({
    useFunc: true,
    data: defaults,
    computed: {
        classes() {
            const { prefixCls, theme, buttons } = this.data
            const content = classNames(`${prefixCls}__content`, {
                [`${prefixCls}__content--theme-${theme}`]: theme,
            })
            const options = classNames(`${prefixCls}__group`, {
                [`${prefixCls}__group--options`]: true,
            })
            const title = `${prefixCls}__title`
            const destructive = classNames(`${prefixCls}__button`, {
                [`${prefixCls}__button--destructive`]: true,
            })
            const button = buttons.map((button) => {
                const wrap = classNames(`${prefixCls}__button`, {
                    [`${prefixCls}__button--option`]: true,
                    [`${prefixCls}__button--disabled`]: button.disabled,
                    [`${button.className}`]: button.className,
                })
                const hover = button.hoverClass && button.hoverClass !== 'default' ? button.hoverClass : `${prefixCls}__button--hover`

                return {
                    wrap,
                    hover,
                }
            })
            const icon = `${prefixCls}__icon`
            const text = `${prefixCls}__text`
            const group = classNames(`${prefixCls}__group`, {
                [`${prefixCls}__group--cancel`]: true,
            })
            const cancel = classNames(`${prefixCls}__button`, {
                [`${prefixCls}__button--cancel`]: true,
            })
            const hover = `${prefixCls}__button--hover`

            return {
                content,
                options,
                title,
                button,
                icon,
                text,
                destructive,
                group,
                cancel,
                hover,
            }
        },
    },
    methods: {
        /**
         * 显示
         */
        showSheet(opts = {}) {
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))
            this.removed = false
            this.$$setData({ in: true, ...options })
            this.$wuxBackdrop.retain()
            return this.cancel.bind(this)
        },
        /**
         * 隐藏
         */
        removeSheet(callback) {
            if (this.removed) return false
            this.removed = true
            this.$$setData({ in: false })
            this.$wuxBackdrop.release()
            if (typeof callback === 'function') {
                callback(this.data.buttons)
            }
        },
        /**
         * 按钮点击事件
         */
        buttonClicked(e) {
            const { index } = e.currentTarget.dataset
            if (this.fns.buttonClicked(index, this.data.buttons[index]) === true) {
                this.removeSheet()
            }
        },
        /**
         * 删除按钮点击事件
         */
        destructiveButtonClicked() {
            if (this.fns.destructiveButtonClicked() === true) {
                this.removeSheet()
            }
        },
        /**
         * 取消按钮点击事件
         */
        cancel() {
            this.removeSheet(this.fns.cancel)
        },
        bindgetuserinfo(e) {
            this.triggerEvent('getuserinfo', {...e.detail, ...e.currentTarget.dataset })
        },
        bindcontact(e) {
            this.triggerEvent('contact', {...e.detail, ...e.currentTarget.dataset })
        },
        bindgetphonenumber(e) {
            this.triggerEvent('getphonenumber', {...e.detail, ...e.currentTarget.dataset })
        },
        bindopensetting(e) {
            this.triggerEvent('opensetting', {...e.detail, ...e.currentTarget.dataset })
        },
        onError(e) {
            this.triggerEvent('error', {...e.detail, ...e.currentTarget.dataset })
        },
    },
    created() {
        this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
    },
})
