import computedBehavior from './computedBehavior'
import relationsBehavior from './relationsBehavior'
import classNames from './classNames'

const baseComponent = (options = {}) => {
    const { created, detached } = options

    // add default externalClasses
    options.externalClasses = ['wux-class', 'wux-hover-class', ...(options.externalClasses = options.externalClasses || [])]

    // add default behaviors
    options.behaviors = [relationsBehavior, computedBehavior, ...(options.behaviors = options.behaviors || [])]

    // check hasField
    if (options.hasField) {
        options.behaviors = [...options.behaviors, 'wx://form-field']
        delete options.hasField
    }

    // check hasExport
    if (options.hasExport) {
        options.behaviors = [...options.behaviors, 'wx://component-export']
        options.methods = {
            export () {
                return this
            },
            ...options.methods,
        }
        delete options.hasExport
    }

    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true,
        ...options.options,
    }

    // fix first computed
    options.classNames = classNames

    // add default methods
    options.methods = {
        /**
         * set className
         */
        classNames,
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
        ...options.methods,
    }

    /**
     * 组件生命周期函数，在组件实例进入页面节点树时执行
     */
    options.created = function() {
        this.nextCallback = null

        if (created) {
            created.call(this)
        }
    }

    /**
     * 组件生命周期函数，在组件实例被从页面节点树移除时执行
     */
    options.detached = function() {
        this.cancelNextCallback()

        if (detached) {
            detached.call(this)
        }
    }

    return Component(options)
}

export default baseComponent
