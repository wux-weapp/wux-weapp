export function omit(obj, fields) {
    const clone = { ...obj }

    if (Array.isArray(fields)) {
        fields.forEach((key) => {
            delete clone[key]
        })
    }

    return clone
}
