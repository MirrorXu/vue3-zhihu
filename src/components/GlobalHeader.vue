<script setup lang="ts">
import {PropType , defineProps} from "vue";
import {User} from '@/api/data.type'

defineProps({
  user: {
    type:Object as PropType<User>,
    required:true,
  }
})

</script>

<template>
<div class="header">
  <div class="left">
    <img src="" alt="" class="logo">
    <h1 class="title">知乎</h1>
  </div>
  <div class="right">
    <template v-if="!user.isLogin">
      <el-button  plain type="primary">登录</el-button>
      <el-button  type="primary">注册</el-button>
    </template>
  </div>
</div>
</template>

<style scoped lang="scss">

.header{
  width: 100%;
  height: var(--el-header-height);
  //background-color: darkcyan;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left{
    display: flex;
    align-items: center;
    .h1{
      color: var(--el-color-primary);
    }
  }
}
</style>
