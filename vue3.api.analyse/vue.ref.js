import {toReactive} from "./vue.reactive";
import {hasChanged} from './vue.help'

/**
 *
 * @param value
 * @returns {*|RefImpl}
 */
export function ref(value) {
    return createRef(value, false);
}

/**
 *
 * @param value
 * @returns {*|RefImpl}
 */
export function shallowRef(value) {
    return createRef(value, true);
}

/**
 * 是否为ref类型
 * @param r
 * @returns {boolean}
 */
export const isRef = (r) => {
    return !!(r && r.__v_isRef === true);
}


/**
 * 创建ref
 * @param rawValue
 * @param shallow
 * @returns {*|RefImpl}
 */
function createRef(rawValue, shallow) {
    if (isRef(rawValue)) return rawValue;
    return new RefImpl(rawValue, shallow);
}

class RefImpl {
    constructor(value, __v_isShallow) {
        this.__v_isShallow = __v_isShallow;
        this.dep = void 0;
        this.__v_isRef = true;
        this._rawValue = __v_isShallow ? value : toRaw(value);
        // ref会尝试将值转化成响应式对象，
        this._value = __v_isShallow ? value : toReactive(value);
    }

    get value() {
        trackRefValue(this);
        return this._value;
    }

    set value(newVal) {
        const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
        newVal = useDirectValue ? newVal : toRaw(newVal);
        if (hasChanged(newVal, this._rawValue)) {
            const oldVal = this._rawValue;
            this._rawValue = newVal;
            this._value = useDirectValue ? newVal : toReactive(newVal);
            triggerRefValue(this, 4, newVal, oldVal);
        }
    }
}


