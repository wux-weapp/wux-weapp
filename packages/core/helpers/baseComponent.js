import computedBehavior from './mixins/computedBehavior'
import relationsBehavior from './mixins/relationsBehavior'
import safeSetDataBehavior from './mixins/safeSetDataBehavior'
import funcBehavior from './mixins/funcBehavior'
import { warningUnChecked } from './shared/warningUnChecked'

warningUnChecked()

const baseComponent = (options = {}) => {
    // add default externalClasses
    options.externalClasses = [
        'wux-class-a',
        'wux-class-b',
        'wux-class-c',
        'wux-class',
        'wux-hover-class',
        ...(options.externalClasses = options.externalClasses || []),
    ]

    // add default behaviors
    options.behaviors = [
        safeSetDataBehavior,
        ...(options.behaviors = options.behaviors || []),
        relationsBehavior,
        computedBehavior, // make sure it's triggered
    ]

    // use func
    if (options.useFunc) {
        options.behaviors = [...options.behaviors, funcBehavior]
        delete options.useFunc
    }

    // use field
    if (options.useField) {
        options.behaviors = [...options.behaviors, 'wx://form-field']
        delete options.useField
    }

    // use field button
    if (options.useFieldButton) {
        options.behaviors = [...options.behaviors, 'wx://form-field-button']
        delete options.useFieldButton
    }

    // use export
    if (options.useExport) {
        options.behaviors = [...options.behaviors, 'wx://component-export']
        options.methods = {
            ['export'] () {
                return this
            },
            ...options.methods,
        }
        options['export'] = options.methods['expose'] || options.methods['export']
        delete options.useExport
    }

    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true,
        ...options.options,
    }

    // 属性的类型（可以指定多个）
    options.properties && Object.keys(options.properties).forEach((propKey) => {
        const prop = options.properties[propKey]
        if (Array.isArray(prop.type)) {
            prop.optionalTypes = prop.type
        }
    })

    return Component(options)
}

export default baseComponent
