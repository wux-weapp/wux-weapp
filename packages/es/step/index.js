import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

const defaultStatus = ['wait', 'process', 'finish', 'error']
const defaultIcon = 'ios-checkmark'

baseComponent({
    relations: {
        '../steps/index': {
            type: 'parent',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-step',
        },
        status: {
            type: String,
            value: '',
        },
        title: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        },
        icon: {
            type: String,
            value: '',
        },
    },
    data: {
        width: '100%',
        length: 1,
        index: 0,
        current: 0,
        direction: 'horizontal',
    },
    computed: {
        classes: ['prefixCls, direction', function(prefixCls, direction) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${direction}`]: direction,
            })
            const hd = `${prefixCls}__hd`
            const icon = `${prefixCls}__icon`
            const thumb = `${prefixCls}__thumb`
            const bd = `${prefixCls}__bd`
            const title = `${prefixCls}__title`
            const content = `${prefixCls}__content`
            const ft = `${prefixCls}__ft`

            return {
                wrap,
                hd,
                icon,
                thumb,
                bd,
                title,
                content,
                ft,
            }
        }],
    },
    methods: {
        updateCurrent(opts = {}) {
            const width = opts.direction === 'horizontal' ? 100 / opts.length + '%' : '100%'
            const index = defaultStatus.indexOf(this.data.status)
            const hasIcon = opts.index < opts.current || this.data.icon
            const thumb = this.data.icon || defaultIcon
            const suffix = index !== -1 ? defaultStatus[index] : opts.index < opts.current ? 'finish' : opts.index === opts.current ? 'process' : ''
            const className = `${this.data.prefixCls}--${suffix}`
            const options = Object.assign({
                width,
                className,
                hasIcon,
                thumb,
            }, opts)

            this.setData(options)
        },
    },
    attached() {
        this.updateCurrent(this.data)
    },
})
