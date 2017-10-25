/**
 * 模块化组件
 * @param {Object} options 配置项
 * @param {String} options.scope 组件的命名空间
 * @param {Object} options.data 组件的动态数据
 * @param {Object} options.methods 组件的事件函数
 */
class Component {
    constructor(options = {}) {
        Object.assign(this, {
            options,
        })
        this.__init()
    }

    /**
     * 初始化
     */
    __init() {
        this.page = getCurrentPages()[getCurrentPages().length - 1]
        const setData = this.page.setData.bind(this.page)

        // 检查版本库是否高于或等于 1.5.0，setData 方法才有回调函数，否则采用 setTimeout 模拟
        const checkSDKVersion = () => {
            let has = false

            try {
                const res = wx.getSystemInfoSync()
                const SDKVersion = res.SDKVersion.split('.')
                has = Number(SDKVersion[0]) > 1 || Number(SDKVersion[1]) >= 5
            } catch (e) {}

            return has
        }

        // 重写 setData 方法，支持回调，兼容低版本
        this.setData = (obj = {}, cb = () => ({})) => {
            const fn = () => {
                if (typeof cb === 'function') {
                    cb()
                }
            }

            if (checkSDKVersion()) {
                setData(obj, fn)
            } else {
                setData(obj)
                setTimeout(fn, 0)
            }
        }

        this.__initState()
    }

    /**
     * 初始化组件状态
     */
    __initState() {
        this.options.data && this.__initData()
        this.options.methods && this.__initMethods()
    }

    /**
     * 绑定组件动态数据
     */
    __initData() {
        const scope = this.options.scope
        const data = this.options.data

        this._data = {}

        // 筛选非函数类型，更改参数中函数的 this 指向
        if (!this.isEmptyObject(data)) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    if (typeof data[key] === `function`) {
                        data[key] = data[key].bind(this)
                    } else {
                        this._data[key] = data[key]
                    }
                }
            }
        }

        // 将数据同步到 page.data 上面方便渲染组件
        this.page.setData({
            [`${scope}`]: this._data,
        })
    }

    /**
     * 绑定组件事件函数
     */
    __initMethods() {
        const scope = this.options.scope
        const methods = this.options.methods

        // 筛选函数类型
        if (!this.isEmptyObject(methods)) {
            for (let key in methods) {
                if (methods.hasOwnProperty(key) && typeof methods[key] === `function`) {
                    this[key] = methods[key] = methods[key].bind(this)

                    // 将 methods 内的方法重命名并挂载到 page 上面，否则 template 内找不到事件
                    this.page[`${scope}.${key}`] = methods[key]

                    // 将方法名同步至 page.data 上面，方便在模板内使用 {{ method }} 方式绑定事件
                    this.setData({
                        [`${scope}.${key}`]: `${scope}.${key}`,
                    })
                }
            }
        }
    }

    /**
     * 获取组件的 data 数据
     */
    getComponentData() {
        let data = this.page.data
        let name = this.options.scope && this.options.scope.split(`.`)

        name.forEach((n, i) => {
            data = data[n]
        })

        return data
    }

    /**
     * 判断 object 是否为空
     */
    isEmptyObject(e) {
        for (let t in e)
            return !1
        return !0
    }

    /**
     * 设置元素显示
     */
    setVisible(className = `weui-animate-fade-in`) {
        this.setData({
            [`${this.options.scope}.animateCss`]: className,
            [`${this.options.scope}.visible`]: !0,
        })
    }

    /**
     * 设置元素隐藏
     */
    setHidden(className = `weui-animate-fade-out`, timer = 300) {
        this.setData({
            [`${this.options.scope}.animateCss`]: className,
        })
        setTimeout(() => {
            this.setData({
                [`${this.options.scope}.visible`]: !1,
            })
        }, timer)
    }
}

export default Component