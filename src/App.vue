<template>
  <div id="app" v-loading="loading">
    <router-view/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  setup(props, context) {
    const isOpen = ref(true)
    // const refObj = ref({name: 'Mirror'})
    // const shallowObject = shallowRef({name: 'Mirror'})
    // const reactiveObj = reactive({name: 'reactive'})
    console.log(props, context)
    const toggleModel = () => {
      isOpen.value = !isOpen.value;
    }
    const store = useStore()
    const loading = computed(() => store.state.loading)
    console.log(loading)
    watch(loading, (newVal, oldVal) => {
      console.log('loading:', newVal, oldVal)
    })
    return {
      isOpen,
      toggleModel,
      loading
    }
  }
})
</script>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
}

#app {
  min-height: 100vh;
  //background-color: darkgoldenrod;
}
</style>
