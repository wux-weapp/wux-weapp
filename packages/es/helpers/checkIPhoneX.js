/**
 * 获取系统信息
 */

let systemInfo = null

export const getSystemInfo = (isForce) => {
	if (!systemInfo || isForce) {
		try {
			systemInfo = wx.getSystemInfoSync()
		} catch(e) { /* Ignore */ }
	}

	return systemInfo
}

// iPhoneX 竖屏安全区域
export const safeAreaInset = {
	top: 88, // StatusBar & NavBar
	left: 0,
	right: 0,
	bottom: 34, // Home Indicator
}

const isIPhoneX = ({ model, platform }) => {
	return /iPhone X/.test(model) && platform === 'ios'
}

export const checkIPhoneX = (isForce) => isIPhoneX(getSystemInfo(isForce))
