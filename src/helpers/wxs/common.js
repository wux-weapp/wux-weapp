import * as util from './util.js'

export function getOptions(options, fieldNames) {
    const isObject = util.type(fieldNames) === 'object'
    const labelName = isObject ? fieldNames.label : 'label'
    const valueName = isObject ? fieldNames.value : 'value'
    return options.map(function (option, index) {
        if (util.type(option) === 'string') {
            const newOption = {}
            newOption.index = index
            newOption[labelName] = option
            newOption[valueName] = option
            return newOption
        }
        option.index = index
        return option
    })
}

export function getValue(values, type) {
    if (type === 'radio') {
        if (util.type(values) === 'array') {
            return values[0] || ''
        }
        return values || ''
    }
    return values || []
}

export function getChecked(values, value, type) {
    if (type === 'radio') {
        return getValue(values, type) === value
    }
    return getValue(values, type).indexOf(value) !== -1
}
