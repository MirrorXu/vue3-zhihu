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
        :class="['input' , fieldInfo.error ? 'input-error' :'']"
        :value="modelValue"
        @input="handleInput"
        v-bind="$attrs"
    >
    <textarea
        v-else-if="tag === 'textarea'"
        :class="['input' , fieldInfo.error ? 'input-error' :'']"
        :value="modelValue"
        @input="handleInput"
        v-bind="$attrs"
    ></textarea>
    <Editor
        v-else-if="tag === 'editor'"
        :class="[ fieldInfo.error ? 'input-error' :'']"
        :modelValue="modelValue"
        v-bind="$attrs"
        @update:modelValue="handleEditorUpdate"
        :options="editorOptions"
    ></Editor>
    <span v-if="fieldInfo.error" class="error-tip">{{ fieldInfo.message }}</span>
  </div>
</template>
<script setup lang="ts">
import Editor from '@/components/EasyEditor/EasyEditor.vue'
import {Options} from "easymde";
import {PropType, reactive, defineProps, defineEmits, useAttrs, warn, onUnmounted} from "vue";
import {email as emailReg, password as passwordReg} from "@/helper/reg";
import bus from "@/components/Form/bus";


interface FieldInfo {
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
  type: RuleType | RegExp,
  message?: string,
  min?: MinMax | number,
  max?: MinMax | number,
}

export type InputType = 'input' | 'textarea' | 'editor'
const props = defineProps({
  tag: {
    type: String as PropType<InputType>,
    default: 'input',
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
  editorOptions: {
    type: Object as PropType<Options>,
  }
  // placeholder: String // 将组件的$attrs绑定到input
})
const fieldInfo = reactive<FieldInfo>({
  error: false,
  message: ''
})
const emit = defineEmits(['update:modelValue'])

function handleInput(e: Event) {
  const currentValue = (e.target as HTMLInputElement).value
  emit('update:modelValue', currentValue)
}

const handleEditorUpdate = (value: string) => {
  emit('update:modelValue', value)
}

function validateByRange(rule: RuleItem, ref: FieldInfo) {
  const {min, max} = rule
  const val: string = props.modelValue
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
      fieldInfo.message = rule.message || ''
      if (rule.type instanceof RegExp) {
        passed = rule.type.test(props.modelValue)
      } else {
        switch (rule.type) {
          case "required":
            passed = props.modelValue.trim() !== ''
            break
          case 'email':
            passed = emailReg.test(props.modelValue)
            break
          case "password":
            passed = passwordReg.test(props.modelValue)
            break
          case "range":
            passed = validateByRange(rule, fieldInfo)
            break
        }
      }

      return passed
    })
  }
  fieldInfo.error = !allPassed
  if (allPassed) {
    fieldInfo.message = ''
  }
  return allPassed
}

function reset() {
  fieldInfo.error = false
  fieldInfo.message = ''
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
