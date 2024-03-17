import baseComponent from '../helpers/baseComponent'
import classNames from '../helpers/libs/classNames'
import warning from '../helpers/libs/warning'
import { props } from './props'
import createFieldsStore, {
    isNullValue,
    getValueFromEvent,
    getParams,
    transformRules,
    hasRules,
    normalizeValidateRules,
    getValidateTriggers,
    isEmptyObject,
    flattenArray,
} from '../helpers/hooks/useFieldForm'
import {
    FIELD_META_PROP,
    FIELD_DATA_PROP,
    DEFAULT_TRIGGER,
} from '../helpers/shared/constants'
import { get, set, eq } from '../helpers/shared/util'
import AsyncValidator from '../helpers/libs/async-validator'

baseComponent({
    useExport: true,
    relations: {
        '../field/index': {
            type: 'descendant',
            observer(e, { unlinked }) {
                this.renderFields[e.data.name] = unlinked === false
                this.callDebounceFn(this.changeValue)
            },
        },
    },
    properties: props,
    observers: {
        ['layout, validateMessages, requiredMarkStyle, asteriskText, requiredText, optionalText, disabled, readOnly'](...args) {
            this.changeFieldElem(this.data)
        },
    },
    computed: {
        classes: ['prefixCls', function(prefixCls) {
            const wrap = classNames(prefixCls)
            const footer = `${prefixCls}__footer`

            return {
                wrap,
                footer,
            }
        }],
    },
    methods: {
        changeFieldElem(props) {
            const {
                layout,
                validateMessages,
                requiredMarkStyle,
                asteriskText,
                requiredText,
                optionalText,
                disabled,
                readOnly,
            } = props

            const elements = this.getRelationsByName('../field/index')
            if (elements.length > 0) {
                const lastIndex = elements.length - 1
                elements.forEach((fieldElem, index) => {
                    const isLast = index === lastIndex
                    const context = {
                        layout,
                        validateMessages,
                        requiredMarkStyle,
                        asteriskText,
                        requiredText,
                        optionalText,
                        disabled,
                        readOnly,
                    }
                    fieldElem.changeContext(index, isLast, context)
                })
            }
        },
        changeValue() {
            this.changeFieldElem(this.data)
            this.clearUnlinkedFields()
        },
        saveRef(name, _, component) {
            if (!component) {
                const fieldMeta = this.fieldsStore.getFieldMeta(name);
                if (!fieldMeta.preserve) {
                    // after destroy, delete data
                    this.clearedFieldMetaCache[name] = {
                        field: this.fieldsStore.getField(name),
                        meta: fieldMeta,
                    };
                    this.clearField(name);
                }
                return;
            }
            this.recoverClearedField(name);
            this.instances[name] = component;
        },
        recoverClearedField(name) {
            if (this.clearedFieldMetaCache[name]) {
                this.fieldsStore.setFields({
                    [name]: this.clearedFieldMetaCache[name].field,
                });
                this.fieldsStore.setFieldMeta(
                    name,
                    this.clearedFieldMetaCache[name].meta,
                );
                delete this.clearedFieldMetaCache[name];
            }
        },
        setFieldsAsErrors(name, fieldMeta) {
            const fieldNames = this.fieldsStore.getValidFieldsFullName(name)
            if (fieldNames.includes(name) && !hasRules(fieldMeta.validate)) {
                const nowField = this.fieldsStore.getField(name)
                if (nowField.errors) {
                    this.fieldsStore.setFields({
                        [name]: {
                            ...nowField,
                            errors: undefined,
                        },
                    })
                }
            }
        },
        /**
         * 清除已卸载的元素
         */
        clearUnlinkedFields() {
            const fieldList = this.fieldsStore.getAllFieldsName()
            const removedList = fieldList.filter((field) => {
                const fieldMeta = this.fieldsStore.getFieldMeta(field)
                return !this.renderFields[field] && !fieldMeta.preserve
            })

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
            delete this.instances[name]
            delete this.cachedBind[name]
        },
        /**
         * 设置字段
         */
        setFields(maybeNestedFields, callback) {
            const fields = this.fieldsStore.flattenRegisteredFields(maybeNestedFields)
            Object.keys(fields).forEach((name) => {
                this.fieldsStore.setFields({ [name]: fields[name] })
                const fieldMeta = this.fieldsStore.getFieldMeta(name)
                if (fieldMeta) {
                    const { fieldElem, inputElem } = fieldMeta
                    fieldElem.forceUpdate(inputElem, callback)
                }
            })

            // trigger onFieldsChange
            const changedFields = Object.keys(fields).reduce(
                (acc, name) => set(acc, name, this.fieldsStore.getField(name)),
                {},
            )
            const allFields = this.fieldsStore.getNestedAllFields()
            this.onFieldsChange(changedFields, allFields)
        },
        onCollectValidate(name, action, ...args) {
            const { field, fieldMeta } = this.onCollectCommon(name, action, args);
            const newField = {
                ...field,
                dirty: true,
            };

            this.fieldsStore.setFieldsAsDirty();

            this.validateFieldsInternal([newField], {
                action,
                options: {
                    firstFields: !!fieldMeta.validateFirst,
                },
            });
        },
        /**
         * 同步子元素
         */
        onCollectCommon(name, action, args) {
            const field = this.fieldsStore.getField(name);
            const fieldMeta = this.fieldsStore.getFieldMeta(name)
            const { oriInputEvents, fieldElem } = fieldMeta

            // trigger inputElem func
            if (oriInputEvents && oriInputEvents[action]) {
                oriInputEvents[action](...args)
            }

            const value = getValueFromEvent(...args)
            const oldValue = this.fieldsStore.getFieldValue(name)

            // set field value
            if (value !== oldValue) {
                if (fieldElem.data.value !== value) {
                    fieldElem.setData({ value })
                }

                // trigger onValuesChange
                const changedValues = { [name]: value }
                const allValues = this.fieldsStore.getAllValues()
                this.onValuesChange(changedValues, { ...allValues, ...changedValues })
              
            }

            return {
                name,
                field: {
                    ...field,
                    value,
                    touched: true,
                },
                fieldMeta,
            }
        },
        /**
       * 同步子元素
       */
        onCollect(name_, action, ...args) {
            const { name, field, fieldMeta } = this.onCollectCommon(name_, action, args)

            const { validate } = fieldMeta;

            this.fieldsStore.setFieldsAsDirty();

            const newField = {
                ...field,
                dirty: hasRules(validate),
            };

            this.setFields({ [name]: newField })
        },
        /**
         * 设置 value
         */
        setFieldsValue(changedValues, callback) {
            const { fieldsMeta } = this.fieldsStore;
            const values = this.fieldsStore.flattenRegisteredFields(changedValues);
            const newFields = Object.keys(values).reduce((acc, name) => {
                const isRegistered = fieldsMeta[name];
                if (isRegistered) {
                    const value = values[name];
                    acc[name] = {
                        value,
                    };
                }
                return acc;
            }, {});
            this.setFields(newFields, callback);
            const allValues = this.fieldsStore.getAllValues();
            this.onValuesChange(changedValues, allValues)
        },
        /**
         * 重置字段
         */
        resetFields(ns) {
            const names = typeof ns === 'undefined'
                ? ns : Array.isArray(ns)
                    ? ns : [ns]
            const newFields = this.fieldsStore.resetFields(names)
            if (Object.keys(newFields).length > 0) {
                this.setFields(newFields)
            }

            if (ns) {
                const names = Array.isArray(ns) ? ns : [ns];
                names.forEach(name => delete this.clearedFieldMetaCache[name]);
            } else {
                this.clearedFieldMetaCache = {};
            }
        },
        validateFieldsInternal(
            fields,
            { fieldNames, action, options = {} },
            callback,
        ) {
            const allRules = {};
            const allValues = {};
            const allFields = {};
            const alreadyErrors = {};
            fields.forEach(field => {
                const name = field.name;
                if (options.force !== true && field.dirty === false) {
                    if (field.errors) {
                        set(alreadyErrors, name, { errors: field.errors });
                    }
                    return;
                }
                const fieldMeta = this.fieldsStore.getFieldMeta(name);
                const newField = {
                    ...field,
                };
                newField.errors = undefined;
                newField.validating = true;
                newField.dirty = true;
                allRules[name] = this.getRules(fieldMeta, action);
                allValues[name] = newField.value;
                allFields[name] = newField;
            });
            this.setFields(allFields);
            // in case normalize
            Object.keys(allValues).forEach(f => {
                allValues[f] = this.fieldsStore.getFieldValue(f);
            });
            if (callback && isEmptyObject(allFields)) {
                callback(
                    isEmptyObject(alreadyErrors) ? null : alreadyErrors,
                    this.fieldsStore.getFieldsValue(fieldNames),
                );
                return;
            }
            const validator = new AsyncValidator(allRules);
            const { validateMessages } = this.data
            if (validateMessages) {
                validator.messages(validateMessages);
            }
            validator.validate(allValues, options, errors => {
                const errorsGroup = {
                    ...alreadyErrors,
                };
                if (errors && errors.length) {
                    errors.forEach(e => {
                        const errorFieldName = e.field;
                        let fieldName = errorFieldName;
  
                        // Handle using array validation rule.
                        Object.keys(allRules).some(ruleFieldName => {
                            const rules = allRules[ruleFieldName] || [];
  
                            // Exist if match rule
                            if (ruleFieldName === errorFieldName) {
                                fieldName = ruleFieldName;
                                return true;
                            }
  
                            // Skip if not match array type
                            if (
                                rules.every(({ type }) => type !== 'array') ||
                    errorFieldName.indexOf(`${ruleFieldName}.`) !== 0
                            ) {
                                return false;
                            }
  
                            // Exist if match the field name
                            const restPath = errorFieldName.slice(ruleFieldName.length + 1);
                            if (/^\d+$/.test(restPath)) {
                                fieldName = ruleFieldName;
                                return true;
                            }
  
                            return false;
                        });
  
                        const field = get(errorsGroup, fieldName);
                        if (typeof field !== 'object' || Array.isArray(field)) {
                            set(errorsGroup, fieldName, { errors: [] });
                        }
                        const fieldErrors = get(errorsGroup, fieldName.concat('.errors'));
                        fieldErrors.push(e);
                    });
                }
                const expired = [];
                const nowAllFields = {};
                Object.keys(allRules).forEach(name => {
                    const fieldErrors = get(errorsGroup, name);
                    const nowField = this.fieldsStore.getField(name);
                    // avoid concurrency problems
                    if (!eq(nowField.value, allValues[name])) {
                        expired.push({
                            name,
                        });
                    } else {
                        nowField.errors = fieldErrors && fieldErrors.errors;
                        nowField.value = allValues[name];
                        nowField.validating = false;
                        nowField.dirty = false;
                        nowAllFields[name] = nowField;
                    }
                });
                this.setFields(nowAllFields);
                if (callback) {
                    if (expired.length) {
                        expired.forEach(({ name }) => {
                            const fieldErrors = [
                                {
                                    message: `${name} need to revalidate`,
                                    field: name,
                                },
                            ];
                            set(errorsGroup, name, {
                                expired: true,
                                errors: fieldErrors,
                            });
                        });
                    }
  
                    callback(
                        isEmptyObject(errorsGroup) ? null : errorsGroup,
                        this.fieldsStore.getFieldsValue(fieldNames),
                    );
                }
            });
        },
        validateFields(ns, opt, cb) {
            const pending = new Promise((resolve, reject) => {
                const { names, options } = getParams(ns, opt, cb);
                let { callback } = getParams(ns, opt, cb);
                if (!callback || typeof callback === 'function') {
                    const oldCb = callback;
                    callback = (errors, values) => {
                        if (oldCb) {
                            oldCb(errors, values);
                        }
                        if (errors) {
                            reject({ errors, values });
                        } else {
                            resolve(values);
                        }
                    };
                }
                const fieldNames = names
                    ? this.fieldsStore.getValidFieldsFullName(names)
                    : this.fieldsStore.getValidFieldsName();
                const fields = fieldNames
                    .filter(name => {
                        const fieldMeta = this.fieldsStore.getFieldMeta(name);
                        return hasRules(fieldMeta.validate);
                    })
                    .map(name => {
                        const field = this.fieldsStore.getField(name);
                        field.value = this.fieldsStore.getFieldValue(name);
                        return field;
                    });
                if (!fields.length) {
                    callback(null, this.fieldsStore.getFieldsValue(fieldNames));
                    return;
                }
                if (!('firstFields' in options)) {
                    options.firstFields = fieldNames.filter(name => {
                        const fieldMeta = this.fieldsStore.getFieldMeta(name);
                        return !!fieldMeta.validateFirst;
                    });
                }
                this.validateFieldsInternal(
                    fields,
                    {
                        fieldNames,
                        options,
                    },
                    callback,
                );
            });
            pending.catch(e => {
                // eslint-disable-next-line no-console
                if (console.error) {
                    // eslint-disable-next-line no-console
                    console.error(e);
                }
                return e;
            });
            return pending;
        },
        getRules(fieldMeta, action) {
            const actionRules = fieldMeta.validate
                .filter(item => {
                    return !action || item.trigger.indexOf(action) >= 0;
                })
                .map(item => item.rules);
            return flattenArray(actionRules);
        },
        getFieldInstance(name) {
            return this.instances[name];
        },
        getCacheBind(name, action, fn) {
            if (!this.cachedBind[name]) {
                this.cachedBind[name] = {};
            }
            const cache = this.cachedBind[name];
            if (!cache[action] || cache[action].oriFn !== fn) {
                cache[action] = {
                    fn: fn.bind(this, name, action),
                    oriFn: fn,
                };
            }
            return cache[action].fn;
        },
        getFieldDecorator(name, fieldData, fieldElem) {
            const props = this.getFieldProps(name, fieldData, fieldElem)

            return (inputElem) => {
                // We should put field in record if it is rendered
                this.renderFields[name] = true

                const fieldMeta = this.fieldsStore.getFieldMeta(name)
                const originalProps = inputElem.data

                fieldMeta.inputElem = inputElem

                // cache inputEvents
                if (!originalProps.oriInputEvents) {
                    props.oriInputEvents = { ...originalProps.inputEvents }
                    fieldMeta.oriInputEvents = { ...originalProps.inputEvents }
                }

                const decoratedFieldProps = {
                    ...props,
                    ...this.fieldsStore.getFieldValuePropValue(fieldMeta),
                }

                return decoratedFieldProps
            }
        },
        getFieldProps(name, fieldData, fieldElem) {
            delete this.clearedFieldMetaCache[name]

            const rules = transformRules(fieldData.rules)
            const {
                initialValue,
                trigger = DEFAULT_TRIGGER,
                valuePropName,
                validate = [],
                validateTrigger = [DEFAULT_TRIGGER],
                preserve,
                // rules,
                validateFirst,
                hidden,
            } = fieldData
            const fieldOption = {
                name,
                // initialValue,
                trigger,
                valuePropName,
                validate,
                validateTrigger,
                preserve,
                rules,
                validateFirst,
                hidden,
            }

            if (!isNullValue(initialValue)) {
                fieldOption.initialValue = initialValue
            }

            const inputProps = {
                ...this.fieldsStore.getFieldValuePropValue(fieldOption),
                inputEvents: {},
            }
        
            const fieldMeta = this.fieldsStore.getFieldMeta(name);
            if ('initialValue' in fieldOption) {
                fieldMeta.initialValue = fieldOption.initialValue;
            }
            fieldMeta.fieldElem = fieldElem

            const validateRules = normalizeValidateRules(
                validate,
                rules,
                validateTrigger,
            );

            const validateTriggers = getValidateTriggers(validateRules);

            validateTriggers.forEach(action => {
                if (inputProps.inputEvents[action]) { return };
                inputProps.inputEvents[action] = this.getCacheBind(
                    name,
                    action,
                    this.onCollectValidate,
                )
            });

            // make sure that the value will be collect
            if (validateTriggers.indexOf(trigger) === -1) {
                inputProps.inputEvents[trigger] = this.getCacheBind(
                    name,
                    trigger,
                    this.onCollect,
                )
            }

            const meta = {
                ...fieldMeta,
                ...fieldOption,
                validate: validateRules,
            }

            this.fieldsStore.setFieldMeta(name, meta)

            // fix errors
            this.setFieldsAsErrors(name, meta)

            const {
                fieldElem: __fieldElem,
                inputElem: __inputElem,
                oriInputEvents: __oriInputEvents,
                ...fieldMetaProp
            } = meta

            // inject field
            inputProps[FIELD_META_PROP] = fieldMetaProp
            inputProps[FIELD_DATA_PROP] = this.fieldsStore.getField(name);

            return inputProps
        },
        registerField(name, fieldElem) {
            const action = `${name}__ref`
            const ref = this.getCacheBind(name, action, this.saveRef)
            ref(fieldElem)
            return () => {
                ref(null)
            }
        },
        getInternalHooks(key) {
            if (key === 'FORM_HOOK_MARK') {
                return {
                    registerField: this.registerField.bind(this),
                    getFieldDecorator: this.getFieldDecorator.bind(this),
                }
            }
            warning(
                false,
                '`getInternalHooks` is internal usage of the <form />. Should not call directly.'
            )
            return null
        },
        /**
         * 表单对外暴露方法
         */
        expose() {
            return {
                getFieldsValue: this.getFieldsValue,
                getFieldValue: this.getFieldValue,
                setFieldsInitialValue: this.setFieldsInitialValue,
                getFieldsError: this.getFieldsError,
                getFieldError: this.getFieldError,
                isFieldValidating: this.isFieldValidating,
                isFieldsValidating: this.isFieldsValidating,
                isFieldsTouched: this.isFieldsTouched,
                isFieldTouched: this.isFieldTouched,
                setFieldsValue: this.setFieldsValue.bind(this),
                setFields: this.setFields.bind(this),
                resetFields: this.resetFields.bind(this),
                validateFields: this.validateFields.bind(this),
                getFieldInstance: this.getFieldInstance.bind(this),
                getInternalHooks: this.getInternalHooks.bind(this),
            }
        },
        /**
         * trigger onValuesChange
         */
        onValuesChange(changedValues, allValues) {
            this.triggerEvent('change', { form: this.expose(), changedValues, allValues })
        },
        /**
         * trigger onFieldsChange
         */
        onFieldsChange(changedFields, allFields) {
            this.triggerEvent('fieldsChange', { form: this.expose(), changedFields, allFields })
        },
    },
    created() {
        const methods = [
            'getFieldsValue',
            'getFieldValue',
            'setFieldsInitialValue',
            'getFieldsError',
            'getFieldError',
            'isFieldValidating',
            'isFieldsValidating',
            'isFieldsTouched',
            'isFieldTouched',
        ]

        this.fieldsStore = createFieldsStore()
        this.renderFields = {}
        this.cachedBind = {}
        this.clearedFieldMetaCache = {}
        this.instances = {}

        methods.forEach((method) => {
            this[method] = (...args) => {
                return this.fieldsStore[method](...args)
            }
        })
    },
})
