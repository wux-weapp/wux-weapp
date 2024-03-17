import baseComponent from '../helpers/baseComponent'
import styleToCssString from '../helpers/libs/styleToCssString'

baseComponent({
    relations: {
        '../virtual-list/index': {
            type: 'ancestor',
        },
    },
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-virtual-item',
        },
    },
    data: {
        index: 0,
        wrapStyle: '',
    },
    methods: {
        updated(index, height) {
            this.setData({
                index,
                wrapStyle: styleToCssString({
                    position: 'absolute',
                    left: 0,
                    top: index * height,
                    width: '100%',
                    height,
                }),
            })
        },
    },
})
