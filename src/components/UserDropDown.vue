<script setup lang="ts">

import {PropType  , defineProps} from "vue";
import {User} from '@/api/data.type'

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})

function handleCommand(...args: any[]) {
  console.log('handleCommand:',args)
}

function handleLeftClick(...args: any[]) {
  console.log('handleLeftClick:',args)
}
function handleVisibleChange(...args: any[]) {
  console.log('handleVisibleChange:',args)
}
</script>

<template>
  <div>

  </div>
  <el-dropdown
      size="large"
      placement="bottom-end"
      trigger="click"
      split-button
      type="primary"
      :hide-on-click="false"
      @command="handleCommand"
      @click="handleLeftClick"
      @visible-change="handleVisibleChange"
  >
    <!--        您好，{{ user.name }}-->
    您好，{{ user.name }}
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item icon="DocumentAdd" command="a">创建文章</el-dropdown-item>
        <el-dropdown-item icon="UserFilled" command="b">编辑资料</el-dropdown-item>
        <el-dropdown-item icon="Close" command="c">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>


<style scoped lang="scss">

</style>
