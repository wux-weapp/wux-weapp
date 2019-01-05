import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

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
            type: String,
            value: '',
        },
        scale: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        childrenStyle: '',
    },
    computed: {
        classes() {
            const { prefixCls, shape, size, src } = this.data
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
        },
    },
    methods: {
        setScale() {
            const query = wx.createSelectorQuery().in(this)
            query.select('.wux-avatar').boundingClientRect()
            query.select('.wux-avatar__string').boundingClientRect()
            query.exec((rects) => {
                if (rects.filter((n) => !n).length) {
                    return false
                }

                const [parent, child] = rects
                const offset = parent.width - 8 < child.width
                const childrenScale = offset ? (parent.width - 8) / child.width : 1
                const childrenStyle = childrenScale !== 1 ? `position: absolute; display: inline-block; transform: scale(${childrenScale}); left: calc(50% - ${Math.round(child.width / 2)}px)` : ''

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