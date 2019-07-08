export const defaultFieldNames = {
    label: 'label',
    value: 'value',
    children: 'children',
}

export function getRealIndex(value = 0, min = 0, max) {
    if (value <= min) return min
    if (value >= max) return max
    return value
}

export function getRealIndexes(indexes = [], cols = []) {
    return cols.reduce((acc, col, idx) => ([...acc, getRealIndex(indexes[idx], 0, col.length - 1)]), [])
}

export function getIndexFromValue(value, col = [], fieldNames = defaultFieldNames) {
    return getRealIndex(col.map((v) => v[fieldNames.value]).indexOf(value), 0, col.length - 1)
}

export function getIndexesFromValues(values = [], cols = [], fieldNames = defaultFieldNames) {
    return cols.reduce((acc, col, idx) => ([...acc, getIndexFromValue(values[idx], col, fieldNames)]), [])
}

export function getValueFromIndex(index, col = [], fieldNames = defaultFieldNames) {
    return col[getRealIndex(index, 0, col.length - 1)][fieldNames.value]
}

export function getValuesFromIndexes(indexes = [], cols = [], fieldNames = defaultFieldNames) {
    return cols.reduce((acc, col, idx) => ([...acc, getValueFromIndex(indexes[idx], col, fieldNames)]), [])
}

export function getRealValue(value = '', col = [], fieldNames = defaultFieldNames) {
    return col.length > 0 ? col[getIndexFromValue(value, col, fieldNames)][fieldNames.value] : null
}

export function getRealValues(values = [], cols = [], fieldNames = defaultFieldNames) {
    return cols.length > 0 ? cols.reduce((acc, col, idx) => ([...acc, getRealValue(values[idx], col, fieldNames)]), []) : []
}

export function getLabelFromIndex(index, col = [], member) {
    return member ? col[index] && col[index][member] : col[index]
}

export function getLabelsFromIndexes(indexes, cols = [], member) {
    return cols.reduce((acc, col, idx) => ([...acc, getLabelFromIndex(indexes[idx], col, member)]), [])
}

export function isMultiPicker(data = []) {
    return !data ? false : Array.isArray(data[0])
}

export function getRealCol(data = [], fieldNames = defaultFieldNames) {
    return data.map((v) => {
        if (typeof v !== 'object') {
            return { [fieldNames.value]: v, [fieldNames.label]: v }
        }
        return v
    })
}

export function getRealCols(data = [], fieldNames = defaultFieldNames) {
    const cols = isMultiPicker(data) ? data : [data]
    return cols.reduce((acc, col) => ([...acc, getRealCol(col, fieldNames)]), [])
}