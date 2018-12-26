/**
 * weapp custom component extend behavior -- computed
 * https://github.com/wechat-miniprogram/computed
 */

import isEmpty from './isEmpty'
import shallowEqual from './shallowEqual'

module.exports = Behavior({
    lifetimes: {
        created () {
            this._computedCache = {}
            this._originalSetData = this.setData
            this.setData = this._setData
            this._doingSetData = false
        },
    },
    definitionFilter (defFields) {
        const computed = defFields.computed || {}
        const computedKeys = Object.keys(computed)

        // 计算 computed
        const calcComputed = (scope) => {
            const needUpdate = {}
            const computedCache = scope._computedCache || scope.data

            for (let i = 0, len = computedKeys.length; i < len; i++) {
                const key = computedKeys[i]
                const getter = computed[key]

                if (typeof getter === 'function') {
                    const value = getter.call(scope)

                    if (!shallowEqual(computedCache[key], value)) {
                        needUpdate[key] = value
                        computedCache[key] = value
                    }
                }
            }

            return needUpdate
        }

        // 初始化 computed
        const initComputed = () => {
            defFields.data = defFields.data || {}

            // 先将 properties 里的字段写入到 data 中
            const data = defFields.data
            const properties = defFields.properties
            const hasOwnProperty = Object.prototype.hasOwnProperty
            if (properties) {
                // eslint-disable-next-line complexity
                Object.keys(properties).forEach((key) => {
                    const value = properties[key]
                    let oldObserver

                    // eslint-disable-next-line max-len
                    if (value === null || value === Number || value === String || value === Boolean || value === Object || value === Array) {
                        properties[key] = {
                            type: value,
                        }
                    } else if (typeof value === 'object') {
                        if (hasOwnProperty.call(value, 'value')) {
                            // 处理值
                            data[key] = value.value
                        }

                        if (hasOwnProperty.call(value, 'observer')) {
                            if (typeof value.observer === 'function') {
                                oldObserver = value.observer
                            } else if (typeof value.observer === 'string') {
                                oldObserver = defFields.methods[value.observer]
                            }
                        }
                    }

                    // 追加 observer，用于监听变动
                    properties[key].observer = function (...args) {
                        const originalSetData = this._originalSetData

                        if (this._doingSetData) {
                            // eslint-disable-next-line no-console
                            console.warn('can\'t call setData in computed getter function!')
                            return
                        }

                        this._doingSetData = true

                        // 计算 computed
                        const needUpdate = calcComputed(this)

                        // 做 computed 属性的 setData
                        if (!isEmpty(needUpdate)) {
                            originalSetData.call(this, needUpdate)
                        }

                        this._doingSetData = false

                        if (oldObserver) oldObserver.apply(this, args)
                    }
                })
            }

            // 计算 computed
            calcComputed(defFields, true)
        }

        initComputed()

        defFields.methods = defFields.methods || {}
        defFields.methods._setData = function (data, callback) {
            const originalSetData = this._originalSetData

            if (this._doingSetData) {
                // eslint-disable-next-line no-console
                console.warn('can\'t call setData in computed getter function!')
                return
            }

            this._doingSetData = true

            // TODO 过滤掉 data 中的 computed 字段
            const dataKeys = Object.keys(data)
            for (let i = 0, len = dataKeys.length; i < len; i++) {
                const key = dataKeys[i]

                if (computed[key]) delete data[key]
            }

            // 做 data 属性的 setData
            originalSetData.call(this, data, callback)

            // 计算 computed
            const needUpdate = calcComputed(this)

            // 做 computed 属性的 setData
            if (!isEmpty(needUpdate)) {
                originalSetData.call(this, needUpdate)
            }

            this._doingSetData = false
        }
    },
})
