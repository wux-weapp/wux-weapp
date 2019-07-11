const defaultEvents = {
    onChange() {},
}

export default function eventsMixin(params = { defaultEvents }) {
    return Behavior({
        lifetimes: {
            created () {
                this._oriTriggerEvent = this.triggerEvent
                this.triggerEvent = this._triggerEvent
            },
        },
        properties: {
            events: {
                type: Object,
                value: defaultEvents,
            },
        },
        data: {
            inputEvents: defaultEvents,
        },
        definitionFilter(defFields) {
            // set default data
            Object.assign(defFields.data = (defFields.data || {}), {
                inputEvents: Object.assign({}, defaultEvents, defFields.inputEvents),
            })

            // set default methods
            Object.assign(defFields.methods = (defFields.methods || {}), {
                _triggerEvent(name, params, runCallbacks = true, option) {
                    const { inputEvents } = this.data
                    const method = `on${name[0].toUpperCase()}${name.slice(1)}`
                    const func = inputEvents[method]

                    if (runCallbacks && typeof func === 'function') {
                        func.call(this, params)
                    }

                    this._oriTriggerEvent(name, params, option)
                },
            })

            // set default observers
            Object.assign(defFields.observers = (defFields.observers || {}), {
                events(newVal) {
                    this.setData({
                        inputEvents: Object.assign({}, defaultEvents, this.data.inputEvents, newVal),
                    })
                },
            })
        },
    })
}
