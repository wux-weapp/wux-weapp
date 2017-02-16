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
		const gallery = {
			visible: !1, 
		}
		
		this.$scope.setData({
			[`$wux.gallery`]: gallery, 
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
		this.__initGallery()
    }

	/**
	 * 画廊组件
	 */
	__initGallery() {
		const that = this
		const extend = that.tools.extend
		const clone = that.tools.clone
		const $scope = that.$scope

		that.$wuxGallery = {
			/**
			 * 默认参数
			 */
			defaults: {
				current: 0, 
				urls: [], 
				delete: function() {}, 
				cancel: function() {}, 
			},
			/**
			 * 显示gallery组件
			 * @param {Object} opts 参数对象
			 * @param {Number} opts.current 当前显示图片的索引值
			 * @param {Array} opts.urls 需要预览的图片链接列表
			 * @param {Function} opts.delete 点击删除的回调函数
			 * @param {Function} opts.cancel 点击关闭的回调函数
			 */
			show(opts = {}) {
				const options = extend(clone(this.defaults), opts)
				const self = {}

				// 隐藏
				self.hide = () => {
					if (self.removed) return !1
					self.removed = !0
					that.setHidden('gallery', 'weui-animate-slide-left')
					typeof options.cancel === 'function' && options.cancel()
				}

				// 显示
				self.show = () => {
					if (self.removed) return !1
					that.setVisible('gallery', 'weui-animate-slide-right')
				}

				// 渲染组件
				$scope.setData({
					[`$wux.gallery`]: options, 
					[`$wux.gallery.onHide`]: `galleryHide`, 
					[`$wux.gallery.onDelete`]: `galleryDelete`, 
					[`$wux.gallery.onChange`]: `galleryChange`, 
				})

				// 绑定hide事件
				$scope[`galleryHide`] = self.hide

				// 绑定delete事件
				$scope[`galleryDelete`] = (e) => {
					if(typeof options.delete === 'function') {
						const gallery = $scope.data.$wux.gallery
						if (options.delete(gallery.current, options.urls) === true) {
							self.hide()
						}
					}
				}

				// 绑定change事件
				$scope[`galleryChange`] = (e) => {
					$scope.setData({
						[`$wux.gallery.current`]: e.detail.current, 
					})
				}

				self.show()

				return self.hide
			}
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