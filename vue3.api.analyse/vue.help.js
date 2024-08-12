const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => toTypeString(value).slice(8, -1);
export const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val, key) => hasOwnProperty.call(val, key);
export const isArray = Array.isArray;
export const isMap = (val) => toTypeString(val) === "[object Map]";
export const isSet = (val) => toTypeString(val) === "[object Set]";
export const isDate = (val) => toTypeString(val) === "[object Date]";
export const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
export const isFunction = (val) => typeof val === "function";
export const isString = (val) => typeof val === "string";
export const isSymbol = (val) => typeof val === "symbol";
export const isObject = (val) => val !== null && typeof val === "object";
export const isPromise = (val) => (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);

export const isPlainObject = (val) => toTypeString(val) === "[object Object]";
export const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;

// Object.is() https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
export const hasChanged = (value, oldValue) => !Object.is(value, oldValue);

export function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
}

function targetTypeMap(rawType) {
    switch (rawType) {
        case "Object":
        case "Array":
            return 1 /* COMMON */;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2 /* COLLECTION */;
        default:
            return 0 /* INVALID */;
    }
}
export function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap(toRawType(value));
}
