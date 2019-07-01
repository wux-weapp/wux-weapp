import { $wuxDatePicker } from '../../dist/index'

function formatDate(date, fmt) {
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds(),
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt
}

Page({
	data: {
        value1: [],
        value2: [],
        value3: [],
        value4: [],
        value5: [],
        value6: [],
        value7: [],
        value8: [],
        value9: [],
        displayValue1: '请选择',
        displayValue2: '请选择',
        displayValue3: '请选择',
        displayValue4: '请选择',
        displayValue5: '请选择',
        displayValue6: '请选择',
        displayValue7: '请选择',
        displayValue8: '请选择',
        displayValue9: '请选择',
        lang: 'zh_CN',
	},
    onChange(e) {
        console.log(e)
        const { key, values } = e.detail
        const lang = values[key]

        this.setData({
            lang,
        })
    },
    formatDate(st, mode) {
        const o = {
            'datetime': 'yyyy-MM-dd hh:mm',
            'date': 'yyyy-MM-dd',
            'year': 'yyyy',
            'month': 'MM-dd',
            'time': 'hh:mm',
        }
        return formatDate(new Date(st), o[mode])
    },
    setValue(values, key, mode) {
        this.setData({
            [`value${key}`]: values.value,
            [`displayValue${key}`]: this.formatDate(values.date, mode),
            // [`displayValue${key}`]: values.displayValue.join(' '),
        })
    },
    onConfirm(e) {
        const { index, mode } = e.currentTarget.dataset
        this.setValue(e.detail, index, mode)
        console.log(`onConfirm${index}`, e.detail)
    },
    onVisibleChange(e) {
        this.setData({ visible: e.detail.visible })
    },
    onClick() {
        this.setData({ visible: true })
    },
})
