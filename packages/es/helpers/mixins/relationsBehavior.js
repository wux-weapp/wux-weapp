import { debounce } from '../shared/debounce'
import { throttle } from '../shared/throttle'
import { isEmpty } from '../shared/isEmpty'

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

const isNamePath = (name) => /^..\//.test(name)

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
            getRelations: function(types = ['parent', 'child', 'ancestor', 'descendant']) {
                if (!isEmpty(relations)) {
                    return Object.keys(relations)
                        .map((key) => {
                            if (relations[key] && types.includes(relations[key].type)) {
                                return key
                            }
                            return null
                        })
                        .filter((name) => !!name)
                        .map((name) => this.getRelationsByName(name)[0])
                        .filter((node) => !!node)
                }
                return []
            },
            getRelationsByName(name) {
                return this.getRelationNodes(isNamePath(name) ? name : `../${name}/index`)
            },
            getRelationsByType(type) {
                return this.getRelations([type])
            },
            querySelector(selector) {
                return this.selectComponent(selector)
            },
            querySelectorAll(selector) {
                return this.selectAllComponents(selector)
            },
        })
    },
})
