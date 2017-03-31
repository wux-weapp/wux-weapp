import { $wuxXnumber } from '../../components/wux'

Page({
	data: {},
	onLoad() {
		$wuxXnumber.init('num1')

		$wuxXnumber.init('num2', {
			callback: (value) => console.log(value), 
		})

		$wuxXnumber.init('num3', {
			className: 'custom-xnumber', 
		})

		$wuxXnumber.init('num4', {
			step: .5, 
		})

		$wuxXnumber.init('num5', {
			min: -5, 
			max: 8, 
			value: 1, 
		})

		$wuxXnumber.init('num6', {
			disabled: !1, 
		})

		$wuxXnumber.init('num7', {
			longpress: !0, 
		})
	},
})