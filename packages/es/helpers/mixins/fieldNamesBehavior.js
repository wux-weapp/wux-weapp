export const getDefaultFieldNames = () => ({
    label: 'label',
    value: 'value',
    children: 'children',
    disabled: 'disabled',
})

export const fieldNamesProps = {
    defaultFieldNames: {
        type: Object,
        value: getDefaultFieldNames(),
    },
}

export const setFieldNames = (fieldNames = {}) => {
    return {
        ...getDefaultFieldNames(),
        ...fieldNames,
    }
}

export default Behavior({
    properties: { ...fieldNamesProps },
    data: {
        useFieldNames: false,
        fieldNames: getDefaultFieldNames(),
    },
    definitionFilter(defFields) {
        Object.assign(defFields.data = (defFields.data || {}), {
            fieldNames: getDefaultFieldNames(),
        })
        Object.assign(defFields.methods = (defFields.methods || {}), {
            getFieldNames() {
                const props = this.data
                return props.useFieldNames
                    ? props.fieldNames
                    : props.defaultFieldNames
            },
            getFieldName(name) {
                return this.getFieldNames()[name]
            },
        })
    },
    lifetimes: {
        attached() {
            const props = this.data
            this.setData({
                useFieldNames: true,
                fieldNames: setFieldNames(props.defaultFieldNames),
            })
        },
    },
})

