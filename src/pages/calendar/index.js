import { $wuxCalendar } from '../../components/wux'

Page({
    data: {
        birthday: '', 
        start: '', 
        end: '', 
    },
	onLoad() {},
    openCalendar() {
        if (this.birthday) {
            return this.birthday.show()
        }

        this.birthday = $wuxCalendar.init('birthday', {
            value: ['2017-04-15'], 
            onChange(p, v, d) {
                console.log(p, v, d)
                this.setData({
                    birthday: d.join(', ')
                })
            }
        })
    },
    openCalendar2() {
        if (this.start) {
            return this.start.show()
        }

        this.start = $wuxCalendar.init('start', {
            dateFormat: 'DD, MM dd, yyyy', 
            onChange(p, v, d) {
                console.log(p, v, d)
                this.setData({
                    start: d.join(', ')
                })
            }
        })
    },
    openCalendar3() {
        if (this.end) {
            return this.end.show()
        }
        
        this.end = $wuxCalendar.init('end', {
            multiple: true, 
            closeOnSelect: false, 
            onChange(p, v, d) {
                console.log(p, v, d)
                this.setData({
                    end: d.join(', ')
                })
            }
        })
    }
})