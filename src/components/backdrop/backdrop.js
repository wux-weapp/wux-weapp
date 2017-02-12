import tools from '../tools/tools'

/**
 * wux组件
 * @param {Object} $scope 作用域对象
 */
class wux {
	constructor($scope) {
		Object.assign(this, {
			$scope, 
		})
		this.__init()
	}

	/**
	 * 初始化类方法
	 */
	__init() {
		this.__initDefaults()
		this.__initTools()
		this.__initComponents()
	}

	/**
	 * 默认参数
	 */
	__initDefaults() {
		const backdrop = {
			visible: !1, 
		}
		
		this.$scope.setData({
			[`$wux.backdrop`]: backdrop, 
		})
	}

	/**
	 * 工具方法
	 */
	__initTools() {
    	this.tools = new tools
    }

    /**
     * 初始化所有组件
     */
    __initComponents() {
    	this.__initBackdrop()
    }

    /**
     * 背景幕组件
     */
	__initBackdrop() {
		const that = this
		const $scope = that.$scope

		that.$wuxBackdrop = {
			/**
			 * 锁定次数
			 */
			backdropHolds: 0,
			/**
			 * 保持锁定
			 */
			retain() {
				this.backdropHolds++
				if (this.backdropHolds === 1) {
					that.setVisible('backdrop')
				}
			},
			/**
			 * 释放锁定
			 */
			release() {
				if (this.backdropHolds === 1) {
					that.setHidden('backdrop')
				}
				this.backdropHolds = Math.max(0, this.backdropHolds - 1)
			},
		}
	}

	/**
	 * 设置元素显示
	 */
	setVisible(key, className = 'weui-animate-fade-in') {
    	this.$scope.setData({
			[`$wux.${key}.visible`]: !0, 
			[`$wux.${key}.animateCss`]: className, 
		})
    }

    /**
	 * 设置元素隐藏
	 */
	setHidden(key, className = 'weui-animate-fade-out', timer = 300) {
    	this.$scope.setData({
			[`$wux.${key}.animateCss`]: className, 
		})

		setTimeout(() => {
			this.$scope.setData({
				[`$wux.${key}.visible`]: !1, 
			})
		}, timer)
    }
}

export default wux