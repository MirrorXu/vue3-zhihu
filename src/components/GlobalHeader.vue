<script setup lang="ts">
import UserDropdown from '@/components/UserDropDown.vue'
import {PropType, defineProps} from "vue";
import {User} from '@/api/data.type'
import {ChromeFilled} from '@element-plus/icons-vue'
defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  }
})

</script>

<template>
  <div class="header">
    <div class="left">
      <el-icon size="26px" color="#409eff" style="margin-right: 8px"><ChromeFilled /></el-icon>
      <h1 class="title">知乎</h1>
    </div>
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

  .left {
    display: flex;
    align-items: center;

    .title {
      color: var(--jjext-color-secondary-app) ;
    }
  }
}
</style>
