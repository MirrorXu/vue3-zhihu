<template>
  <dvi>
    <h1>测试</h1>
    <ColumnList :list="listData"></ColumnList>
  </dvi>
</template>
<script setup lang="ts">
import ColumnList from "@/components/ColumnList.vue";
import {Column} from '@/api/data.type'

const listData: Column[] = Array.from({length: 10}).map((v, i) => {
  const index = i + 1
  return {
    id:index,
    title: '专栏' + index,
    description: "专栏介绍,专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍",
    avatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
  }
})

</script>


<style scoped lang="scss">

</style>
