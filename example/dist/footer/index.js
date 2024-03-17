import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import { useNativeRoute } from '../helpers/hooks/useNativeRoute'

baseComponent({
    properties: {
        prefixCls: {
            type: String,
            value: 'wux-footer',
        },
        theme: {
            type: String,
            value: 'balanced',
        },
        label: {
            type: String,
            value: '',
        },
        content: {
            type: String,
            value: '',
        },
        links: {
            type: Array,
            value: [],
        },
        chips: {
            type: Array,
            value: [],
        },
    },
    computed: {
        classes: ['prefixCls, theme', function(prefixCls, theme) {
            const wrap = classNames(prefixCls, {
                [`${prefixCls}--${theme}`]: theme,
            })
            const label = `${prefixCls}__label`
            const content = `${prefixCls}__content`
            const links = `${prefixCls}__links`
            const link = `${prefixCls}__link`
            const chips = `${prefixCls}__chips`
            const chip = `${prefixCls}__chip`

            return {
                wrap,
                label,
                content,
                links,
                link,
                chips,
                chip,
            }
        }],
    },
    methods: {
        clickLinkItem(e) {
            const { index } = e.target.dataset
            const link = this.data.links[index]

            if (link) {
                if (link.url !== undefined) {
                    useNativeRoute({
                        url: link.url,
                        openType: link.openType,
                        delta: link.delta,
                    }, this)
                }

                this.triggerEvent('linkClick', {
                    item: link,
                    index,
                })
            }
        },
        clickChipItem(e) {
            const { index } = e.target.dataset
            const chip = this.data.chips[index]
            
            if (chip && chip.type === 'link') {
                this.triggerEvent('chipClick', {
                    item: chip,
                    index,
                })
            }
        },
    },
})
