export const defaults = {
    prefixCls: 'wux-toast',
    classNames: 'wux-animate--fadeIn',
    type: 'default',
    duration: 1500,
    color: '#fff',
    text: '',
    icon: '',
    mask: true,
    transparent: true,
    success() {},
}

export const iconTypes = {
    success: 'ios-checkmark-circle-outline',
    cancel: 'ios-close-circle-outline',
    forbidden: 'ios-alert',
    text: '',
    'default': '',
}
