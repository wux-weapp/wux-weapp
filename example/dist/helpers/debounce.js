export default function debounce(func, wait, immediate) {
    let timeout,
        args,
        context,
        timestamp,
        result

    function later() {
        const last = +(new Date()) - timestamp
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = undefined
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) {
                    context = undefined
                    args = undefined
                }
            }
        }
    }

    function debounced() {
        context = this
        args = arguments
        timestamp = +(new Date())

        const callNow = immediate && !timeout
        if (!timeout) {
            timeout = setTimeout(later, wait)
        }

        if (callNow) {
            result = func.apply(context, args)
            context = undefined
            args = undefined
        }

        return result
    }

    function cancel() {
        if (timeout !== undefined) {
            clearTimeout(timeout)
            timeout = undefined
        }

        context = undefined
        args = undefined
    }

    debounced.cancel = cancel

    return debounced
}