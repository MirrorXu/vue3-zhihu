<template>
  <router-view/>
</template>

<script lang="ts">
import {defineComponent, ref, shallowRef, reactive} from "vue";

export default defineComponent({
  setup(props, context) {
    const isOpen = ref(true)
    const refObj = ref({name: 'Mirror'})
    const shallowObject = shallowRef({name: 'Mirror'})
    const reactiveObj = reactive({name: 'reactive'})

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
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
