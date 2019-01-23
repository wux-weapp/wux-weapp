import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../step/index': {
            type: 'child',
            observer() {
                this.debounce(this.updateCurrent)
            },
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-steps',
        },
        current: {
            type: Number,
            value: 0,
            observer: 'updateCurrent',
        },
        // status: {
        //     type: String,
        //     value: '',
        // },
        direction: {
            type: String,
            value: 'horizontal',
        },
    },
    methods: {
        updateCurrent() {
            const elements = this.getRelationNodes('../step/index')
            const { current, direction } = this.data

            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.updateCurrent({
                        length: elements.length,
                        index,
                        current,
                        direction,
                    })
                })
            }
        }
    }
})
