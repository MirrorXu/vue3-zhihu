<script setup lang="ts">
import {PropType, defineProps} from 'vue'
import {Column} from '@/api/data.type'

defineProps({
  list: {
    type: Array as PropType<Column[]>,
  }
})

function goColumn(column: Column) {
  console.log('goColumn' , column)
}
</script>

<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        <el-card shadow="hover" class="card">
          <el-image :src="item.avatar">
            <template #placeholder>
              <div class="image-slot">Loading<span class="dot">...</span></div>
            </template>
          </el-image>
        <div class="content">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <div style="text-align: center">
            <el-button plain link type="primary" @click="goColumn(item)">进入专栏</el-button>
          </div>
        </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul{
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: stretch;
  flex-wrap: wrap;
}
.card {
  width:220px;
  height:282px;
  margin-bottom:18px;
  ::v-deep(.el-card__body) {
    padding: 0;
  }
  ::v-deep(.el-image) {
    width: 220px;
    height: 120px;
  }
  .content{
    padding: 10px;
    h2{
      margin:0;
      font-size: 18px;
    }
    p{
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 14px;
      text-overflow: ellipsis;
    }
  }
}

</style>
