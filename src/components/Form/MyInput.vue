<template>
  <div
      class="wrap"
      :style="{width: width ? 'width' : '100%' }"
  >
    <slot name="label">
      <div v-if="label" class="label">{{ label }}</div>
    </slot>
    <input
        v-if="tag === 'input'"
        :class="['input' , inputRef.error ? 'input-error' :'']"
        :value="inputRef.val"
        @input="handleInput"
        v-bind="$attrs"
    >
    <textarea
        v-else-if="tag === 'textarea'"
        :class="['input' , inputRef.error ? 'input-error' :'']"
        :value="inputRef.val"
        @input="handleInput"
        v-bind="$attrs"
    ></textarea>
    <span v-if="inputRef.error" class="error-tip">{{ inputRef.message }}</span>
  </div>
</template>
<script setup lang="ts">
import {PropType, reactive, defineProps, defineEmits, useAttrs, warn, onUnmounted} from "vue";
import {email as emailReg, password as passwordReg} from "@/helper/reg";
import bus from "@/components/Form/bus";

interface FieldType {
  val: string,
  error: boolean,
  message: string
}

type RuleType = 'required' | 'email' | 'password' | 'range';

// type Trigger = '' | 'click'
interface MinMax {
  message: string,
  length: number,
}

export interface RuleItem {
  type: RuleType,
  message?: string,
  min?: MinMax | number,
  max?: MinMax | number,
}
export type InputType = 'input' | 'textarea'
const props = defineProps({
  tag:{
    type: String as  PropType<InputType>,
    default:'input',
  },
  width: {
    type: Number,
    required: false,
  },
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  rules: {
    type: Array as PropType<Array<RuleItem>> | undefined,
  },
  showError: {
    type: Boolean,
    default: true
  },
  // placeholder: String // 将组件的$attrs绑定到input
})
const inputRef = reactive<FieldType>({
  val: props.modelValue,
  error: false,
  message: ''
})
const emit = defineEmits(['update:modelValue'])

function handleInput(e: Event) {
  const currentValue = (e.target as HTMLInputElement).value
  inputRef.val = currentValue
  emit('update:modelValue', currentValue)
}

function validateByRange(rule: RuleItem, ref: FieldType) {
  const {min, max} = rule
  const val: string = ref.val
  let passed = true
  if (typeof min !== 'number' && typeof max === 'number' && typeof min !== 'object' && typeof max !== 'object') {
    warn('range validation failed', rule)
  }
  if (typeof min === "number") {
    ref.message = rule.message || ''
    passed = val.length >= min
    if (!passed) return passed
  } else if (min && min.length) {
    ref.message = min.message || rule.message || ''
    passed = val.length >= min.length
    if (!passed) return passed
  }
  if (typeof max === 'number') {
    ref.message = rule.message || ''
    passed = val.length <= max
    if (!passed) return passed
  } else if (max && max.length) {
    ref.message = max.message || rule.message || ''
    passed = val.length <= max.length
    if (!passed) return passed
  }
  return passed
}

function validate() {
  let allPassed = true
  if (props.rules && props.rules.length > 0) {
    allPassed = props.rules.every(rule => {
      let passed = true
      inputRef.message = rule.message || ''
      if (rule.type instanceof RegExp) {
        passed = rule.type.test(inputRef.val)
      } else {
        switch (rule.type) {
          case "required":
            passed = inputRef.val.trim() !== ''
            break
          case 'email':
            passed = emailReg.test(inputRef.val)
            break
          case "password":
            passed = passwordReg.test(inputRef.val)
            break
          case "range":
            passed = validateByRange(rule, inputRef)
            break
        }
      }

      return passed
    })
  }
  inputRef.error = !allPassed
  if (allPassed) {
    inputRef.message = ''
  }
  return allPassed
}

function reset(){
  inputRef.val = ''
  inputRef.error = false
  inputRef.message = ''
}
bus.emit('validator', validate)
bus.emit('resetor', reset)
onUnmounted(() => {
  bus.off('validator', validate)
  bus.off('resetor', reset)
})
const attrs = useAttrs()
console.log('attrs:', attrs)

</script>

<style scoped lang="scss">
.wrap {
  margin-top: 10px;
  margin-top: 10px;
  box-sizing: border-box;
  //border: 1px solid darkcyan;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .input {
    &-error {
      border: 1px solid red;
    }
  }

  .error-tip {
    font-size: 12px;
    font-weight: 200;
    color: red;
  }
}
</style>
