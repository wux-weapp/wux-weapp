import arrayTreeFilter from '../helpers/arrayTreeFilter'

const WUX_CASCADER = 'wux-cascader'

Component({
    externalClasses: ['wux-class', 'wux-scroll-view-class'],
    properties: {
        defaultValue: {
            type: Array,
            value: [],
        },
        value: {
            type: Array,
            value: [],
            observer(newVal) {
                if (this.data.controlled) {
                    this.setData({ activeValue: newVal }, () => this.getCurrentOptions(newVal))
                }
            },
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        title: {
            type: String,
            value: '',
        },
        options: {
            type: Array,
            value: [],
        },
        chooseTitle: {
            type: String,
            value: '请选择',
        },
        visible: {
            type: Boolean,
            value: false,
        },
    },
    data: {
        activeOptions: [],
        activeIndex: 0,
        bodyStyle: '',
        activeValue: [],
        showOptions: [],
    },
    methods: {
        getActiveOptions(activeValue) {
            const { options } = this.data

            return arrayTreeFilter(options, (option, level) => option.value === activeValue[level])
        },
        getShowOptions(activeValue) {
            const { options } = this.data
            const result = this.getActiveOptions(activeValue).map((activeOption) => activeOption.children).filter((activeOption) => !!activeOption)

            return [options, ...result]
        },
        getMenus(activeValue = [], hasChildren) {
            const { options, chooseTitle } = this.data
            const activeOptions = this.getActiveOptions(activeValue)

            if (hasChildren && activeOptions.length < options.length) {
                activeOptions.push({ value: WUX_CASCADER, label: chooseTitle })
            }

            return activeOptions
        },
        getNextActiveValue(value, optionIndex) {
            let { activeValue } = this.data

            activeValue = activeValue.slice(0, optionIndex + 1)
            activeValue[optionIndex] = value

            return activeValue
        },
        updated(currentOptions, optionIndex, condition, callback) {
            const hasChildren = currentOptions.children && currentOptions.children.length > 0
            const activeValue = this.getNextActiveValue(currentOptions.value, optionIndex)
            const activeOptions = this.getMenus(activeValue, hasChildren)
            const activeIndex = activeOptions.length - 1
            const showOptions = this.getShowOptions(activeValue)
            const params = {
                activeValue,
                activeOptions,
                activeIndex,
                showOptions: this.getShowOptions(activeValue),
            }

            // 判断 hasChildren 计算需要更新的数据
            if (hasChildren || (activeValue.length === showOptions.length && (optionIndex = Math.max(0, optionIndex - 1)))) {
                params.bodyStyle = `transform: translate(${-50 * optionIndex}%)`
                params.showOptions = showOptions
            }

            // 判断是否需要 setData 更新数据
            if (condition) {
                this.setData(params)
            }

            // 回调函数
            if (typeof callback === 'function') {
                callback.call(this, currentOptions, activeOptions, !hasChildren)
            }
        },
        getCurrentOptions(activeValue) {
            const optionIndex = Math.max(0, activeValue.length - 1)
            const activeOptions = this.getActiveOptions(activeValue)
            const currentOptions = activeOptions[optionIndex]

            if (currentOptions) {
                this.updated(currentOptions, optionIndex, true)
            } else {
                activeOptions.push({ value: WUX_CASCADER, label: this.data.chooseTitle })

                const showOptions = this.getShowOptions(activeValue)
                const activeIndex = activeOptions.length - 1
                const params = {
                    showOptions,
                    activeOptions,
                    activeIndex,
                    bodyStyle: '',
                }

                this.setData(params)
            }
        },
        /**
         * 点击菜单时的回调函数
         */
        onMenuClick(e) {
            const { menuIndex } = e.currentTarget.dataset
            const index = menuIndex > 1 ? menuIndex - 1 : 0
            const bodyStyle = `transform: translate(${-50 * index}%)`

            this.setData({
                bodyStyle,
                activeIndex: menuIndex,
            })
        },
        /**
         * 点击选项时的回调函数
         */
        onItemSelect(e) {
            const { item, optionIndex } = e.currentTarget.dataset

            // 判断是否禁用
            if (!item || item.disabled) {
                return false
            }

            // updated
            this.updated(item, optionIndex, !this.data.controlled, this.onChange)
        },
        /**
         * 组件关闭时的回调函数
         */
        onPopupClose() {
            this.triggerEvent('close')
        },
        /**
         * 选择完成时的回调函数
         */
        onChange(currentOptions = {}, activeOptions = [], done = false) {
            const options = activeOptions.filter((n) => n.value !== WUX_CASCADER)
            const value = options.map((n) => n.value)

            // 判断是否异步加载
            if (currentOptions.isLeaf === false && !currentOptions.children) {
                this.emitEvent({ value, options, done: false })
                this.triggerEvent('load', { value, options })
                return true
            }

            // 正常加载
            return this.emitEvent({ value, options, done })
        },
        emitEvent(params = {}) {
            this.triggerEvent('change', params)

            // 当选择完成时关闭组件
            if (params.done) {
                this.onPopupClose()
            }
        },
    },
    attached() {
        const { defaultValue, value, controlled } = this.data
        const activeValue = controlled ? value : defaultValue

        this.setData({ activeValue }, () => this.getCurrentOptions(activeValue))
    },
})