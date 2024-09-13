<template>
  <div class="editor-container">
    <textarea ref="editorRef" class="textarea"></textarea>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, defineProps, defineEmits, onUnmounted, PropType , defineExpose} from "vue";
import EasyMDE, {Options} from 'easymde'

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
const emit = defineEmits(['update:modelValue', 'change' , 'blur'])
const editorRef = ref<HTMLTextAreaElement | null>(null)
let editor: EasyMDE | null = null;
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
        console.log('editor change:', editor.value())
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
  width: 100%;
  border: 1px solid deeppink;

  .textarea {
    display: block;
    width: 100% !important;
    border: 1px solid red;
  }

}
</style>
