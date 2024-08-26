<template>
 <div id="app">
   <router-view/>
 </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  setup(props, context) {
    const isOpen = ref(true)
    // const refObj = ref({name: 'Mirror'})
    // const shallowObject = shallowRef({name: 'Mirror'})
    // const reactiveObj = reactive({name: 'reactive'})
    console.log(props , context)
    const toggleModel = () => {
      isOpen.value = !isOpen.value;
    }
    return {
      isOpen,
      toggleModel
    }
  }
})
</script>

<style lang="scss">
html , body{
  padding: 0;
  margin: 0;
}
#app{
  min-height: 100vh;
  //background-color: darkgoldenrod;
}
</style>
