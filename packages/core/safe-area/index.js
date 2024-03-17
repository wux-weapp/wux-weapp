import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import safeAreaBehavior from '../helpers/mixins/safeAreaBehavior'
import { getSafeAreaInset } from '../helpers/hooks/useSafeArea'

/**
 * css var prefix
 */
const cssVarPattern = /^--/

baseComponent({
    behaviors: [safeAreaBehavior],
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-safe-area',
        },
        multiple: {
            type: Number,
            value: 1,
        },
        wrapStyle: {
            type: [String, Object],
            value: '',
        },
        forceRender: {
            type: Boolean,
            value: false,
        },
        supports: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        extStyle: '',
    },
    computed: {
        classes: ['prefixCls, forceRender, supports, safeAreaConfig, isIPhoneX', function(prefixCls, forceRender, supports, safeAreaConfig, isIPhoneX) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--position-bottom`]: (forceRender || isIPhoneX) && safeAreaConfig.bottom,
                [`${prefixCls}--position-top`]: (forceRender || isIPhoneX) && !safeAreaConfig.bottom,
                [`${prefixCls}--supports`]: (forceRender || isIPhoneX) && supports,
            })

            return {
                wrap,
            }
        }],
    },
    observers: {
        ['safeAreaConfig, safeAreaStyle, isIPhoneX, multiple, wrapStyle, forceRender, supports'](...args) {
            const [
                safeAreaConfig,
                safeAreaStyle,
                isIPhoneX,
                multiple,
                wrapStyle,
                forceRender,
                supports,
            ] = args
            this.updateStyle({
                safeAreaConfig,
                safeAreaStyle,
                isIPhoneX,
                multiple,
                wrapStyle,
                forceRender,
                supports,
            })
        },
    },
    methods: {
        updateStyle(props) {
            const {
                safeAreaConfig,
                safeAreaStyle,
                isIPhoneX,
                multiple,
                wrapStyle,
                forceRender,
                supports,
            } = props
            const position = safeAreaConfig.bottom ? 'bottom' : safeAreaConfig.top ? 'top' : 'none'
            const normalStyle =  {}
            const varStyle =  {
                ['--safe-area-multiple']: multiple,
            }
            if (
                (forceRender || isIPhoneX) &&
                !supports &&
                ['bottom', 'top'].includes(position)
            ) {
                const safeAreaInset = getSafeAreaInset(safeAreaStyle)
                const property = position === 'bottom' ? 'paddingBottom' : 'paddingTop'
                normalStyle[property] = `calc(${safeAreaInset[position]}PX * ${multiple})`
                varStyle[`--safe-area-inset-${position}`] = `${safeAreaInset[position]}PX`
                varStyle[property] = `calc(var(--safe-area-inset-${position}) * var(--safe-area-multiple))`
            }
            const extStyle = styleToCssString(
                styleToCssString(normalStyle) + styleToCssString(varStyle, { exclude: cssVarPattern }) + styleToCssString(wrapStyle)
            )
            if (extStyle !== this.data.extStyle) {
                this.setData({
                    extStyle,
                })
            }
        },
    },
    attached() {
        this.updateStyle(this.data)
    },
})
