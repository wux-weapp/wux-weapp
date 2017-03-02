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

		// 筛选非函数类型
		if (!this.isEmptyObject(data)) {
			for(let key in data) {
				if (data.hasOwnProperty(key) && typeof data[key] !== `function`) {
					this._data[key] = data[key]
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
			for(let key in methods) {
				if (methods.hasOwnProperty(key) && typeof methods[key] === `function`) {
					this[key] = methods[key] = methods[key].bind(this)

					// 将 methods 内的方法重命名并挂载到 page 上面，否则 template 内找不到事件
					this.page[`${scope}.${key}`] = methods[key]

					// 将方法名同步至 page.data 上面，方便在模板内使用 {{ method }} 方式绑定事件
					this.page.setData({
						[`${scope}.${key}`]: `${scope}.${key}`, 
					})
				}
			}
		}
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
		this.page.setData({
			[`${this.options.scope}.animateCss`]: className, 
			[`${this.options.scope}.visible`]: !0, 
		})
    }

    /**
	 * 设置元素隐藏
	 */
	setHidden(className = `weui-animate-fade-out`, timer = 300) {
    	this.page.setData({
			[`${this.options.scope}.animateCss`]: className, 
		})
		setTimeout(() => {
			this.page.setData({
				[`${this.options.scope}.visible`]: !1, 
			})
		}, timer)
    }
}

export default Component