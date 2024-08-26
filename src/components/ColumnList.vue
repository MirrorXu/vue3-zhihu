<script setup lang="ts">
import {PropType, defineProps} from 'vue'
import {Column} from '@/api/testData'
import {useRouter} from "vue-router";

const router = useRouter()
defineProps({
  list: {
    type: Array as PropType<Column[]>,
  }
})

function goColumn(column: Column) {
  const {id} = column
  router.push({name: 'column', params: {id}})
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
ul {
  //background-color: darkcyan;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: wrap;

  li {
    width: 25%;
    //border: 1px solid deeppink;
    display: flex;
    align-items: stretch;
    justify-content: center;
  }
}

.card {
  width: 90%;
  //height:282px;
  margin-bottom: 18px;

  ::v-deep(.el-card__body) {
    padding: 0;
  }

  .el-image {
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    //border:10px solid darkblue;
    overflow: hidden !important;
    position: relative;

    ::v-deep(img) {
      box-sizing: border-box;
      //border:10px solid deeppink;
      position: absolute;
      width: 100%;
      height: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .content {
    padding: 10px;

    h2 {
      margin: 0;
      font-size: 18px;
    }

    p {
      margin-top: 10px;
      margin-bottom: 10px;
      font-size: 14px;
      text-overflow: ellipsis;
    }
  }
}

</style>
