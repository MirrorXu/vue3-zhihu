<template>
  <div class="upload-container">
    <el-button type="primary" @click="selectFiles">选择文件</el-button>
    <ul>
      <li v-for="(file,index) in files" :key="index">{{ file.name }} <button @click="removeFile(i)">删除</button></li>
    </ul>
    <el-button type="success" @click="uploadFiles" :disable="isUploading">上传</el-button>
  </div>
</template>

<script>
import {reactive, defineComponent} from 'vue';
import request from "@/api/request";
import {selectFiles} from "@/helper/file";

export default defineComponent({
  props: {},
  data(props, vm) {
    console.log(props, vm)
    const files = reactive([]); // 文件列表
    return {
      files,
      isUploading: false
    }
  },
  methods: {
    selectFiles() {
      const options = {
        multiple: this.$attrs.multiple || false,
        accept: this.$attrs.accept,
      }
      console.log(options, this.$attrs)
      selectFiles(options).then(files => {
        this.files = files
        return files
      }).catch(err => {
        console.log('文件选择失败', err)
      })
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    async uploadFiles() {
      let {files, uploadFile = this._defaultUploadFile} = this
      this.isUploading = true;
      let retArr = []
      try {
        retArr = await Promise.all(files.map(file => uploadFile(file)))
        this.$emit('upload-success', retArr)
      } catch (errArr) {
        console.log('上传失败：', errArr)
        this.$emit('upload-error', errArr)
      } finally {
        setTimeout(()=>{
          this.isUploading = false;
        } , 5000)
      }
    },
    _defaultUploadFile(file) {
      const formData = new FormData();
      formData.append(file.name, file);
      return request.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
    },
    isImage(file) {
      return file.type.startsWith("image/");
    }
  },
})

</script>

<style scoped>
.upload-container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
