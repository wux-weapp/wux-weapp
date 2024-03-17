import { defaultIcon } from '../prompt/props'

export const POPUP_SELECTOR = '#wux-select'

export const getDefaultProps = () => ({
    value: {
        type: [String, Array],
        value: '',
    },
    options: {
        type: Array,
        value: [],
    },
    iconPosition: {
        type: String,
        value: '',
    },
    multiple: {
        type: Boolean,
        value: false,
    },
    max: {
        type: Number,
        value: -1,
    },
})

export const notFoundContent = {
    icon: defaultIcon,
    title: '',
    text: '暂无数据',
}

export const getNotFoundContent = (newVal) => {
    if (newVal !== null && typeof newVal === 'object') {
        return Object.assign({}, notFoundContent, newVal)
    } else if (typeof newVal === 'string') {
        return Object.assign({}, notFoundContent, {
            text: newVal,
        })
    } else if (newVal === null || newVal === false) {
        return null
    }
    return notFoundContent
}

export function convertValue(value) {
    return Array.isArray(value) ? [...value] : typeof value === 'string' ? [value] : []
}

export function getSelectIndex(options = [], value = '', multiple = false) {
    const newValue = convertValue(value)
    const values = options.map((n) => n.value || n).filter((n) => !!n)
    if (!multiple) return values.indexOf(newValue[0])
    return newValue.map((n) => values.indexOf(n))
}

export function getRealValue(options = [], value = '', multiple = false) {
    const newValue = convertValue(value)
    const values = options.map((n) => n.value || n).filter((n) => !!n)
    if (!multiple) {
        if (values.includes(newValue[0])) {
            return newValue[0]
        }
        return ''
    }
    return newValue.filter((n) => values.includes(n))
}

export const DEFAULT_FIELD_NAMES = {
    title: 'title',
    value: 'value',
    options: 'options',
}

export function fillFieldNames(fieldNames = {}) {
    const { title, value, options } = { ...DEFAULT_FIELD_NAMES, ...fieldNames }
  
    return {
        title: title || DEFAULT_FIELD_NAMES.title,
        value: value || DEFAULT_FIELD_NAMES.value,
        options: options || DEFAULT_FIELD_NAMES.options,
    }
}

export function flattenOptions(options, { fieldNames = DEFAULT_FIELD_NAMES } = {}) {
    const flattenList = []

    const {
        title: fieldTitle,
        value: fieldValue,
        options: fieldOptions,
    } = fillFieldNames(fieldNames)

    function dig(list, isGroupOption) {
        list.forEach((data) => {
            data = typeof data === 'string' ? ({ [fieldTitle]: data, [fieldValue]: data }) : data
            const title = data[fieldTitle]

            if (isGroupOption || !(fieldOptions in data)) {
                const value = data[fieldValue]

                // Option
                flattenList.push({
                    ...data,
                    isGroupOption,
                    data,
                    title,
                    value,
                })
            } else {
                let grpTitle = title
                if (grpTitle === undefined) {
                    grpTitle = data.title
                }

                // Option Group
                flattenList.push({
                    ...data,
                    isGroup: true,
                    data,
                    title: grpTitle,
                })

                dig(data[fieldOptions], true)
            }
        })
    }

    dig(options, false)

    return flattenList
}
