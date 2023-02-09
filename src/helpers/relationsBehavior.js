import isEmpty from './isEmpty'
import debounce from './debounce'
import throttle from './throttle'

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
            this.useThrottleFn = function (fn, wait = 0, options) {
                const throttled = throttle(fn.bind(this), wait, options)
                this._throttledFns.push(throttled)
                return {
                    run: throttled,
                    cancel: throttled.cancel,
                    flush: throttled.flush,
                }
            }
            this._throttledFns = []
            this.callDebounceFn = function(fn, wait = 0, options) {
                return (this._debounced = this._debounced || debounce(fn.bind(this), wait, options)).call(this)
            }
            this._debounced = null
        },
        detached() {
            if (this._debounced && this._debounced.cancel) {
                this._debounced.cancel()
            }
            if (this._throttledFns.length > 0) {
                this._throttledFns.forEach((throttled) => {
                    throttled.cancel()
                })
                this._throttledFns = []
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
        })
    },
})
