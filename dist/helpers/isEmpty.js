/**
 * Checks if a value is empty.
 */
function isEmpty (value) {
    if (Array.isArray(value)) {
        return value.length === 0
    } else if (typeof value === 'object') {
        if (value) {
            for (const _ in value) {
                return false
            }
        }
        return true
    } else {
        return !value
    }
}

module.exports = isEmpty
