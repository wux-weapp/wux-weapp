import { colors } from '../helpers/colors'

const defaultColors = {
    normal: colors.positive,
    progress: colors.positive,
    error: colors.assertive,
    success: colors.balanced,
}

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
            value: '',
            observer: 'updateStyle',
        },
        backgroundColor: {
            type: String,
            value: '#f3f3f3',
        },
        status: {
            type: String,
            value: 'normal',
            observer: 'updateStyle',
        },
        shape: {
            type: String,
            value: 'round',
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
            const { percent, strokeWidth, activeColor, status } = Object.assign({}, this.data, opts)
            const width = percent < 0 ? 0 : percent > 100 ? 100 : percent
            const height = strokeWidth > 0 ? strokeWidth : 10
            const backgroundColor = activeColor ? activeColor : (defaultColors[status] || defaultColors['normal'])
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
