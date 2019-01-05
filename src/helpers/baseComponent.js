import computedBehavior from './computedBehavior'
import relationsBehavior from './relationsBehavior'
import safeSetDataBehavior from './safeSetDataBehavior'
import funcBehavior from './funcBehavior'

const baseComponent = (options = {}) => {
    // add default externalClasses
    options.externalClasses = [
        'wux-class',
        'wux-hover-class',
        ...(options.externalClasses = options.externalClasses || []),
    ]

    // add default behaviors
    options.behaviors = [
        relationsBehavior,
        computedBehavior,
        safeSetDataBehavior,
        ...(options.behaviors = options.behaviors || []),
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

    // use export
    if (options.useExport) {
        options.behaviors = [...options.behaviors, 'wx://component-export']
        options.methods = {
            export () {
                return this
            },
            ...options.methods,
        }
        delete options.useExport
    }

    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true,
        ...options.options,
    }

    return Component(options)
}

export default baseComponent
