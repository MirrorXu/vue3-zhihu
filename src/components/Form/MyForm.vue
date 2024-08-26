<template>
  <div>
    <slot></slot>
    <div class="btns">
      <slot name="submit">
        <el-button type="primary" @click="handleSubmit">submit</el-button>
      </slot>
      <slot name="reset">
        <el-button type="warning" @click="reset">reset</el-button>
      </slot>
    </div>
  </div>
</template>
<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {defineEmits, defineProps, defineExpose, onUnmounted} from 'vue'
import bus from './bus'

// const props = defineProps({
//   modelValue
// })

interface ValidateFn {
  (): boolean
}

let validators: ValidateFn[] = []
let restors = []
const collectValidators = (fn) => {
  validators.push(fn)
}
const collectResetor = (restor) => {
  restors.push(restor)
}
bus.on('validator', collectValidators)
bus.on('resetor', collectResetor)
onUnmounted(() => {
  bus.off('validator', collectValidators)
  bus.off('resetor', collectResetor)
})

function validate() {
  let isValid = true;
  if (Array.isArray(validators)) {
    isValid = validators.map(validateFn => validateFn()).every(ret => ret)
  }
  return isValid
}

function reset() {
  restors.forEach(restor => restor())
}

const emits = defineEmits(['submit'])
const handleSubmit = function (e: MouseEvent) {
  const isValid = validate()
  emits('submit', {
    success: isValid,
  })
}


defineExpose({
  validate() {
    return new Promise((resolve ,reject)=> {
      validate() ? resolve(true) : reject(false)
    })
  },
  submit: () => {
    return new Promise((resolve) => {
      const isValid = validate()
      resolve({success: isValid})
    })
  },
  reset(){
    reset()
  }
})

</script>


<style scoped lang="scss">

</style>
