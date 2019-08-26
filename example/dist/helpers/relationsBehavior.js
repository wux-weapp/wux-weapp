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
const extProps = ['observer']

export default Behavior({
    lifetimes: {
        created() {
            this._debounce = null
        },
        detached() {
            if (this._debounce && this._debounce.cancel) {
                this._debounce.cancel()
            }
        },
    },
    definitionFilter(defFields) {
        const { relations } = defFields

        if (!isEmpty(relations)) {
            for (const key in relations) {
                const relation = relations[key]

                // bind func
                methods.forEach((method) => bindFunc(relation, method, relation.observer))

                // delete extProps
                extProps.forEach((prop) => delete relation[prop])
            }
        }

        Object.assign(defFields.methods = (defFields.methods || {}), {
            getRelationsName: function(types = ['parent', 'child', 'ancestor', 'descendant']) {
                return Object.keys(relations || {}).map((key) => {
                    if (relations[key] && types.includes(relations[key].type)) {
                        return key
                    }
                    return null
                }).filter((v) => !!v)
            },
            debounce: function(func, wait = 0, immediate = false) {
                return (this._debounce = this._debounce || debounce(func.bind(this), wait, immediate)).call(this)
            },
        })
    },
})
