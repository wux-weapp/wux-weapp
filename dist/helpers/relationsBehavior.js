import isEmpty from './isEmpty'

/**
 * 对象上绑定新的方法
 */
function bindFnToObject(obj, method, observer) {
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

module.exports = Behavior({
    definitionFilter(defFields) {
        const { relations } = defFields
        if (!isEmpty(relations)) {
            for (const key in relations) {
                const { observer } = relations[key]
                const methods = ['linked', 'linkChanged', 'unlinked']

                // bind func
                methods.forEach((method) => {
                    bindFnToObject(relations[key], method, observer)
                })

                // delete observer
                delete relations[key].observer
            }
        }
    },
})