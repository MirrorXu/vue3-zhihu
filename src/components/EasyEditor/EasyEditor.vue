<template>
  <div class="editor-container">
    <textarea ref="editorRef" class="textarea"></textarea>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, defineProps, defineEmits, onUnmounted, PropType , defineExpose} from "vue";
import EasyMDE, {Options} from 'easymde'

// 显式声明接受的 props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  options: {
    type: Object as PropType<Options>,
    default: () => ({})
  }
})
// 显示的声明事件组件内的事件
const emit = defineEmits(['update:modelValue', 'change' , 'blur'])
// 组件实例
const editorRef = ref<HTMLTextAreaElement | null>(null)
// 编辑器实例
let editor: EasyMDE | null = null;

// 添加组件挂载后的狗子
onMounted(() => {
  if (editorRef.value) {
    const editorConfig: Options = {
      ...(props.options || {}),
      element: editorRef.value as HTMLElement,
      initialValue: props.modelValue,
    }

    editor = new EasyMDE(editorConfig)

    editor.codemirror.on('change', () => {
      if (editor) {
        const currentValue = editor.value()
        emit('update:modelValue', currentValue)
        emit('change', currentValue)
      }
    })

    editor.codemirror.on('blur', () => {
      if (editor) {
        emit('blur')
      }
    })
  }
})
onUnmounted(() => {
  editor && editor.cleanup()
  editor = null
})

defineExpose({
  getEditor(){
    return editor
  },
  clear(){
    if(editor){
      editor.value('')
    }
  },
  append(str:string){
    if(editor){
     const oldValue =  editor.value()
      editor.value(oldValue + str)
    }
  }
})
</script>


<style scoped lang="scss">
.editor-container {
  display: flex;
  justify-content: stretch;
  width: 100%;
  //border: 1px solid deeppink;
  ::v-deep .EasyMDEContainer{
    width: 100% !important;
  }
}
</style>
