<template>
  <el-container>
    <el-header>
      <GlobalHeader :user="user"></GlobalHeader>
    </el-header>
    <el-main>
      <ColumnList :list="listData"></ColumnList>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import GlobalHeader  from "@/components/GlobalHeader.vue";
import ColumnList from "@/components/ColumnList.vue";
import {Column , User} from '@/api/data.type'
const listData: Column[] = Array.from({length: 10}).map((v, i) => {
  const index = i + 1
  return {
    id:index,
    title: '专栏' + index,
    description: "专栏介绍,专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍专栏介绍",
    avatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
  }
})

const user:User = {
  isLogin:false,
  name:'',
  gender:'',
}

</script>


<style scoped lang="scss">
::v-deep(.el-header){
  border-bottom: 1px solid var(--el-color-primary);
}
</style>
