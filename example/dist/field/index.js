import baseComponent from '../helpers/baseComponent'
import createFieldsStore from '../helpers/createFieldsStore'

const DEFAULT_TRIGGER = 'onChange'

function noop() {}

function getValueFromEvent(e) {
    // To support custom element
    if (!e || !e.detail) {
        if ('value' in e) {
            return e.value
        }
        return e
    }
    return e.detail.value
}

const children = [
    'picker',
    'date-picker',
    'popup-select',
    'radio-group',
    'checkbox-group',
    'switch',
    'input',
    'input-number',
    'rater',
    'slider',
    'textarea',
]

const relations = children.map((name) => `../${name}/index`).reduce((acc, name) => {
    return {
        ...acc,
        [name]: {
            type: 'descendant',
            observer: function() {
                this.debounce(this.changeValue)
            },
        }
    }
}, {})

baseComponent({
    useField: true,
    relations: {
        '../form/index': {
            type: 'ancestor',
        },
        ...relations,
    },
    properties: {
        initialValue: {
            type: null,
            value: null,
            observer: 'changeValue',
        },
        valuePropName: {
            type: String,
            value: 'inputValue',
        },
        trigger: {
            type: String,
            value: DEFAULT_TRIGGER,
        },
    },
    methods: {
        /**
         * 获取子节点
         */
        getNodes(relations = []) {
            return relations.map((name) => this.getRelationNodes(name)[0]).filter((v) => !!v)
        },
        /**
         * 更新 value 值，同步到子元素
         */
        changeValue(value = this.data.value) {
            const relations = this.getRelationsName(['descendant'])
            const elements = this.getNodes(relations)

            this.fieldsStore = this.fieldsStore || createFieldsStore()
            this.setValue(value)

            if (elements.length > 0) {
                elements.forEach((inputElem) => {
                    inputElem.hasFieldDecorator = true
                    this.setValue(value, inputElem, this.data.valuePropName, () => {
                        this.forceUpdate(this.data.name, this.data, inputElem)
                    })
                })
            }
        },
        /**
         * 设置 value 值
         */
        setValue(value, elem = this, valuePropName = 'value', callback = noop) {
            if (elem.data[valuePropName] !== value) {
                elem.setData({ [valuePropName]: value }, callback)
            } else {
                callback()
            }
        },
        /**
         * 强制更新元素
         */
        forceUpdate(name, fieldOption, inputElem) {
            const { valuePropName } = fieldOption
            const inputProps = this.getFieldDecorator(name, fieldOption, inputElem)
            const inputValue = inputProps[valuePropName]

            delete inputProps[valuePropName]
            
            inputElem.setData(inputProps)
            this.setValue(inputValue, inputElem, valuePropName)
        },
        /**
         * 同步子元素
         */
        onCollectCommon(name, action, args) {
            const field = this.fieldsStore.getField(name)
            const { inputElem, oriInputProps } = field
            const { oriInputEvents } = oriInputProps

            // trigger inputElem func
            if (oriInputEvents && oriInputEvents[action]) {
                oriInputEvents[action](...args)
            }

            const value = getValueFromEvent(...args)
            const oldValue = this.fieldsStore.getFieldValue(name)
            const parent = this.getRelationNodes('../form/index')[0]

            // set field value
            if (value !== oldValue) {
                this.setValue(value)
                this.setValue(value, inputElem, field.valuePropName)

                // trigger onChange
                if (parent) {
                    const changedValues = { [name]: value }
                    const allValues = this.fieldsStore.getFieldsValue()
                    parent.onChange(changedValues, { ...allValues, ...changedValues })
                }
            }

            return {
                name,
                field: {
                    ...field,
                    value,
                },
            }
        },
        /**
         * 同步子元素
         */
        onCollect(name_, action, ...args) {
            const { name, field } = this.onCollectCommon(name_, action, args)

            this.fieldsStore.setFields({ [name]: field })
        },
        /**
         * 字段装饰器
         */
        getFieldDecorator(name, fieldOption, inputElem) {
            const field = this.fieldsStore.getField(name)
            const { data: oriInputProps } = inputElem
            const { trigger = DEFAULT_TRIGGER } = fieldOption

            const meta = {
                ...field,
                ...fieldOption,
                name,
                oriInputProps,
                inputElem,
            }

            this.fieldsStore.setFields({ [name]: meta })

            const inputProps = {
                ...this.fieldsStore.getFieldValuePropValue(fieldOption),
            }

            // set input events, rewrite `trigger` func
            if (trigger && !oriInputProps.oriInputEvents) {
                inputProps.oriInputEvents = { ...oriInputProps.inputEvents }
                inputProps.inputEvents = {
                    ...oriInputProps.inputEvents,
                    [trigger]: (...args) => this.onCollect(name, trigger, ...args),
                }
            }

            return inputProps
        },
    },
})
