import { getSystemInfoSync, getMenuButtonBoundingClientRectSync } from './useNativeAPI'

export function getSafeAreaInset(safeAreaStyle = 'default') {
    // StatusBar & NavBar
    const isDefault = ['default', 'navBar'].includes(safeAreaStyle)

    // iPhoneX 竖屏安全区域
    const safeAreaInset = {
        top: isDefault ? 88 : 44, // StatusBar & NavBar
        left: 0,
        right: 0,
        bottom: 34, // Home Indicator
    }

    try {
        const menuRect = getMenuButtonBoundingClientRectSync()
        const windowInfo = getSystemInfoSync(['window', 'device'])
        const { safeArea, screenHeight, windowHeight } = windowInfo
        const isIOS = !!(windowInfo.system.toLowerCase().search('ios') + 1)

        // 状态栏高度
        const statusBarHeight = !windowInfo.statusBarHeight
            ? screenHeight - windowHeight - 20
            : windowInfo.statusBarHeight

        // 胶囊高度
        const navBarHeight = (menuRect.top - statusBarHeight) * 2 + menuRect.height

        // 下方扩展 4 像素高度, 防止下方边距太小
        const navBarExtendHeight = windowInfo.statusBarHeight && isIOS ? 4 : 0
        
        safeAreaInset.top = isDefault
            ? statusBarHeight + navBarHeight + navBarExtendHeight
            : Math.max(statusBarHeight, safeAreaInset.top)

        safeAreaInset.bottom = screenHeight - safeArea.bottom
    } catch (e) {
        /** Ignore */
    }
    return safeAreaInset
}

export const checkIPhoneX = ({ model, windowHeight, windowWidth }) => {
    return /iphone (x|12|13|14)/.test(model.toLowerCase()) || (windowHeight >= 812 && windowHeight / windowWidth > 2)
}
