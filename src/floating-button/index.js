import baseBehavior from '../helpers/baseBehavior'

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    properties: {
        theme: {
            type: String,
            value: 'balanced',
        },
        position: {
            type: String,
            value: 'bottomRight',
        },
        backdrop: {
            type: Boolean,
            value: false,
        },
        buttons: {
            type: Array,
            value: [],
        },
        visible: {
            type: Boolean,
            value: false,
            observer(newVal) {
                this.triggerEvent('change', { value: newVal })
            },
        }
    },
    methods: {
        /**
         * 关闭
         */
        close() {
            this.setData({
                visible: false,
            })
        },
        /**
         * 打开
         */
        open() {
            this.setData({
                visible: true,
            })
        },
        /**
         * 按钮点击事件
         */
        buttonClicked(e) {
            const { index, value } = e.currentTarget.dataset
            this.triggerEvent('click', { index, value })
            this.close()
        },
        /**
         * 切换状态
         */
        toggle(e) {
            !this.data.visible ? this.open() : this.close()
        },
    },
})