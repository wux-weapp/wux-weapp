import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'

baseComponent({
    relations: {
        '../swipe-action/index': {
            type: 'descendant',
            observer() {
                this.callDebounceFn(this.updated)
            },
        },
    },
    methods: {
        updated() {
            const elements = this.getRelationsByName('../swipe-action/index')
            if (elements.length > 0) {
                elements.forEach((element, index) => {
                    element.updated(index)
                })
            }
        },
        onCloseSwipe(current) {
            const elements = this.getRelationsByName('../swipe-action/index')
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
