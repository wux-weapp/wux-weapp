export const defaults = {
    prefixCls: 'wux-dialog',
    title: '',
    content: '',
    buttons: [],
    verticalButtons: !1,
    resetOnClose: false,
    closable: false,
    mask: true,
    maskClosable: true,
    zIndex: 1000,
}

export const defaultOptions = {
    onCancel() {},
    cancelText: '取消',
    cancelType: 'default',
    onConfirm() {},
    confirmText: '确定',
    confirmType: 'primary',
}
