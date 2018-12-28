import computedBehavior from './computedBehavior'
import relationsBehavior from './relationsBehavior'
import safeSetDataBehavior from './safeSetDataBehavior'
import classNames from './classNames'

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

    // check hasField
    if (options.hasField) {
        options.behaviors = [...options.behaviors, 'wx://form-field']
        delete options.hasField
    }

    // check hasExport
    if (options.hasExport) {
        options.behaviors = [...options.behaviors, 'wx://component-export']
        options.methods = {
            export () {
                return this
            },
            ...options.methods,
        }
        delete options.hasExport
    }

    // add default options
    options.options = {
        multipleSlots: true,
        addGlobalClass: true,
        ...options.options,
    }

    // fix first computed
    options.classNames = classNames

    // add default methods
    options.methods = {
        classNames,
        ...options.methods,
    }

    return Component(options)
}

export default baseComponent
