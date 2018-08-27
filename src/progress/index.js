import { isPresetColor } from '../helpers/colors'

Component({
    externalClasses: ['wux-class'],
    properties: {
        percent: {
            type: Number,
            value: 0,
            observer: 'updateStyle',
        },
        strokeWidth: {
            type: Number,
            value: 10,
            observer: 'updateStyle',
        },
        activeColor: {
            type: String,
            value: 'balanced',
            observer: 'updateStyle',
        },
        backgroundColor: {
            type: String,
            value: '#f3f3f3',
        },
        shape: {
            type: String,
            value: 'circle',
        },
        barStyle: {
            type: String,
            value: '',
        },
        showInfo: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        width: 0,
        style: '',
    },
    methods: {
        updateStyle(opts = {}) {
            const { percent, strokeWidth, activeColor } = Object.assign({}, this.data, opts)
            const width = percent < 0 ? 0 : percent > 100 ? 100 : percent
            const height = strokeWidth > 0 ? strokeWidth : 10
            const backgroundColor = isPresetColor(activeColor)
            const style = `background-color: ${backgroundColor}; width: ${width}%; height: ${height}px;`

            this.setData({
                width,
                style,
            })
        },
    },
    attached() {
        this.updateStyle()
    },
})
