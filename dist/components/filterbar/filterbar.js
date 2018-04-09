import Component from '../component'

export default {
    /**
     * 初始化筛选栏
     * @param {Object} opts 配置项
     * @param {Array} opts.items 按钮的配置数组
     * @param {Function} opts.onChange 选中值变化的回调函数
     * @param {Function} opts.onScroll scroll-view 滚动时触发的事件
     */
    init(opts = {}) {
        const options = Object.assign({}, opts)

        // 实例化组件
        const component = new Component({
            scope: `$wux.filterbar`,
            data: options,
            methods: {
                /**
                 * 隐藏
                 */
                hide() {
                    if (this.removed) return !1
                    this.removed = !0
                    this.setHidden()
                },
                /**
                 * 显示
                 */
                show() {
                    if (this.removed) return !1
                    this.setVisible()
                },
                /**
                 * 重置按钮
                 * @param {Object} e 事件对象
                 * @param {Object} prevState 上一个状态值
                 */
                onReset(e, prevState) {
                    const { index, item } = e.currentTarget.dataset
                    const children = prevState && prevState.children || item.children.map((n) => {
                        return Object.assign({}, n, {
                            children: n.children.map((m) => Object.assign({}, m, {
                                checked: false,
                            })),
                            selected: '',
                        })
                    })

                    this.setData({
                        [`$wux.filterbar.items[${index}].children`]: children,
                    })
                },
                /**
                 * 关闭侧边栏筛选框
                 * @param {Object} e 事件对象
                 * @param {Function} callback 回调函数
                 */
                onClose(e, callback) {
                    const { index } = e.currentTarget.dataset
                    this.setData({
                        [`$wux.filterbar.items[${index}].visible`]: false,
                    }, () => {
                        if (typeof callback === 'function') {
                            callback.call(this, e)
                        } else {
                            this.onReset(e, this.prevState)
                        }
                    })
                },
                /**
                 * 确认按钮
                 * @param {Object} e 事件对象
                 */
                onConfirm(e) {
                    this.onClose(e, this.onChange)
                },
                /**
                 * 筛选栏内单项选择触发 change 事件
                 * @param {Object} e 事件对象
                 */
                onRadioChange(e) {
                    const { value } = e.detail
                    const { index, item, parentIndex } = e.currentTarget.dataset
                    const children = item.children.map((n) => Object.assign({}, n, {
                        checked: n.value === value,
                    }))
                    const selected = children.filter((n) => n.checked).map((n) => n.label).join(',')
                    this.setData({
                        [`$wux.filterbar.items[${parentIndex}].children[${index}].children`]: children,
                        [`$wux.filterbar.items[${parentIndex}].children[${index}].selected`]: selected,
                    })
                },
                /**
                 * 筛选栏内多项选择触发 change 事件
                 * @param {Object} e 事件对象
                 */
                onCheckboxChange(e) {
                    const { value } = e.detail
                    const { index, item, parentIndex } = e.currentTarget.dataset
                    const children = item.children.map((n) => Object.assign({}, n, {
                        checked: value.includes(n.value),
                    }))
                    const selected = children.filter((n) => n.checked).map((n) => n.label).join(',')
                    this.setData({
                        [`$wux.filterbar.items[${parentIndex}].children[${index}].children`]: children,
                        [`$wux.filterbar.items[${parentIndex}].children[${index}].selected`]: selected,
                    })
                },
                /**
                 * 下拉框内单项选择触发 change 事件
                 * @param {Object} e 事件对象
                 */
                radioChange(e) {
                    const { value } = e.detail
                    const { index, item } = e.currentTarget.dataset
                    const children = item.children.map((n) => Object.assign({}, n, {
                        checked: n.value === value,
                    }))
                    this.setData({
                        [`$wux.filterbar.items[${index}].children`]: children,
                    }, this.onChange)
                },
                /**
                 * 下拉框内多项选择触发 change 事件
                 * @param {Object} e 事件对象
                 */
                checkboxChange(e) {
                    const { value } = e.detail
                    const { index, item } = e.currentTarget.dataset
                    const children = item.children.map((n) => Object.assign({}, n, {
                        checked: value.includes(n.value),
                    }))
                    this.setData({
                        [`$wux.filterbar.items[${index}].children`]: children,
                    }, this.onChange)
                },
                /**
                 * 点击事件
                 * @param {Object} e 事件对象
                 */
                onClick(e) {
                    const { index } = e.currentTarget.dataset
                    this.onOpenSelect(this.page.data.$wux.filterbar.items, index)
                },
                /**
                 * 打开下拉框
                 * @param {Array} data 菜单数据
                 * @param {Number} index 当前索引
                 */
                onOpenSelect(data = [], index = 0) {
                    const current = data[index]
                    const items = data.map((n, i) => {
                        const params = Object.assign({}, n, {
                            checked: index === i ? !n.checked : false,
                        })

                        // 判断已选择的元素是否同组
                        if (n.checked) {
                            const has = this.getDifference(n.groups, current.groups)

                            params.checked = !!has.length

                            // 判断非同组的元素清空选择内容
                            if (index !== i && !has.length) {
                                if (typeof params.children === 'object') {
                                    if (['radio', 'checkbox'].includes(n.type)) {
                                        params.children = params.children.map((n) => Object.assign({}, n, {
                                            checked: false,
                                        }))
                                    }

                                    if (['filter'].includes(n.type)) {
                                        params.children = params.children.map((n) => {
                                            return Object.assign({}, n, {
                                                children: n.children.map((m) => Object.assign({}, m, {
                                                    checked: false,
                                                })),
                                                selected: '',
                                            })
                                        })
                                    }
                                }

                                if (['sort'].includes(n.type)) {
                                    params.sort = undefined
                                }
                            }
                        }

                        // 展开或隐藏下拉框
                        if (['radio', 'checkbox', 'filter'].includes(n.type)) {
                            params.visible = index === i ? !n.visible : false
                        }

                        // 当前点击排序做出处理
                        if (index === i && ['sort'].includes(n.type)) {
                            params.sort = typeof params.sort === 'number' ? -params.sort : 1
                        }

                        return params
                    })

                    this.setData({
                        [`$wux.filterbar.items`]: items,
                    }, () => {
                        this.prevState = current
                        if (!['radio', 'checkbox', 'filter'].includes(current.type)) {
                            this.onChange()
                        }
                    })
                },
                /** 
                 * 关闭下拉框
                 */
                onCloseSelect() {
                    const items = this.page.data.$wux.filterbar.items
                    const params = {}

                    items.forEach((n, i) => {
                        if (n.checked && n.visible) {
                            params[`$wux.filterbar.items[${i}].visible`] = false
                        }
                    })

                    this.setData(params)
                },
                /**
                 * 获取两个数组相同的元素
                 * @param {Array} data 数组
                 * @param {Array} values 数组
                 */
                getDifference(data = [], values = []) {
                    return data.filter(v => values.includes(v))
                },
                /**
                 * 重置元素
                 * @param {Object} item 数据对象
                 */
                resetValue(item = {}) {
                    items.children.map((n) => Object.assign({}, n, {
                        checked: false,
                    }))
                },
                /**
                 * 元素发生变化时的事件
                 */
                onChange() {
                    const items = this.page.data.$wux.filterbar.items
                    const checkedItems = items.filter((n) => n.checked)
                    if (typeof options.onChange === 'function') {
                        options.onChange.call(this, checkedItems, items)
                    }
                },
                /**
                 * scroll-view 滚动时触发的事件
                 * @param {Object} e 事件对象
                 */
                onScroll(e) {
                    if (typeof options.onScroll === 'function') {
                        options.onScroll.call(this, e)
                    }
                },
            },
        })

        component.show()

        return component
    },
}