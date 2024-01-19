export default function nextTick (cb) {
    if (typeof wx.nextTick === 'function') {
        return wx.nextTick(cb)
    } else if (typeof Promise !== 'undefined') {
        return Promise.resolve().then(cb)
    } else {
        setTimeout(() => cb(), 0)
    }
}
