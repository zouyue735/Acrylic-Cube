const type = Symbol('type')

let unwrapProp = '_val'

function isInternalProp(prop) {
    return prop == unwrapProp
}

function isPrimitiveWrapper(obj) {
    return PrimitiveWrapper.prototype.isPrototypeOf(obj)
}

function defaultSplit(n) {
    
}

function defaultCombine() {

}

class PrimitiveWrapper {
    constructor(primitive) {
        this.primitive = primitive
    }
}

exports.unwrapProp = unwrapProp

exports.PrimitiveWrapper = PrimitiveWrapper

exports.isInternalProp = isInternalProp
exports.isPrimitiveWrapper = isPrimitiveWrapper