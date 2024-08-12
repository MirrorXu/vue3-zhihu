<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: {
    // 'close':(payload:any)=>{
    //   debugger
    //   return payload
    // }
  },
  setup(props, context) {
    const handleClose = (e:MouseEvent) => {
      context.emit('close', e);
    }
    // context.emit('close-model', {type: 'hello'})
    return {
      handleClose
    }
  }
})
</script>

<template>
  <teleport to="body">
    <div v-if="isOpen" class="model">
      <div class="model-content">
<!--        <div class="header-wrap">-->
<!--          <slot name="model-header">-->
<!--            <h2>xxx</h2>-->
<!--          </slot>-->
<!--        </div>-->
        <div class="content-wrap">
          <slot>default slot</slot>
        </div>
        <div class="footer-wrap">
          <slot name="model-footer">
            <button @click="handleClose">关闭</button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.model{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  &-content{
    width: 200px;
    min-height: 200px;
    border-radius: 5px;
    padding: 5px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .content-wrap{
      flex: 1;
    }
    .footer-wrap{

    }
  }
}
</style>
