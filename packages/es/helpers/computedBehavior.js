import isEmpty from './isEmpty'
import shallowEqual from './shallowEqual'

const ALL_DATA_KEY = '**'

const trim = (str = '') => str.replace(/\s/g, '')

export default Behavior({
    lifetimes: {
        attached() {
            this.initComputed()
        },
    },
    definitionFilter(defFields) {
        const { computed = {} } = defFields
        const observers = Object.keys(computed).reduce((acc, name) => {
            const [field, getter] = Array.isArray(computed[name]) ? computed[name] : [ALL_DATA_KEY, computed[name]]
            return {
                ...acc,
                [field]: function(...args) {
                    if (typeof getter === 'function') {
                        const newValue = getter.apply(this, args)
                        const oldValue = this.data[name]
                        if (!isEmpty(newValue) && !shallowEqual(newValue, oldValue)) {
                            this.setData({ [name]: newValue })
                        }
                    }
                },
            }
        }, {})

        Object.assign(defFields.observers = (defFields.observers || {}), observers)
        Object.assign(defFields.methods = (defFields.methods || {}), {
            initComputed: function(data = {}, isForce = false) {
                if (!this.runInitComputed || isForce) {
                    this.runInitComputed = false
                    const context = this
                    const result = { ...this.data, ...data }
                    Object.keys(observers).forEach((key) => {
                        const values = trim(key).split(',').reduce((acc, name) => ([...acc, result[name]]), [])
                        observers[key].apply(context, values)
                    })
                    this.runInitComputed = true
                }
            },
        })
    },
})
