export const props = {
    prefixCls: {
        type: String,
        value: 'wux-tabs',
    },
    defaultCurrent: {
        type: String,
        value: '',
    },
    current: {
        type: String,
        value: '',
    },
    scroll: {
        type: Boolean,
        value: false,
    },
    controlled: {
        type: Boolean,
        value: false,
    },
    theme: {
        type: String,
        value: 'balanced',
    },
    direction: {
        type: String,
        value: 'horizontal',
    },
    justify: {
        type: String,
        value: 'space-around',
    },
    activeLineMode: {
        type: String,
        value: 'auto',
    },
}
