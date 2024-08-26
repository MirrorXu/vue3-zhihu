<script setup lang="ts">
import {ChromeFilled} from "@element-plus/icons-vue";

</script>

<template>
  <div class="site-title">
    <slot name="logo">
      <el-icon size="26px" color="#409eff" style="margin-right: 8px">
        <ChromeFilled/>
      </el-icon>
    </slot>
    <slot name="title">
      <h1 class="title">知乎</h1>
    </slot>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.site-title {
  display: flex;
  align-items: center;

  .title {
    color: var(--jjext-color-secondary-app);
  }
}

</style>
