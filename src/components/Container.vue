<script setup lang="ts">

</script>

<template>
<div class="container">
  <div class="center">
      <slot></slot>
  </div>
</div>
</template>
<style scoped lang="scss">
  .container {
    box-sizing: border-box;
    width: 100%;
    //background-color: #ededed;
    padding-bottom: 3rem;
    padding-top: 3rem;
    overflow-x: hidden;
    .center{
      box-sizing: border-box;
      margin: 0 auto;
      width: 80%;
      background-color: #fefefe;
      //box-shadow:
      //    inset 0 0em 0.3em  rgba(0, 0, 0, 0.1),
      //    0 0 0 1px rgba(0, 0, 0, 0.1),
      //    0 0.1rem 0.2rem rgba(0, 0, 0, 0.1);
      padding: 2rem;
      min-width: 800px;
      max-width: 1600px;
      min-height: 100%;
    }
  }
</style>
