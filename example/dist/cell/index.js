import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import eventsMixin from '../helpers/mixins/eventsMixin'
import { useNativeRoute } from '../helpers/hooks/useNativeRoute'
import { useRect } from '../helpers/hooks/useDOM'

const defaultEvents = {
    onClick() {},
    onError() {},
}

baseComponent({
    behaviors: [eventsMixin({ defaultEvents })],
    relations: {
        '../cell-group/index': {
            type: 'ancestor',
        },
        '../picker/index': {
            type: 'parent',
        },
        '../date-picker/index': {
            type: 'parent',
        },
        '../popup-select/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-cell',
        },
        disabled: {
            type: Boolean,
            value: false,
        },
        hoverClass: {
            type: String,
            value: 'default',
        },
        hoverStopPropagation: {
            type: Boolean,
            value: false,
        },
        hoverStartTime: {
            type: Number,
            value: 20,
        },
        hoverStayTime: {
            type: Number,
            value: 70,
        },
        lang: {
            type: String,
            value: 'en',
        },
        sessionFrom: {
            type: String,
            value: '',
        },
        sendMessageTitle: {
            type: String,
            value: '',
        },
        sendMessagePath: {
            type: String,
            value: '',
        },
        sendMessageImg: {
            type: String,
            value: '',
        },
        showMessageCard: {
            type: Boolean,
            value: false,
        },
        appParameter: {
            type: String,
            value: '',
        },
        thumb: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        extra: {
            type: String,
            value: '',
        },
        hasLine: {
            type: Boolean,
            value: true,
        },
        isLink: {
            type: Boolean,
            value: false,
        },
        openType: {
            type: String,
            value: 'navigateTo',
        },
        url: {
            type: String,
            value: '',
        },
        delta: {
            type: Number,
            value: 1,
        },
        wrapStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
        },
        align: {
            type: String,
            value: 'center',
        },
    },
    data: {
        isLast: false,
        extStyle: '',
    },
    computed: {
        classes: ['prefixCls, hoverClass, isLast, hasLine, isLink, disabled, align', function(prefixCls, hoverClass, isLast, hasLine, isLink, disabled, align) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--last`]: isLast,
                [`${prefixCls}--has-line`]: hasLine,
                [`${prefixCls}--access`]: isLink,
                [`${prefixCls}--disabled`]: disabled,
                [`${prefixCls}--align-${align}`]: align,
            })
            const hd = `${prefixCls}__hd`
            const thumb = `${prefixCls}__thumb`
            const bd = `${prefixCls}__bd`
            const text = `${prefixCls}__text`
            const desc = `${prefixCls}__desc`
            const ft = `${prefixCls}__ft`
            const arrow = `${prefixCls}__arrow`
            const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

            return {
                wrap,
                hd,
                thumb,
                bd,
                text,
                desc,
                ft,
                arrow,
                hover,
            }
        }],
    },
    methods: {
        onTap() {
            const { disabled, url, isLink, openType, delta } = this.data
            if (!disabled) {
                this.triggerEvent('click')
                if (isLink && url) {
                    useNativeRoute({
                        url,
                        openType,
                        delta,
                    }, this)
                }
            }
        },
        bindgetuserinfo(e) {
            this.triggerEvent('getuserinfo', e.detail)
        },
        bindcontact(e) {
            this.triggerEvent('contact', e.detail)
        },
        bindgetphonenumber(e) {
            this.triggerEvent('getphonenumber', e.detail)
        },
        bindopensetting(e) {
            this.triggerEvent('opensetting', e.detail)
        },
        bindlaunchapp(e) {
            this.triggerEvent('launchapp', e.detail)
        },
        bindchooseavatar(e) {
            this.triggerEvent('chooseavatar', e.detail)
        },
        onError(e) {
            this.triggerEvent('error', e.detail)
        },
        updateIsLastElement(isLast) {
            if(isLast === this.data.isLast) return;
            this.setData({ isLast })
        },
        getBoundingClientRect(callback) {
            useRect(`.${this.data.prefixCls}`, this)
                .then((rect) => {
                    if (!rect) return
                    callback.call(this, rect.height, rect)
                })
        },
    },
})
