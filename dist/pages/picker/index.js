import { $wuxPicker, $wuxPickerCity } from '../../components/wux'

Page({
	data: {},
	onLoad() {},
	onTapPhone() {
		$wuxPicker.init('phone', {
			title: "请选择您的手机", 
			cols: [
				{
					textAlign: 'center',
					values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus'],
					// displayValues: [1, 2, 3, 4, 5, 6]
				}
			],
			value: [5], 
		    onChange(p) {
				console.log(p)
				this.setData({
					phone: p.value
				})
			},
		})
	},
	onTapName() {
		$wuxPicker.init('name', {
			title: "请选择您的称呼", 
			cols: [
				{
					textAlign: 'center',
					values: ['赵', '钱', '孙', '李', '周', '吴', '郑', '王']
				},
				{
					textAlign: 'center',
					values: ['杰伦', '磊', '明', '小鹏', '燕姿', '菲菲', 'Baby']
				},
				{
					textAlign: 'center',
					values: ['先生', '小姐']
				}
			],
			value: [3, 2, 1],
			onChange(p) {
				console.log(p)
				this.setData({
					name: p.value
				})
			},
		})
	},
	onTapCity() {
		$wuxPickerCity.init('city', {
			title: '请选择目的地', 
			value: [8, 0, 11],
		    onChange(p) {
		    	console.log(p)
				this.setData({
					city: p.value
				})
			},
		})
	},
})