const {empty} = require('./commons.js')

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
        return Object.getOwnPropertyDescriptor(target, prop)
    },
    defineProperty: function(target, property, descriptor) {
        Object.defineProperty(target, prototype, descriptor)
        return true
    },
    has: function(target, prop) {
        return prop in target
    },
    get: function(target, property, receiver) {
        const val = target[property]
        switch (typeof val) {
            case 'function':
            case 'object':
            case 'undefined':
                return option(val)
            default:
                return val
        }
    },
    set: function(target, property, value, receiver) {
        target[property] = value
        return true
    },
    deleteProperty: function(target, property) {
        delete target[property]
        return true
    },
    ownKeys: function(target) {
        return Object.getOwnPropertyNames(target)
    },
    apply: function(target, thisArg, argumentsList) {
        const val = target.apply(thisArg, argumentsList)
        switch (typeof val) {
            case 'function':
            case 'object':
            case 'undefined':
                return option(val)
            default:
                return val
        }
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
    return new Proxy(value, handler)
}

module.exports = option