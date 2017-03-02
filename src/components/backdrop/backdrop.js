import Component from '../component'

export default {
	/**
	 * 初始化
	 */
	init() {
		const options = {
            animateCss: undefined, 
            visible: !1, 
        }

		// 实例化组件
    	const component = new Component({
    		scope: `$wux.backdrop`, 
    		data: options, 
    		methods: {
    			/**
    			 * 保持锁定
    			 */
	    		retain() {
	    			if (typeof this.backdropHolds !== `number` || !this.backdropHolds) {
	    				this.backdropHolds = 0
	    			}

	    			this.backdropHolds++

	    			if (this.backdropHolds === 1) {
	    				this.setVisible()
	    			}
	    		},
	    		/**
	    		 * 释放锁定
	    		 */
	    		release() {
	    			if (this.backdropHolds === 1) {
						this.setHidden()
					}
					this.backdropHolds = Math.max(0, this.backdropHolds - 1)
	    		},
	    	},
    	})

    	return component 	
	},
}