<template>
  <div
      class="wrap"
      :style="{width: width ? 'width' : '100%' }"
  >
    <slot name="label">
      <div v-if="label" class="label">{{ label }}</div>
    </slot>

    <!--    v-bind="$attrs"-->
    <input
        :class="['input' , inputRef.error ? 'input-error' :'']"
        :value="inputRef.val"
        @input="handleInput"
        @blur="validate"
        v-bind="$attrs"
    >
    <span v-if="inputRef.error" class="error-tip">{{ inputRef.message }}</span>
  </div>
</template>
<script setup lang="ts">
import {PropType, reactive, defineProps, defineEmits, useAttrs} from "vue";
import {email as emailReg, password as passwordReg} from "@/helper/reg";

interface FieldType {
  val: string,
  error: boolean,
  message: string
}

type RuleType = 'required' | 'email' | 'password';
// type Trigger = '' | 'click'
interface RuleItem {
  type: RuleType | RegExp,
  message?: string,
}
const props = defineProps({
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
