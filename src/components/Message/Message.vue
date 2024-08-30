<template>
  <teleport to="#message">
    <div v-if="visible" class="message" :class="[(`message-${type}`)]">
      {{message}}
<!--      <el-icon @click.stop="handleClose"><Close /></el-icon>-->
      <span @click="handleClose">x</span>
    </div>
  </teleport>

</template>
<script setup lang="ts">
import {defineProps, PropType, ref, defineEmits, onMounted, onUnmounted} from 'vue'
import {MessageType} from "@/components/Message/createMessage";

const div = document.createElement('div')
div.id = 'message'
document.body.appendChild(div)
onUnmounted(()=>{
  document.body.removeChild(div)
})
const visible = ref(true)

const props = defineProps({
  message: String,
  type: {
    type: String as PropType<MessageType>,
    default: 'default'
  },
})
const emit = defineEmits(['close'])
function handleClose() {
  visible.value = false
  emit('close')
}


</script>


<style scoped lang="scss">
.message{
  position: fixed;
  height: 30px;
  width: 200px;
  top:10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid darkblue;
  background-color: #d0fae7;
  &-default{
    background-color: #19beef;
  }
  &-success{
    background-color: #18d594;
  }
  &-error{
    background-color: rgba(220, 33, 61, 0.75);
  }
  &-warning{
    background-color: #e37d17;
  }

}

</style>
