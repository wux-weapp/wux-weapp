export function getDefaultContext (props, fields) {
    const clone = {}
    if (Array.isArray(fields)) {
        fields.forEach((key) => {
            const prop = props[key]
            clone[key] = typeof prop === 'object'
                ? prop.value
                : prop
        })
    }
    return clone
}
