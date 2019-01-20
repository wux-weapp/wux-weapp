import isEmpty from './isEmpty'
import debounce from './debounce'

/**
 * bind func to obj
 */
function bindFunc(obj, method, observer) {
    const oldFn = obj[method]
    obj[method] = function(target) {
        if (observer) {
            observer.call(this, target, {
                [method]: true,
            })
        }
        if (oldFn) {
            oldFn.call(this, target)
        }
    }
}

// default methods
const methods = ['linked', 'linkChanged', 'unlinked']

// extra props
const extProps = ['observer', 'debounce', 'wait', 'immediate']

// defaults
const defaults = {
    wait: 0,
    immediate: false,
    debounce: true,
}

module.exports = Behavior({
    definitionFilter(defFields) {
        const { relations } = defFields
        if (!isEmpty(relations)) {
            for (const key in relations) {
                const relation = relations[key] = Object.assign({}, defaults, relations[key])
                const observer = relation.debounce && typeof relation.observer === 'function' ? debounce(relation.observer, relation.wait, relation.immediate) : relation.observer

                // bind func
                methods.forEach((method) => bindFunc(relation, method, observer))

                // delete extProps
                extProps.forEach((prop) => delete relation[prop])
            }
        }
    },
})
