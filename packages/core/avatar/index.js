import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import { useRect } from '../helpers/hooks/useDOM'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-avatar',
        },
        shape: {
            type: String,
            value: 'circle',
        },
        size: {
            type: String,
            value: 'default',
        },
        src: {
            type: String,
            value: '',
        },
        bodyStyle: {
            type: [String, Object],
            value: '',
            observer(newVal) {
                this.setData({
                    extStyle: styleToCssString(newVal),
                })
            },
        },
        scale: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        extStyle: '',
        childrenStyle: '',
    },
    computed: {
        classes: ['prefixCls, shape, size, src', function(prefixCls, shape, size, src) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${shape}`]: shape,
                [`${prefixCls}--${size}`]: size,
                [`${prefixCls}--thumb`]: src,
            })
            const string = `${prefixCls}__string`

            return {
                wrap,
                string,
            }
        }],
    },
    methods: {
        setScale() {
            const { prefixCls } = this.data
            useRect([`.${prefixCls}`, `.${prefixCls}__string`], this)
                .then(([parent, child]) => {
                    const offset = parent.width - 8 < child.width
                    const childrenScale = offset ? (parent.width - 8) / child.width : 1
                    const childrenStyle = childrenScale !== 1
                        ? styleToCssString({
                            position: 'absolute',
                            display: 'inline-block',
                            transform: `scale(${childrenScale})`,
                            left: `calc(50% - ${Math.round(child.width / 2)}px)`,
                        })
                        : ''

                    this.setData({
                        childrenStyle,
                    })
                })
        },
    },
    ready() {
        if (!this.data.src && this.data.scale) {
            this.setScale()
        }
    },
})
