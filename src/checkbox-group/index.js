import baseComponent from '../helpers/baseComponent'

baseComponent({
    useField: true,
    relations: {
        '../checkbox/index': {
            type: 'child',
            observer() {
                this.debounce(this.changeValue)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-checkbox-group',
        },
        cellGroupPrefixCls: {
            type: String,
            value: 'wux-cell-group',
        },
        value: {
            type: Array,
            value: [],
            observer: 'changeValue',
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
    },
    methods: {
        changeValue(value = this.data.value) {
            const elements = this.getRelationNodes('../checkbox/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.changeValue(value.includes(element.data.value), index)
                })
            }
        },
        emitEvent(item) {
            this.triggerEvent('change', { ...item, name: this.data.name })
        },
    },
})
