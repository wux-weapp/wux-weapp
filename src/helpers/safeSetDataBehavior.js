export default Behavior({
    lifetimes: {
        created() {
            this.nextCallback = null
        },
        detached() {
            this.cancelNextCallback()
        },
    },
    methods: {
        /**
         * safeSetData
         * @param {Object} nextData 数据对象
         * @param {Function} callback 回调函数
         */
        safeSetData(nextData, callback) {
            this.pendingData = Object.assign({}, this.data, nextData)
            callback = this.setNextCallback(callback)

            this.setData(nextData, () => {
                this.pendingData = null
                callback()
            })
        },
        /**
         * 设置下一回调函数
         * @param {Function} callback 回调函数
         */
        setNextCallback(callback) {
            let active = true

            this.nextCallback = (event) => {
                if (active) {
                    active = false
                    this.nextCallback = null

                    callback.call(this, event)
                }
            }

            this.nextCallback.cancel = () => {
                active = false
            }

            return this.nextCallback
        },
        /**
         * 取消下一回调函数
         */
        cancelNextCallback() {
            if (this.nextCallback !== null) {
                this.nextCallback.cancel()
                this.nextCallback = null
            }
        },
    },
})