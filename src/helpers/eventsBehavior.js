const defaultEvents = {
    onChange() {},
}

export default Behavior({
    properties: {
        events: {
            type: Object,
            value: defaultEvents,
            observer(newVal) {
                this.setData({ inputEvents: Object.assign({}, this.data.inputEvents, newVal) })
            },
        },
    },
    data: {
        inputEvents: defaultEvents,
    },
    methods: {
        emitEvent(name, params, runCallbacks = true) {
            const { inputEvents } = this.data
            const method = `on${name[0].toUpperCase()}${name.slice(1)}`
            const func = inputEvents[method]

            if (runCallbacks && typeof func === 'function') {
                func.call(this, params)
            }

            this.triggerEvent(name, params)
        },
    },
    definitionFilter(defFields) {
        const { inputEvents } = defFields.data || {}
        defFields.data.inputEvents = Object.assign({}, defaultEvents, defFields.defaultEvents, inputEvents)
    },
})
