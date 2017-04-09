import Component from '../component'

export default {
    /**
     * 默认参数
     */
    setDefaults() {
        return {
            maps: [], 
            max: 8, 
            maxRowIndex: undefined, 
            maxColumnIndex: undefined, 
            onSelect(items) {}, 
        }
    },
    /**
     * 座位图
     * @param {String} id   唯一标识
     * @param {Object} opts 配置项
     * @param {Array} opts.maps 座位图
     * @param {Number} opts.max 勾选最大值
     * @param {Number} opts.maxRowIndex 最大行数
     * @param {Number} opts.maxColumnIndex 最大列数
     * @param {Function} opts.onSelect 监听选中时的回调函数
     */
    init(id, opts = {}) {
        const options = Object.assign({
            animateCss: undefined, 
            visible: !1, 
        }, this.setDefaults(), opts)

        // 实例化组件
        const component = new Component({
            scope: `$wux.seats.${id}`, 
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
                 * 处理数据
                 */
                getData() {
                    const maps = options.maps
                    const maxColumnIndex = options.maxColumnIndex
                    const maxRowIndex = options.maxRowIndex
                    const obj = {
                        seats: [], 
                        maps: [], 
                    }

                    for(let i = 0; i < maxRowIndex; i++) {
                        obj.seats[i] = []
                        maps.forEach((v, k) => {
                            if (i + 1 === v.rowIndex) {
                                obj.seats[i].push(v)
                            }
                        })
                    }

                    obj.seats.forEach((v, k) => {
                        obj.maps[k] = []
                        for(let i = 0; i < maxColumnIndex; i++) {
                            for(let j = 0; j < v.length; j++) {
                                if (i + 1 === v[j].columnIndex) {
                                    obj.maps[k].push(Object.assign({
                                        space: !1
                                    }, v[j]))
                                    break
                                }
                            }
                            if (!obj.maps[k][i]) {
                                obj.maps[k].push(Object.assign({
                                    space: !0
                                }))
                            }
                        }
                    })

                    return obj
                },
                /**
                 * 渲染组件
                 */
                render() {
                    this.setData({
                        [`$wux.seats.${id}.seats`]: this.getData().maps
                    })
                },
                /**
                 * 监听勾选事件
                 */
                bindchange(e) {
                    const values = e.detail.value
                    const seats = this.getComponentData().seats
                    const params = {
                        items: [], 
                    }

                    if (values.length > options.max) {
                        values.splice(options.max)
                    }

                    seats.forEach((value, key) => {
                        value.forEach((v, k) => {
                            v.checked = !1
                            for(let i = 0; i < values.length; i++) {
                                if(v.id == values[i]) {
                                    v.checked = !0
                                    params.items.push(v)
                                    break
                                }
                            }
                        })  
                    })

                    this.setData({
                        [`$wux.seats.${id}.seats`]: seats
                    })

                    if (typeof options.onSelect === `function`) {
                        options.onSelect.call(this, params.items)
                    }
                },
                /**
                 * 禁用
                 */
                disabled(values) {
                    const seats = this.getComponentData().seats
                    const len = values.length

                    seats.forEach((value, key) => {
                        value.forEach((v, k) => {
                            for(let i = 0; i < len; i++) {
                                if(v.id == values[i]) {
                                    v.disabled = !0
                                    break
                                }
                            }
                        })   
                    })

                    this.setData({
                        [`$wux.seats.${id}.seats`]: seats
                    })
                },
            },
        })

        component.show()
        component.render()

        return component
    },
}