import {isObject, getTargetType, isReadonly} from "./vue.help";
import {MutableReactiveHandler} from "./vue.reactive";
import {reactiveMap} from './vue.maps'

function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
        if (key === "__v_isReactive") {
            return !isReadonly2;
        } else if (key === "__v_isReadonly") {
            return isReadonly2;
        } else if (key === "__v_raw") {
            return target;
        }
        return Reflect.get((0, _vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
}

const mutableHandlers = new MutableReactiveHandler()
const mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};

/**
 *
 * @param target
 * @returns {*}
 */
export function reactive(target) {
    if (isReadonly(target)) {
        return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}


export const toReactive = (value) => isObject(value) ? reactive(value) : value;

/**
 * 创建响应式对象
 * @param target
 * @param isReadonly2
 * @param baseHandlers
 * @param collectionHandlers
 * @param proxyMap
 * @returns {*|object}
 */
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
        if (!!(process.env.NODE_ENV !== "production")) {
            warn(`value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(target)}`);
        }
        return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
        return target;
    }

    const existingProxy = proxyMap.get(target);
    if (existingProxy) return existingProxy;

    const targetType = getTargetType(target);
    if (targetType === 0 /* INVALID */) {
        return target;
    }
    const handlers = targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
    const proxy = new Proxy(target, handlers);
    proxyMap.set(target, proxy);
    return proxy;
}
