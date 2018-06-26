import baseBehavior from '../helpers/baseBehavior'

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    properties: {
        position: {
            type: String,
            value: 'bottomRight',
            observer(newVal) {
                this.updateCls(newVal)
            },
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
         * 默认数据
         */
        getData() {
            return [{
                    type: 'topLeft',
                    className: 'wux-speed-dial--top-left',
                },
                {
                    type: 'topRight',
                    className: 'wux-speed-dial--top-right',
                },
                {
                    type: 'bottomLeft',
                    className: 'wux-speed-dial--bottom-left',
                },
                {
                    type: 'bottomRight',
                    className: 'wux-speed-dial--bottom-right',
                }
            ]
        },
        /**
         * 判断提示类型，显示对应的位置
         * 
         * @param {String} position 
         */
        updateCls(position) {
            const BUTTON_TYPES = this.getData()
            const index = BUTTON_TYPES.map((n) => n.type).indexOf(position)
            const className = index !== -1 ? BUTTON_TYPES[index].className : BUTTON_TYPES[3].className

            this.setData({
                className,
            })
        },
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
    attached() {
        this.updateCls(this.data.position)
    },
})