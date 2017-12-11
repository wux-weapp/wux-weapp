import { $wuxToptips } from '../../components/wux'
import WxValidate from '../../assets/plugins/WxValidate'

Page({
	data: {
    	form: {
			gender    : '', 
			assistance: '', 
			tel       : '', 
			idcard    : '', 
        },
        radio: [
            {
            	name: '男', 
            	value: 'male', 
            	checked: !1, 
            },
            {
            	name: '女', 
            	value: 'female', 
            },
        ],
        checkbox: [
            {
            	name: '黄药师', 
            	value: '0001', 
            	checked: !1, 
            },
            {
            	name: '欧阳锋', 
            	value: '0002', 
            },
            {
            	name: '段智兴', 
            	value: '0003', 
            },
            {
            	name: '洪七公', 
            	value: '0004', 
            },
        ],
    },
	onLoad() {
		this.initValidate()
	},
	showToptips(error) {
		const hideToptips = $wuxToptips.show({
			timer: 3000,
			text: error.msg || '请填写正确的字段',
			success: () => console.log('toptips', error)
		})

		// setTimeout(hideToptips, 1500)
	},
	submitForm(e) {
		const params = e.detail.value

		console.log(params)

		if (!this.WxValidate.checkForm(e)) {
			const error = this.WxValidate.errorList[0]
			this.showToptips(error)
			return false
		}

		$wuxToptips.success({
			hidden: !0, 
			text: '提交成功', 
		})
	},
	initValidate() {
    	this.WxValidate = new WxValidate({
			gender: {
				required: true, 
			},
			assistance: {
				required: true, 
				assistance: true, 
			},
			tel: {
				required: true, 
				tel: true, 
			},
			idcard: {
				required: true, 
				idcard: true, 
			},
		}, {
			gender: {
				required: '请选择性别', 
			},
			assistance: {
				required: '请勾选1-2个敲码助手', 
			},
			tel: {
				required: '请输入手机号', 
				tel: '请输入正确的手机号', 
			},
			idcard: {
				required: '请输入身份证号码', 
				idcard: '请输入正确的身份证号码', 
			},
		})

		this.WxValidate.addMethod('assistance', (value, param) => {
			return this.WxValidate.optional(value) || (value.length >= 1 && value.length <= 2)
		}, '请勾选1-2个敲码助手')
    },
	radioChange(e) {		 
		const value = e.detail.value
		const radio = this.data.radio
		radio.forEach(n => n.checked = n.value === value)
		this.setData({
			radio: radio, 
			'form.gender': value, 
		})
	},
	checkboxChange(e) {
        const values = e.detail.value
        const checkbox = this.data.checkbox

        for (let i = 0, lenI = checkbox.length; i < lenI; ++i) {
            checkbox[i].checked = !1
            for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkbox[i].value == values[j]){
                    checkbox[i].checked = !0
                    break
                }
            }
        }

        this.setData({
            checkbox: checkbox, 
            'form.assistance': values, 
        })
    },
})