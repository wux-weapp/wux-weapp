import { $wuxBackdrop } from '../index'

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
            observer: 'onVisibleChange',
        },
        classNames: {
            type: String,
            value: 'fadeIn',
            observer: 'getTransitionName',
        },
    },
    data: {
        transitionName: '',
        hidden: true,
    },
    methods: {
        close() {
            this.triggerEvent('close')
        },
        onMaskClick() {
            if (this.data.maskClosable) {
                this.close()
            }
        },
        onExited() {
            this.setData({ hidden: true })
            this.triggerEvent('closed')
        },
        getTransitionName(value = this.data.classNames) {
            this.setData({
                transitionName: `wux-animate--${value}`,
            })
        },
        onVisibleChange(visible) {
            if (visible && this.data.hidden) {
                this.setData({ hidden: false })
            }
            if (this.data.mask && this.$wuxBackdrop) {
                this.$wuxBackdrop[visible ? 'retain' : 'release']()
            }
            this.triggerEvent('change', { visible })
        },
    },
    created() {
        if (this.data.mask) {
            this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this)
        }
    },
    attached() {
        this.getTransitionName()
    },
})