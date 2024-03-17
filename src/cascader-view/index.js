import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import styleToCssString from '../helpers/libs/styleToCssString'
import arrayTreeFilter from '../helpers/libs/arrayTreeFilter'
import fieldNamesBehavior from '../helpers/mixins/fieldNamesBehavior'

const WUX_CASCADER_VIEW = 'wux-cascader-view'

baseComponent({
    behaviors: [fieldNamesBehavior],
    externalClasses: ['wux-scroll-view-class'],
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-cascader-view',
        },
        defaultValue: {
            type: Array,
            value: [],
        },
        value: {
            type: Array,
            value: [],
        },
        controlled: {
            type: Boolean,
            value: false,
        },
        options: {
            type: Array,
            value: [],
        },
        full: {
            type: Boolean,
            value: false,
        },
        placeholder: {
            type: String,
            value: '请选择',
        },
        height: {
            type: [String, Number],
            value: 'auto',
        },
        skipAnimation: {
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
        scrollViewStyle: '',
    },
    computed: {
        classes: ['prefixCls, full', function(prefixCls, full) {
            const wrap = classNames(prefixCls)
            const hd = `${prefixCls}__hd`
            const bd = `${prefixCls}__bd`
            const innerScroll = classNames(`${prefixCls}__inner-scroll`, {
                [`${prefixCls}__inner-scroll--full`]: full,
            })
            const scrollView = `${prefixCls}__scroll-view`
            const ft = `${prefixCls}__ft`

            return {
                wrap,
                hd,
                bd,
                innerScroll,
                scrollView,
                ft,
            }
        }],
    },
    observers: {
        value(newVal) {
            if (this.data.controlled) {
                this.setData({ activeValue: newVal })
                this.getCurrentOptions(newVal)
            }
        },
        options() {
            this.getCurrentOptions(this.data.activeValue)
        },
        height(newVal) {
            this.updateStyle(newVal)
        },
    },
    methods: {
        getActiveOptions(activeValue) {
            const { options } = this.data
            const value = this.getFieldName('value')
            const childrenKeyName = this.getFieldName('children')

            return arrayTreeFilter(options, (option, level) => option[value] === activeValue[level], { childrenKeyName })
        },
        getShowOptions(activeValue) {
            const { options } = this.data
            const children = this.getFieldName('children')
            const result = this.getActiveOptions(activeValue).map((activeOption) => activeOption[children]).filter((activeOption) => !!activeOption)

            return [options, ...result]
        },
        getMenus(activeValue = [], hasChildren) {
            const { placeholder } = this.data
            const activeOptions = this.getActiveOptions(activeValue)

            if (hasChildren) {
                const value = this.getFieldName('value')
                const label = this.getFieldName('label')

                activeOptions.push({
                    [value]: WUX_CASCADER_VIEW,
                    [label]: placeholder,
                })
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
            const value = this.getFieldName('value')
            const children = this.getFieldName('children')
            const hasChildren = currentOptions && currentOptions[children] && currentOptions[children].length > 0
            const activeValue = this.getNextActiveValue(currentOptions[value], optionIndex)
            const activeOptions = this.getMenus(activeValue, hasChildren)
            const activeIndex = activeOptions.length - 1
            const showOptions = this.getShowOptions(activeValue)
            const props = {
                activeValue,
                activeOptions,
                activeIndex,
                showOptions,
            }

            // 判断 hasChildren 计算需要更新的数据
            if (hasChildren || (activeValue.length === showOptions.length && (optionIndex = Math.max(0, optionIndex - 1)))) {
                props.bodyStyle = this.getTransform(optionIndex + 1)
                props.showOptions = showOptions
            }

            // 判断是否需要 setData 更新数据
            if (condition) {
                this.setCascaderView(props)
            }

            // 回调函数
            if (typeof callback === 'function') {
                callback.call(this, currentOptions, activeValue)
            }
        },
        /**
         * 更新级联数据
         * @param {Array} activeValue 当前选中值
         */
        getCurrentOptions(activeValue = this.data.activeValue) {
            const optionIndex = Math.max(0, activeValue.length - 1)
            const activeOptions = this.getActiveOptions(activeValue)
            const currentOptions = activeOptions[optionIndex]

            if (currentOptions) {
                this.updated(currentOptions, optionIndex, true)
            } else {
                const value = this.getFieldName('value')
                const label = this.getFieldName('label')

                activeOptions.push({
                    [value]: WUX_CASCADER_VIEW,
                    [label]: this.data.placeholder,
                })

                const showOptions = this.getShowOptions(activeValue)
                const activeIndex = activeOptions.length - 1
                const props = {
                    showOptions,
                    activeOptions,
                    activeIndex,
                    bodyStyle: '',
                }

                this.setCascaderView(props)
            }
        },
        setCascaderView(props) {
            const { activeOptions, ...restProps } = props
            this.setData({ activeOptions }, () => {
                if (this.data.activeIndex !== restProps.activeIndex) {
                    this.triggerEvent('tabsChange', { index: restProps.activeIndex })
                }
                this.setData(restProps)
            })
        },
        getTransform(index, animating = !this.data.skipAnimation) {
            const pt = this.data.full ? 2 : 1
            const i = this.data.full ? index : index - 1
            const bodyStyle = styleToCssString({
                transition: animating ? 'transform .3s' : 'none',
                transform: `translate(${-50 * pt * Math.max(0, i)}%)`,
            })
            return bodyStyle
        },
        /**
         * 点击菜单时的回调函数
         */
        onTabsChange(e) {
            const activeIndex = parseInt(e.detail.key)
            const bodyStyle = this.getTransform(activeIndex)

            if (
                this.data.bodyStyle !== bodyStyle ||
                this.data.activeIndex !== activeIndex
            ) {
                this.setData({
                    bodyStyle,
                    activeIndex,
                })

                this.triggerEvent('tabsChange', { index: activeIndex })
            }
        },
        /**
         * 点击选项时的回调函数
         */
        onItemSelect(e) {
            const { optionIndex } = e.currentTarget.dataset
            const { index } = e.detail
            const { showOptions } = this.data
            const item = showOptions[optionIndex][index]

            // updated
            this.updated(item, optionIndex, !this.data.controlled, this.onChange)
        },
        /**
         * 选择完成时的回调函数
         */
        onChange(currentOptions = {}, activeValue = []) {
            const childrenKeyName = this.getFieldName('children')
            const values = this.getValue(activeValue)

            // 判断是否异步加载
            if (currentOptions && currentOptions.isLeaf === false && !currentOptions[childrenKeyName]) {
                this.triggerEvent('change', { ...values })
                this.triggerEvent('load', { value: values.value, options: values.options })
                return
            }

            // 正常加载
            this.triggerEvent('change', { ...values })
        },
        getValue(activeValue = this.data.activeValue) {
            const optionIndex = Math.max(0, activeValue.length - 1)
            const activeOptions = this.getActiveOptions(activeValue)
            const currentOptions = activeOptions[optionIndex]
            const valueName = this.getFieldName('value')
            const childrenKeyName = this.getFieldName('children')
            const hasChildren = currentOptions && currentOptions[childrenKeyName] && currentOptions[childrenKeyName].length > 0
            const options = activeOptions.filter((n) => n[valueName] !== WUX_CASCADER_VIEW)
            const value = options.map((n) => n[valueName])

            if (currentOptions && currentOptions.isLeaf === false && !currentOptions[childrenKeyName]) {
                return {
                    value,
                    options,
                    done: false,
                }
            }

            return {
                value,
                options,
                done: !hasChildren,
            }
        },
        updateStyle(height) {
            const scrollViewStyle = styleToCssString({
                height,
                minHeight: height,
            })
            if (this.data.scrollViewStyle !== scrollViewStyle) {
                this.setData({
                    scrollViewStyle,
                })
            }
        },
    },
    attached() {
        const { defaultValue, value, controlled, height } = this.data
        const activeValue = controlled ? value : defaultValue

        this.setData({ activeValue })
        this.getCurrentOptions(activeValue)
        this.updateStyle(height)
    },
})
