import baseBehavior from '../helpers/baseBehavior'
import mergeOptionsToData from '../helpers/mergeOptionsToData'

const defaults = {
    indicatorDots: false,
    indicatorColor: 'rgba(0, 0, 0, .3)',
    indicatorActiveColor: '#000000',
    autoplay: false,
    interval: 5000,
    duration: 500,
    circular: false,
    vertical: false,
    showDelete: true,
    current: 0,
    urls: [],
    ['delete']() {},
    cancel() {},
    onChange() {},
    onTap() { return true },
}

Component({
    behaviors: [baseBehavior],
    externalClasses: ['wux-class'],
    data: mergeOptionsToData(defaults),
    methods: {
        /**
         * 隐藏
         */
        hide() {
            this.$$setData({ in: false })
            if (typeof this.fns.cancel === 'function') {
                this.fns.cancel()
            }
        },
        /**
         * 显示
         */
        show(opts = {}) {
            const options = this.$$mergeOptionsAndBindMethods(Object.assign({}, defaults, opts))
            this.$$setData({ in: true, ...options })
        },
        /**
         * 图片点击事件
         */
        onTap(e) {
            const { index } = e.currentTarget.dataset
            if (this.fns.onTap(index, this.data.urls) === true) {
                this.hide()
            }
        },
        /**
         * 点击删除按钮时会触发 delete 事件
         */
        onDelete(e) {
            if (typeof this.fns['delete'] === 'function') {
                if (this.fns['delete'](this.data.current, this.data.urls) === true) {
                    this.hide()
                }
            }
        },
        /**
         * current 改变时会触发 change 事件
         */
        onChange(e) {
            this.$$setData({ current: e.detail.current })
            if (typeof this.fns.onChange === 'function') {
                this.fns.onChange.call(this, e)
            }
        },
        /**
         * 滚动到指定图片
         * @param {Number} current 滑块的索引值
         * @param {Number} duration 延迟时长触发事件
         */
        slideTo(current = 0, duration = 0) {
            const { urls, circular } = this.data
            const max = urls.length - 1

            if (current < 0) {
                current = circular ? max : 0
            } else if (current > max) {
                current = circular ? 0 : max
            }

            if (duration > 0) {
                return this.$$requestAnimationFrame(() => this.$$setData({ current }), duration)
            }

            return this.$$setData({ current })
        },
        /**
         * 滚动到下一张图片
         * @param {Number} duration 延迟时长触发事件
         */
        slideNext(duration) {
            return this.slideTo(this.data.current + 1, duration)
        },
        /**
         * 滚动到上一张图片
         * @param {Number} duration 延迟时长触发事件
         */
        slidePrev(duration) {
            return this.slideTo(this.data.current - 1, duration)
        },
    },
})