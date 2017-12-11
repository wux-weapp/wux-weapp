import Component from '../component'

export default {
	/**
	 * 默认参数
	 */
	setDefaults() {
		return {
			className: undefined, 
			icon: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfgCxwAHyE2vHbUAAACWUlEQVRo3u2ZP2gTcRTHP7EpBTOJWrDSxdZBxE0yCC3UdilqUBCs4B8ogVfr0EnQ6lAEsylIXR6moFA1g6IoSAct7WhxUBQFsS5aLDgWcWitLjG5y11zufxyl8Hfd8n7vd+79z738svvfkfAysrqf1fC3609jHGYtnDJJBEuHiDpU7yNAkfj6sAmH990fOV9ADTN8fjK+3VA4izvB9AfL4B3EbY67E75Vn9qHeSCHAzfgQZJIU+f7moaAPvpAC7FAKAnPJ6EprkOQFbP6OZIAbSdgna5PEf4wSt6i8O7/NRx3RZdB84B4y7PGFsrYq7RExGAppgAhnV72ScDdDFVGi7ST4s8jqoD/77/UadTvkiW0wB8pltmZX3jBEYAmizd6YSmKiYfATAStLGadWDAYQ+5p+QXF4G5oBQGANrObccwr50VAXmG5HdQFs8RQpfoKA023Ip1N5c563E/5Qrvwj3NkqGiAU2Q5gYHfCczZPio55mvtuyMADTDHbZUDdnDLOhJKbiu+1O23Qe3sGsgFVC+HFejQgLIA1ro40OVkGUO0SpTtWYM/SuQdZljL/t44jM5T5od8lzWas8XehECCLznmO7kDc6HTLcshs9lsA/IEsOO4Wg95U13whmHPV1fCiMAWWWkaOZkpQkAwP3i52S9CQwBZIUccE+WmwQA3AKu1n+5MYB8JyufmggAte96EQGYyQJYAAtgASyA90y46rC/ahM68DLiigtBAFHfdC4AQBZ4GGH5tzwL6gCc8n3paIRe01v52trQ/wuqaI0X3JQZ80RWVlYN11+uNXxr6IunHwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNi0xMS0yOFQwMDozMTozMyswODowMBHRiXcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTYtMTEtMjhUMDA6MzE6MzMrMDg6MDBgjDHLAAAAAElFTkSuQmCC`, 
			title: undefined, 
			text: undefined, 
			buttons: [], 
			buttonClicked() {}, 
		}
	},
	/**
	 * 显示提示信息组件
	 * @param {String} id   唯一标识
	 * @param {Object} opts 配置项
	 * @param {String} opts.className 自定义类名
	 * @param {String} opts.icon 图标
	 * @param {String} opts.title 标题
	 * @param {String} opts.text 文本
	 * @param {Array} opts.buttons 按钮
	 * @param {Function} opts.buttonClicked 按钮点击事件
	 */
	init(id, opts = {}) {
		const options = Object.assign({}, this.setDefaults(), opts)

    	// 实例化组件
    	const component = new Component({
    		scope: `$wux.prompt.${id}`, 
    		data: options, 
    		methods: {
    			/**
    			 * 隐藏
    			 */
				hide() {
					this.setHidden()
				},
				/**
				 * 显示
				 */
				show() {
					this.setVisible()
				},
				/**
				 * 点击按钮触发事件
				 */
				buttonClicked(e) {
					const index = e.currentTarget.dataset.index
	    			typeof options.buttonClicked === `function` && options.buttonClicked(index, options.buttons[index])
				},
			},
    	})

		return {
			show: component.show, 
			hide: component.hide, 
		}
	},
}