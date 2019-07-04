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
