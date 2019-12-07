import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'
import { parse, diff, format } from './core/index'
import locales from './locales/index'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-timeago',
        },
        to: {
            type: null,
            value: null,
            observer(newVal) {
                const { from, lang } = this.data
                this.updated(newVal, from, lang)
            },
        },
        from: {
            type: null,
            value: null,
            observer(newVal) {
                const { to, lang } = this.data
                this.updated(to, newVal, lang)
            },
        },
        refreshable: {
            type: Boolean,
            value: false,
            observer(newVal) {
                const { to, from, lang } = this.data
                this.updated(to, from, lang, true)
            },
        },
        lang: {
            type: String,
            value: 'zh_CN',
            observer(newVal) {
                const { to, from } = this.data
                this.updated(to, from, newVal, true)
            },
        },
    },
    data: {
        currentTo: null,
        currentFrom: null,
        timeago: null,
    },
    methods: {
        /**
         * 更新时间
         * @param {Any} currentTo   当前开始时间
         * @param {Any} currentFrom 当前截止时间
         * @param {String} lang     返回文本的语言，可选值为 en、zh_CN、zh_TW
         * @param {Boolean} isForce 是否强制更新
         */
        updated(currentTo, currentFrom, lang, isForce) {
            // clearTimeout
            this.clearTimer()

            // check datetime
            if (currentTo !== this.data.currentTo || currentFrom !== this.data.currentFrom || isForce) {
                const diffTime = diff(currentTo, currentFrom)
                const timeago = format(diffTime, locales[lang])
                this.setData({ currentTo, currentFrom, timeago }, () => {
                    // check refreshable
                    if (this.data.refreshable && !this.data.from) {
                        const howOld = diff(currentTo, currentFrom, 'minute')
                        const secondsUntilUpdate = howOld < 1 && 1 || howOld < 60 && 30 || howOld < 180 && 300 || 3600
                        // setTimeout
                        this.timeout = setTimeout(() => {
                            this.updated(currentTo, this.getNow(), lang)
                        }, secondsUntilUpdate * 1000)
                    }
                })
            }
        },
        /**
         * 清除定时器
         */
        clearTimer() {
            if (this.timeout) {
                clearTimeout(this.timeout)
                this.timeout = null
            }
        },
        /**
         * 获取当前截止时间
         */
        getNow() {
            const { from } = this.data
            return from ? from && parse(from) : new Date()
        },
    },
    detached() {
        this.clearTimer()
    },
})
