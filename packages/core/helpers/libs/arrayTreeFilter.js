/**
 * https://github.com/afc163/array-tree-filter
 */
function arrayTreeFilter(data, filterFn, options) {
    options = options || {}
    options.childrenKeyName = options.childrenKeyName || 'children'
    let children = data || []
    const result = []
    let level = 0
    do {
        const foundItem = children.filter(function(item) {
            return filterFn(item, level)
        })[0]
        if (!foundItem) {
            break
        }
        result.push(foundItem)
        children = foundItem[options.childrenKeyName] || []
        level += 1
    } while (children.length > 0)
    return result
}

export default arrayTreeFilter