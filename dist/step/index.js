const defaultStatus = ['wait', 'process', 'finish', 'error']
const defaultIcon = 'data:image/png;base64,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'

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
            const thumb = opts.icon ? opts.icon : defaultIcon
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