class FieldsStore {
    constructor(fields = {}) {
        this.fields = fields
    }

    setFields(fields) {
        Object.assign(this.fields, fields)
    }

    updateFields(fields) {
        this.fields = fields
    }

    clearField(name) {
        delete this.fields[name]
    }

    getValueFromFields(name, fields) {
        const field = fields[name]
        if (field && 'value' in field) {
            return field.value
        }
        return field.initialValue
    }

    getAllFieldsName() {
        const { fields } = this
        return fields ? Object.keys(fields) : []
    }

    getField(name) {
        return {
            ...this.fields[name],
            name,
        }
    }

    getFieldValuePropValue(fieldOption) {
        const { name, valuePropName } = fieldOption
        const field = this.getField(name)
        const fieldValue = 'value' in field ? field.value : field.initialValue

        return {
            [valuePropName]: fieldValue,
        }
    }

    getFieldValue(name) {
        return this.getValueFromFields(name, this.fields)
    }

    getFieldsValue(names) {
        const fields = names || this.getAllFieldsName()
        return fields.reduce((acc, name) => {
            acc[name] = this.getFieldValue(name)
            return acc
        }, {})
    }

    resetFields(ns) {
        const { fields } = this
        const names = ns || this.getAllFieldsName()
        return names.reduce((acc, name) => {
            const field = fields[name]
            if (field) {
                acc[name] = field.initialValue
            }
            return acc
        }, {})
    }
}

export default function createFieldsStore(fields) {
    return new FieldsStore(fields)
}
