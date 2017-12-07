function and(a, b) {
    return a && b
}

function isObject(val) {
    switch (typeof val) {
        case 'function':
        case 'object':
        case 'undefined':
            return true
        default:
            return false
    }
}

function isArray(val) {
    return isObject(val) && Array.prototype.isPrototypeOf(val)
}

function isNumber(val) {
    return (typeof val) == 'number'
}

const empty = {}

exports.and = and
exports.isObject = isObject
exports.isArray = isArray
exports.isNumber = isNumber

exports.empty = empty