import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/classNames'

baseComponent({
    relations: {
        '../swipe-action/index': {
            type: 'descendant',
            observer() {
                this.debounce(this.updated)
            },
        },
    },
    methods: {
        updated() {
            const elements = this.getRelationNodes('../swipe-action/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.updated(index)
                })
            }
        },
        onCloseSwipe(current) {
            const elements = this.getRelationNodes('../swipe-action/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    if (current !== index) {
                        element.onClose()
                    }
                })
            }
        },
    },
})
