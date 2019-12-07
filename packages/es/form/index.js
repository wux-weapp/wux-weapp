import baseComponent from '../helpers/baseComponent'
import createFieldsStore from '../helpers/createFieldsStore'

baseComponent({
    relations: {
        '../field/index': {
            type: 'descendant',
            observer(e, { unlinked }) {
                this.renderFields[e.data.name] = unlinked === false
                this.debounce(this.changeValue)
            },
        },
    },
    properties: {},
    methods: {
        /**
         * 更新 value 值，同步到子元素
         */
        changeValue() {
            const elements = this.getRelationNodes('../field/index')

            if (elements.length > 0) {
                const fields = elements.reduce((acc, fieldElem) => {
                    const { data: originalProps } = fieldElem
                    const { name } = originalProps
                    const field = this.fieldsStore.getField(name)
                    const meta = {
                        ...originalProps,
                        ...field,
                        originalProps,
                        fieldElem,
                    }

                    acc[name] = meta

                    this.renderFields[name] = true
                    fieldElem.fieldsStore = this.fieldsStore

                    return acc
                }, {})

                this.fieldsStore.updateFields(fields)
                this.clearUnlinkedFields()
            }
        },
        /**
         * 清除已卸载的元素
         */
        clearUnlinkedFields() {
            const fieldList = this.fieldsStore.getAllFieldsName()
            const removedList = fieldList.filter((field) => !this.renderFields[field])

            if (removedList.length > 0) {
                removedList.forEach((name) => this.clearField(name))
            }
        },
        /**
         * 清除字段
         */
        clearField(name) {
            this.fieldsStore.clearField(name)
            delete this.renderFields[name]
        },
        /**
         * 设置字段
         */
        setFields(fields) {
            Object.keys(fields).forEach((name) => {
                const field = this.fieldsStore.getField(name)
                const meta = { ...field, value: fields[name] }
                this.fieldsStore.setFields({ [name]: meta })
                if (field && field.fieldElem) {
                    field.fieldElem.changeValue(fields[name])
                }
            })
        },
        /**
         * 设置 value
         */
        setFieldsValue(values) {
            const { fields } = this.fieldsStore
            const changedValues = Object.keys(values).reduce((acc, name) => {
                if (fields[name]) acc[name] = values[name]
                return acc
            }, {})
            this.setFields(changedValues)
            const allValues = this.getFieldsValue()
            this.onChange(changedValues, allValues)
        },
        /**
         * 重置字段
         */
        resetFields(ns) {
            const names = Array.isArray(ns) ? ns : [ns]
            const newFields = this.fieldsStore.resetFields(names)
            if (Object.keys(newFields).length > 0) {
                this.setFields(newFields)
            }
        },
        /**
         * 表单对外暴露方法
         */
        getForm() {
            return {
                getFieldsValue: this.getFieldsValue,
                getFieldValue: this.getFieldValue,
                setFieldsValue: this.setFieldsValue,
                setFields: this.setFields,
                resetFields: this.resetFields,
            }
        },
        /**
         * trigger onChange
         */
        onChange(changedValues, allValues) {
            this.triggerEvent('change', { form: this.getForm(), changedValues, allValues })
        },
    },
    created() {
        const methods = ['getFieldsValue', 'getFieldValue']

        this.fieldsStore = createFieldsStore()
        this.renderFields = {}
        this.setFieldsValue = this.setFieldsValue.bind(this)
        this.setFields = this.setFields.bind(this)
        this.resetFields = this.resetFields.bind(this)

        methods.forEach((method) => {
            this[method] = (...args) => {
                return this.fieldsStore[method](...args)
            }
        })
    },
})
