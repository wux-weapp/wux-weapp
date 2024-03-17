export function isObject(value) {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}

export function eq(value, other) {
    return value === other || (value !== value && other !== other)
}

function baseAssignValue(object, key, value) {
    if (key === '__proto__') {
        Object.defineProperty(object, key, {
            'configurable': true,
            'enumerable': true,
            'value': value,
            'writable': true,
        })
    } else {
        object[key] = value
    }
}

/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty

function assignValue(object, key, value) {
    const objValue = object[key]

    if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
        if (value !== 0 || (1 / value) === (1 / objValue)) {
            baseAssignValue(object, key, value)
        }
    } else if (value === undefined && !(key in object)) {
        baseAssignValue(object, key, value)
    }
}

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0

function toKey(value) {
    if (typeof value === 'string') {
        return value
    }
    const result = `${value}`
    return (result === '0' && (1 / value) === -INFINITY) ? '-0' : result
}

/** Used to match property names within property paths. */
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
const reIsPlainProp = /^\w*$/

function isKey(value, object) {
    if (Array.isArray(value)) {
        return false
    }
    const type = typeof value
    if (type === 'number' || type === 'boolean' || value == null) {
        return true
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object))
}

const charCodeOfDot = '.'.charCodeAt(0)
const reEscapeChar = /\\(\\)?/g
const rePropName = RegExp(
    // Match anything that isn't a dot or bracket.
    '[^.[\\]]+' + '|' +
  // Or match property names within brackets.
  '\\[(?:' +
    // Match a non-string expression.
    '([^"\'][^[]*)' + '|' +
    // Or match strings (supports escaping characters).
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
  ')\\]'+ '|' +
  // Or match "" as the space between consecutive dots or empty brackets.
  '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
    , 'g')

function stringToPath(string) {
    const result = []
    if (string.charCodeAt(0) === charCodeOfDot) {
        result.push('')
    }
    string.replace(rePropName, (match, expression, quote, subString) => {
        let key = match
        if (quote) {
            key = subString.replace(reEscapeChar, '$1')
        }
        else if (expression) {
            key = expression.trim()
        }
        result.push(key)
    })
    return result
}

function castPath(value, object) {
    if (Array.isArray(value)) {
        return value
    }
    return isKey(value, object) ? [value] : stringToPath(value)
}

/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/** Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/

function isIndex(value, length) {
    const type = typeof value
    length = length == null ? MAX_SAFE_INTEGER : length

    return !!length &&
    (type === 'number' ||
      (type !== 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 === 0 && value < length)
}

function baseSet(object, path, value, customizer) {
    if (!isObject(object)) {
        return object
    }
    path = castPath(path, object)

    const length = path.length
    const lastIndex = length - 1

    let index = -1
    let nested = object

    while (nested != null && ++index < length) {
        const key = toKey(path[index])
        let newValue = value

        if (index !== lastIndex) {
            const objValue = nested[key]
            newValue = customizer ? customizer(objValue, key, nested) : undefined
            if (newValue === undefined) {
                newValue = isObject(objValue)
                    ? objValue
                    : (isIndex(path[index + 1]) ? [] : {})
            }
        }
        assignValue(nested, key, newValue)
        nested = nested[key]
    }
    return object
}

export function set(object, path, value) {
    return object == null ? object : baseSet(object, path, value)
}

function baseGet(object, path) {
    path = castPath(path, object)

    let index = 0
    const length = path.length

    while (object != null && index < length) {
        object = object[toKey(path[index++])]
    }
    return (index && index === length) ? object : undefined
}

export function get(object, path, defaultValue) {
    const result = object == null ? undefined : baseGet(object, path)
    return result === undefined ? defaultValue : result
}
