import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

const defaultAction = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII='

// 设置元素旋转属性
const setTransform = (translate = 0, scale = 1, delay = 300, isH = true) => {
    const duration = `transition-duration: ${delay}ms`
    const transform = `transform: scale(${scale}) translate3d(${isH ? translate : 0}px, ${isH ? 0 : translate}px, 0)`

    return `opacity: 1; ${duration}; ${transform}`
}

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-fab-button',
        },
        hoverClass: {
            type: String,
            value: 'default',
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        position: {
            type: String,
            value: 'bottomRight',
        },
        action: {
            type: String,
            value: defaultAction,
        },
        actionRotate: {
            type: Boolean,
            value: true,
        },
        hideShadow: {
            type: Boolean,
            value: false,
        },
        backdrop: {
            type: Boolean,
            value: false,
        },
        buttons: {
            type: Array,
            value: [],
            observer: 'forceUpdateButtonStyle',
        },
        direction: {
            type: String,
            value: 'horizontal',
            observer: 'forceUpdateButtonStyle',
        },
        spaceBetween: {
            type: Number,
            value: 10,
            observer: 'forceUpdateButtonStyle',
        },
        duration: {
            type: Number,
            value: 300,
        },
        scale: {
            type: Number,
            value: .9,
            observer: 'forceUpdateButtonStyle',
        },
        reverse: {
            type: Boolean,
            value: false,
            observer: 'forceUpdateButtonStyle',
        },
        sAngle: {
            type: Number,
            value: 0,
            observer: 'forceUpdateButtonStyle',
        },
        eAngle: {
            type: Number,
            value: 360,
            observer: 'forceUpdateButtonStyle',
        },
        defaultVisible: {
            type: Boolean,
            value: false,
        },
        visible: {
            type: Boolean,
            value: false,
            observer(newVal) {
                if (this.data.controlled) {
                    this.updated(newVal)
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        buttonStyle: [],
        buttonVisible: false,
    },
    computed: {
        classes: ['prefixCls, position, theme, direction, reverse, buttonVisible, hideShadow, actionRotate, buttons, hoverClass', function(prefixCls, position, theme, direction, reverse, buttonVisible, hideShadow, actionRotate, buttons, hoverClass) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${position}`]: position,
                [`${prefixCls}--${theme}`]: theme,
                [`${prefixCls}--${direction}`]: direction,
                [`${prefixCls}--reverse`]: reverse,
                [`${prefixCls}--opened`]: buttonVisible,
            })
            const action = classNames(`${prefixCls}__action`, {
                [`${prefixCls}__action--hide-shadow`]: hideShadow,
            })
            const text = classNames(`${prefixCls}__text`, {
                [`${prefixCls}__text--rotate`]: buttonVisible && actionRotate,
            })
            const button = buttons.map((button) => {
                const wrap = classNames(`${prefixCls}__button`, {
                    [`${prefixCls}__button--hide-shadow`]: button.hideShadow,
                    [`${prefixCls}__button--disabled`]: button.disabled,
                    [`${button.className}`]: button.className,
                })
                const hover = button.hoverClass && button.hoverClass !== 'default' ? button.hoverClass : `${prefixCls}__button--hover`

                return {
                    wrap,
                    hover,
                }
            })
            const icon = `${prefixCls}__icon`
            const label = `${prefixCls}__label`
            const backdrop = `${prefixCls}__backdrop`
            const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

            return {
                wrap,
                action,
                text,
                button,
                icon,
                label,
                backdrop,
                hover,
            }
        }],
    },
    methods: {
        updated(buttonVisible) {
            if (this.data.buttonVisible !== buttonVisible) {
                this.setData({
                    buttonVisible,
                })

                this.updateButtonStyle(!buttonVisible)
            }
        },
        onChange(buttonVisible) {
            if (!this.data.controlled) {
                this.updated(buttonVisible)
            }

            this.triggerEvent('change', { value: buttonVisible })
        },
        onToggle() {
            this.onChange(!this.data.buttonVisible)
        },
        onTap(e) {
            const { index, value } = e.currentTarget.dataset
            const params = {
                index,
                value,
                buttons: this.data.buttons,
            }

            if (!value.disabled) {
                this.triggerEvent('click', params)
                this.onChange(false)
            }
        },
        /**
         * 获取界面上的节点信息
         */
        getRect(selector, all) {
            return new Promise((resolve) => {
                wx
                    .createSelectorQuery()
                    .in(this)[all ? 'selectAll' : 'select'](selector)
                    .boundingClientRect((rect) => {
                        if (all && Array.isArray(rect) && rect.length) {
                            resolve(rect)
                        }

                        if (!all && rect) {
                            resolve(rect)
                        }
                    })
                    .exec()
            })
        },
        forceUpdateButtonStyle() {
            this.updateButtonStyle(!this.data.buttonVisible)
        },
        /**
         * 更新按钮组样式
         */
        updateButtonStyle(isReset) {
            const { prefixCls, buttons, duration, direction, spaceBetween, scale } = this.data
            const buttonStyle = []
            const sign = this.data.reverse ? 1 : -1
            const isH = direction === 'horizontal'

            // 重置样式
            if (isReset) {
                buttons.forEach(() => {
                    buttonStyle.push('opacity: 0; transform: translate3d(0, 0, 0)')
                })

                if (this.data.buttonStyle !== buttonStyle) {
                    this.setData({ buttonStyle })
                }

                return
            }

            // 更新样式
            this.getRect(`.${prefixCls}__action`).then((rect) => {
                switch (direction) {
                    case 'horizontal':
                    case 'vertical':
                        buttons.forEach((_, index) => {
                            const offset = `${sign * (rect.width + spaceBetween) * (index + 1)}`
                            const style = setTransform(offset, scale, duration, isH)

                            buttonStyle.push(style)
                        })
                        break
                    case 'circle':
                        const radius = rect.width + spaceBetween
                        buttons.forEach((_, index) => {
                            buttonStyle.push(this.getCircleStyle(index, radius))
                        })
                        break
                }

                if (this.data.buttonStyle !== buttonStyle) {
                    this.setData({ buttonStyle })
                }
            })
        },
        /**
         * 获取圆形按钮的样式
         * @param {Number} index 当前按钮索引
         * @param {Number} radius 圆的半径
         */
        getCircleStyle(index, radius) {
            const { sAngle, eAngle, duration, scale } = this.data
            const { length } = this.data.buttons
            const { max, sin, cos, PI } = Math
            const startAngle = sAngle * PI / 180
            const endAngle = eAngle * PI / 180
            const points = endAngle % (2 * PI) === 0 ? length : max(1, length - 1)
            const currentAngle = startAngle + (endAngle - startAngle) / points * index

            let x = sin(currentAngle) * radius
            let y = cos(currentAngle) * radius

            x = parseFloat(x.toFixed(6))
            y = parseFloat(y.toFixed(6))

            const transform = `transform: scale(${scale}) translate3d(${x}px, ${y}px, 0)`

            return `opacity: 1; transition-duration: ${duration}ms; ${transform}`
        },
        bindgetuserinfo(e) {
            this.triggerEvent('getuserinfo', {...e.detail, ...e.currentTarget.dataset })
        },
        bindcontact(e) {
            this.triggerEvent('contact', {...e.detail, ...e.currentTarget.dataset })
        },
        bindgetphonenumber(e) {
            this.triggerEvent('getphonenumber', {...e.detail, ...e.currentTarget.dataset })
        },
        bindopensetting(e) {
            this.triggerEvent('opensetting', {...e.detail, ...e.currentTarget.dataset })
        },
        onError(e) {
            this.triggerEvent('error', {...e.detail, ...e.currentTarget.dataset })
        },
    },
    ready() {
        const { defaultVisible, visible, controlled } = this.data
        const buttonVisible = controlled ? visible : defaultVisible

        this.updated(buttonVisible)
    },
})
