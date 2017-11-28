function and(a, b) {
    return a && b
}

function defaultSplit(n) {
    
}

function defaultCombine() {

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

const empty = {}

exports.and = and
exports.isObject = isObject

exports.empty = empty