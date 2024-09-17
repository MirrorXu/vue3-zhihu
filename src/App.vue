<template>
  <div id="app" v-loading="globalStore.loading">
    <router-view/>
  </div>
</template>

<script lang="ts" setup>
import {useGlobalStore} from "@/store/pinia";
const globalStore = useGlobalStore()
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
