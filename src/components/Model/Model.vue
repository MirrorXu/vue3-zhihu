<template>
  <teleport to="body">
    <div class="bg" v-if="show">
      <div class="model">
        <div class="model-header">
          {{ title }}
        </div>
        <div class="model-content">
          <slot>{{ message }}</slot>
        </div>
        <div class="model-footer">
          <el-button type="primary" @click="click('confirm')">确定</el-button>
          <el-button type="warning" @click="click('cancel')">取消</el-button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import {defineProps, ref, defineEmits} from 'vue'

const props = defineProps({
  show: {type: Boolean, default: false},
  message: {type: String, default: ''},
  title: {type: String, default: '提示'},
})
console.log(props)

const visible = ref(props.show)

enum ConfirmType {
  confirm = 'confirm',
  cancel = 'cancel',
}

const emits = defineEmits(['confirm', 'cancel'])
const click = (commond: ConfirmType) => {
  visible.value = false
  switch (commond) {
    case  ConfirmType.confirm:
      console.log('confirm')
      emits(ConfirmType.confirm)
      break
    case ConfirmType.cancel:
      console.log('cancel')
      emits(ConfirmType.cancel)
      break
  }

}
</script>


<style lang="scss" scoped>
.bg{
  position: fixed;
  z-index: 11111;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0 , .75);
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  .model{
    width: 300px;
    height: 200px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
