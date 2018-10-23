import { $wuxBackdrop } from '../index'

const prefixCls = 'wux-animate'

Component({
    externalClasses: ['wux-class'],
    options: {
        multipleSlots: true,
    },
    properties: {
        title: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        },
        extra: {
            type: String,
            value: '',
        },
        position: {
            type: String,
            value: 'center',
            observer: 'getTransitionName',
        },
        wrapStyle: {
            type: String,
            value: '',
        },
        closable: {
            type: Boolean,
            value: false,
        },
        mask: {
            type: Boolean,
            value: true,
        },
        maskClosable: {
            type: Boolean,
            value: true,
        },
        visible: {
            type: Boolean,
            value: false,
            observer: 'setPopupVisible',
        },
        zIndex: {
            type: Number,
            value: 1000,
        },
    },
    data: {
        transitionName: '',
        popupVisible: false,
    },
    methods: {
        /**
         * 点击关闭按钮事件
         */
        close() {
            this.triggerEvent('close')
        },
        /**
         * 点击蒙层事件
         */
        onMaskClick() {
            if (this.data.maskClosable) {
                this.close()
            }
        },
        /**
         * 组件关闭后的回调函数
         */
        onExited() {
            this.triggerEvent('closed')
        },
        /**
         * 获取过渡的类名
         */
        getTransitionName(value = this.data.position) {
            let transitionName = ''

            switch (value) {
                case 'top':
                    transitionName = `${prefixCls}--slideInDown`
                    break
                case 'right':
                    transitionName = `${prefixCls}--slideInRight`
                    break
                case 'bottom':
                    transitionName = `${prefixCls}--slideInUp`
                    break
                case 'left':
                    transitionName = `${prefixCls}--slideInLeft`
                    break
                default:
                    transitionName = `${prefixCls}--fadeIn`
                    break
            }

            this.setData({ transitionName })
        },
        /**
         * 设置 popup 组件的显示隐藏
         */
        setPopupVisible(popupVisible) {
            if (this.data.popupVisible !== popupVisible) {
                this.setData({ popupVisible })
                this.setBackdropVisible(popupVisible)
            }
        },
        /**
         * 设置 backdrop 组件的显示隐藏
         */
        setBackdropVisible(visible) {
            if (this.data.mask && this.$wuxBackdrop) {
                this.$wuxBackdrop[visible ? 'retain' : 'release']()
            }
        },
    },
    created() {
        if (this.data.mask) {
            this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
        }
    },
    attached() {
        this.setPopupVisible(this.data.visible)
        this.getTransitionName()
    },
})