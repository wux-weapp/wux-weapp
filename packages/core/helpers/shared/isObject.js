export function isObject(value) {
    let type = typeof value
    return !!value && (type == 'object' || type == 'function')
}
