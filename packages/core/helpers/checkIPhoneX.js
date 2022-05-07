// 获取系统信息
let systemInfo = null

// iPhoneX 竖屏安全区域
let safeAreaInset = {
    top: 88, // StatusBar & NavBar
    left: 0,
    right: 0,
    bottom: 34, // Home Indicator
}

const getSystemInfo = (isForce) => {
    if (!systemInfo || isForce) {
        try {
            systemInfo = wx.getSystemInfoSync()
        } catch(e) { /* Ignore */ }
        try {
            safeAreaInset.top = systemInfo.statusBarHeight + systemInfo.safeArea.top
            safeAreaInset.bottom = systemInfo.screenHeight - systemInfo.safeArea.bottom
        } catch(e) { /* Ignore */ }
    }
    return systemInfo
}

const isIPhoneX = ({ model, windowHeight, windowWidth }) => {
    return /iphone (x|12|13)/.test(model.toLowerCase()) || (windowHeight >= 812 && windowHeight / windowWidth > 2)
}

const checkIPhoneX = (isForce) => isIPhoneX(getSystemInfo(isForce))

checkIPhoneX()

export {
    safeAreaInset,
    getSystemInfo,
    checkIPhoneX,
}
