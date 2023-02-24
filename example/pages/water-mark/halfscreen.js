import ad from '../index/ad'

const textProps = {
    content: 'WuxUI',
    image: '',
    width: 120,
    height: 64,
}
  
const rowsTextProps = {
    content: ['WuxUI', 'WuxWeapp'],
    image: '',
    width: 120,
    height: 64,
}

const imageProps = {
    content: '',
    image: '/assets/images/logo.png',
    imageWidth: 115,
    imageHeight: 36,
    width: 140,
    height: 80,
}

ad({
    data: {
        ...textProps,
    },
    setProps1() {
        this.setData(textProps)
    },
    setProps2() {
        this.setData(rowsTextProps)
    },
    setProps3() {
        this.setData(imageProps)
    },
})
