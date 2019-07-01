import computedBehavior from './computedBehavior'
import relationsBehavior from './relationsBehavior'
import safeAreaBehavior from './safeAreaBehavior'
import safeSetDataBehavior from './safeSetDataBehavior'
import funcBehavior from './funcBehavior'
import compareVersion from './compareVersion'

const { platform, SDKVersion } = wx.getSystemInfoSync()
const libVersion = '2.6.6'

// check SDKVersion
if (platform === 'devtools' && compareVersion(SDKVersion, libVersion) < 0) {
    if (wx && wx.showModal) {
        wx.showModal({
            title: '提示',
            content: `当前基础库版本（${SDKVersion}）过低，无法使用 Wux Weapp 组件库，请更新基础库版本 >=${libVersion} 后重试。`,
        })
    }
}

const baseComponent = (options = {}) => {
    // add default externalClasses
    options.externalClasses = [
        'wux-class',
        'wux-hover-class',
        ...(options.externalClasses = options.externalClasses || []),
    ]

    // add default behaviors
    options.behaviors = [
        relationsBehavior,
        safeSetDataBehavior,
        ...(options.behaviors = options.behaviors || []),
        computedBehavior, // make sure it's triggered
    ]

    // use safeArea
    if (options.useSafeArea) {
        options.behaviors = [...options.behaviors, safeAreaBehavior]
        delete options.useSafeArea
    }

    // use func
    if (options.useFunc) {
        options.behaviors = [...options.behaviors, funcBehavior]
        delete options.useFunc
    }

    // use field
    if (options.useField) {
        options.behaviors = [...options.behaviors, 'wx://form-field']
        delete options.useField
    }

    // use export
    if (options.useExport) {
        options.behaviors = [...options.behaviors, 'wx://component-export']
        options.methods = {
            export () {
                return this
            },
            ...options.methods,
        }
        delete options.useExport
    }

    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true,
        ...options.options,
    }

    return Component(options)
}

export default baseComponent
