export function type(obj) {
    if (obj.constructor === Object) { return 'object' } 
    if (obj.constructor === Function) { return 'function' } 
    if (obj.constructor === Array) { return 'array' } 
    if (obj.constructor === Date) { return 'date' } 
    if (obj.constructor === RegExp) { return 'regExp' } 
    if (obj.constructor === Number) { return 'number' } 
    if (obj.constructor === String) { return 'string' } 
    if (obj.constructor === Boolean) { return 'boolean' } 
}
