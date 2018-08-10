const defaultStatus = ['wait', 'process', 'finish', 'error']
const defaultIcon = 'ios-checkmark'

Component({
    externalClasses: ['wux-class'],
    options: {
        multipleSlots: true,
    },
    relations: {
        '../steps/index': {
            type: 'parent',
        },
    },
    properties: {
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
    methods: {
        updateCurrent(opts = {}) {
            const width = opts.direction === 'horizontal' ? 100 / opts.length + '%' : '100%'
            const index = defaultStatus.indexOf(this.data.status)
            const hasIcon = opts.index < opts.current || this.data.icon
            const thumb = this.data.icon || defaultIcon
            const suffix = index !== -1 ? defaultStatus[index] : opts.index < opts.current ? 'finish' : opts.index === opts.current ? 'process' : ''
            const className = `wux-step--${suffix}`
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