const defaultIcon = {
    type: 'success',
    size: 93,
    color: '#33cd5f',
}

const getIcon = (icon) => {
    if (icon !== null && typeof icon === 'object') {
        return Object.assign({}, defaultIcon, icon)
    } else if (typeof icon === 'string') {
        return Object.assign({}, defaultIcon, {
            type: icon,
        })
    }
    return defaultIcon
}

Component({
    externalClasses: ['wux-class'],
    properties: {
        icon: {
            type: null,
            value: defaultIcon,
            observer(newVal) {
                this.setData({
                    resultIcon: getIcon(newVal),
                })
            },
        },
        title: {
            type: String,
            value: '',
        },
        label: {
            type: String,
            value: '',
        },
        buttons: {
            type: Array,
            value: [],
        },
        extra: {
            type: String,
            value: '',
        },
        fixed: {
            type: Boolean,
            value: false,
        },
    },
    methods: {
        onClick(e) {
            this.triggerEvent('click', e.currentTarget.dataset)
        },
        bindgetuserinfo(e) {
            this.triggerEvent('getuserinfo', { ...e.detail, ...e.currentTarget.dataset })
        },
        bindcontact(e) {
            this.triggerEvent('contact', { ...e.detail, ...e.currentTarget.dataset })
        },
        bindgetphonenumber(e) {
            this.triggerEvent('getphonenumber', { ...e.detail, ...e.currentTarget.dataset })
        },
        bindopensetting(e) {
            this.triggerEvent('opensetting', { ...e.detail, ...e.currentTarget.dataset })
        },
        onError(e) {
            this.triggerEvent('error', { ...e.detail, ...e.currentTarget.dataset })
        },
    },
    data: {
        resultIcon: null,
    },
    attached() {
        this.setData({
            resultIcon: getIcon(this.data.icon),
        })
    },
})