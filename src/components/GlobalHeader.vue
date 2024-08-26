<script setup lang="ts">
import UserDropdown from '@/components/UserDropDown.vue'
import {PropType, defineProps} from "vue";
import {User} from '@/api/testData'
import SiteTitle from "@/components/Layout/SiteTitle.vue";
defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  }
})

</script>

<template>
  <div class="header">
    <slot name="site-title">
      <SiteTitle></SiteTitle>
    </slot>
    <div class="right">
      <template v-if="!user.isLogin">
        <el-button plain type="primary">登录</el-button>
        <el-button type="primary">注册</el-button>
      </template>
      <template v-else>
        <UserDropdown :user="user"></UserDropdown>
      </template>

    </div>
  </div>
</template>

<style scoped lang="scss">

.header {
  width: 100%;
  height: var(--el-header-height);
  //background-color: darkcyan;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
