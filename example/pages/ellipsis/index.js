import ad from '../index/ad'

const content = 'Wux Weapp 是一套组件化、可复用、易扩展的微信小程序 UI 组件库。UI 样式可配置，拓展灵活，轻松适应不同的设计风格；80+ 丰富的组件，能够满足移动端开发的基本需求。'

ad({
    data: {
        content,
    },
    onContentClick(e) {
        console.log('onContentClick', e)
    },
})
