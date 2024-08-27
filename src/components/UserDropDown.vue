<script setup lang="ts">

import {PropType, defineProps, nextTick} from "vue";
import {useRouter} from "vue-router";
import {User} from '@/api/responseType'

const router = useRouter();
defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  }
})

function handleCommand(command: string) {
  console.log(command)
  switch (command) {
    case 'c':
      doExit()
      break
  }
}

function doExit() {
  console.log(router)
  nextTick(() => {
    localStorage.setItem('isLogin', '')
    router.push({name: 'login'})
  })
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
