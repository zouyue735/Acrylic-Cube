const {empty, isObject, PrimitiveWrapper} = require('./commons.js')
const cube = require('./cube.js')

const handler = {
    getPrototypeOf: function(target) {
        return Object.getPrototypeOf(target)
    },
    setPrototypeOf: function(target, prototype) {
        Object.setPrototypeOf(target, prototype)
        return true
    },
    isExtensible: function(target) {
        return Object.isExtensible(target)
    },
    preventExtensions: function(target) {
        return Object.preventExtensions(target)
    },
    getOwnPropertyDescriptor: function(target, prop) {
        if (cube.isInternalProp(property)) {
            return undefined
        }

        return Object.getOwnPropertyDescriptor(target, prop)
    },
    defineProperty: function(target, property, descriptor) {
        if (cube.isInternalProp(property)) {
            return false
        }

        Object.defineProperty(target, prototype, descriptor)
        return true
    },
    has: function(target, prop) {
        if (cube.isInternalProp(prop)) {
            return false
        }

        return prop in target
    },
    get: function(target, property, receiver) {
        if (property == cube.unwrapProp) {
            if (cube.isPrimitiveWrapper(target)) {
                return target.primitive
            }
            return target
        }

        return option(target[property])
    },
    set: function(target, property, value, receiver) {
        if (cube.isInternalProp(property)) {
            receiver[prop] = value
            return true
        }

        target[property] = value
        return true
    },
    deleteProperty: function(target, property) {
        if (cube.isInternalProp(property)) {
            return false
        }

        delete target[property]
        return true
    },
    ownKeys: function(target) {
        return Object.getOwnPropertyNames(target)
    },
    apply: function(target, thisArg, argumentsList) {
        return option(target.apply(thisArg, argumentsList))
    },
    construct: function(target, argumentsList, newTarget) {
        const ctor = Function.prototype.bind.apply(target, [empty].concat(argumentsList))
        return option(new ctor())
    }
}

const emptyHandler = {
    getPrototypeOf: function(target) {
        return null
    },
    setPrototypeOf: function(target, prototype) {
        return false
    },
    isExtensible: function(target) {
        return false
    },
    preventExtensions: function(target) {
        return false
    },
    getOwnPropertyDescriptor: function(target, prop) {
        return undefined
    },
    defineProperty: function(target, property, descriptor) {
        return false
    },
    has: function(target, prop) {
        return false
    },
    get: function(target, property, receiver) {
        if (property == cube.unwrapProp) {
            return null
        }

        return emptyProxy
    },
    set: function(target, property, value, receiver) {
        return false
    },
    deleteProperty: function(target, property) {
        return false
    },
    ownKeys: function(target) {
        return empty
    },
    apply: function(target, thisArg, argumentsList) {
        return emptyProxy
    },
    construct: function(target, argumentsList, newTarget) {
        return emptyProxy
    }
}

const emptyProxy = new Proxy(empty, emptyHandler)

function option(value) {
    if (value == null || value == undefined) {
        return emptyProxy
    }

    if (!isObject(value)) {
        value = new PrimitiveWrapper(value)
    }

    let op = new Proxy(value, handler)
    op[cube.unwrapProp] = value
    return op
}

module.exports = option