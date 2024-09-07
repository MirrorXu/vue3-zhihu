<template>
  <div class="upload-container">
    <input :disabled="disabled" ref="fileInput" placeholder="" type="file" @change="handleFileChange"
           :accept="acceptedTypes.join(',')" :multiple="multiple"/>

    <div v-if="files.length" class="preview-list">
      <div v-for="(file, index) in files" :key="index" class="file-item">
        <img v-if="isImage(file)" :src="file.preview" alt="file preview" class="file-preview"/>
        <p>{{ file.name }}</p>
        <progress v-if="file.progress !== null" :value="file.progress" max="100"></progress>
        <button @click="removeFile(index)">删除</button>
      </div>
    </div>
    <button @click="uploadFiles" :disabled="!files.length || isUploading">上传</button>
  </div>
</template>

<script>
import {ref, reactive, defineComponent} from 'vue';
import request from "@/api/request";

export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: true
    },
    max: {
      type: Number,
      default: 2
    },
    maxSize: {
      type: Number,
      default: 2 * 1024 * 1024 // 2MB
    },
    acceptedTypes: {
      type: Array,
      default: () => ['image/jpeg', 'image/png', 'image/gif']
    },
    uploadFile: {
      type: Function,
    },
    onSuccess: {
      type: Function
    },
    onError: {
      type: Function
    },
    onBeforeUpload: {
      type: Function,
      default: () => true
    }
  },
  data(props, vm) {
    console.log(props, vm)
    const fileInput = ref(null);
    const files = reactive([]); // 文件列表
    return {
      fileInput,
      files,
      isUploading:false
    }
  },
  methods: {
    handleFileChange(event) {
      const files = this.files;

      if(files >= this.max){
        alert('文件数量不能超过'+this.max)
        return
      }
      let rest = this.max - files.length;
      let selectedFiles = Array.from(event.target.files)
      if(selectedFiles.length  > rest){
        alert('文件数量不能超过'+this.max)
        selectedFiles = selectedFiles.slice(0,rest)
      }

      selectedFiles.forEach(file => {
        if (this.validateFile(file)) {
          file.preview = URL.createObjectURL(file);
          file.progress = null;
          files.push(file);
        }
      });
    },
    validateFile(file) {
      const isValidSize = file.size <= this.maxSize;
      const isValidType = this.acceptedTypes.includes(file.type);

      if (!isValidSize) {
        alert("文件太大了，限制在" + this.props.maxSize / 1024 / 1024 + "MB以内");
        return false;
      }

      if (!isValidType) {
        alert("文件类型不支持");
        return false;
      }

      return true;
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    async uploadFiles() {
      let {isUploading, files, onSuccess, onError ,uploadFile = this._defaultUploadFile} = this
      if (this.onBeforeUpload() === false) return;
      this.isUploading = true;
      let retArr = []
      try {
        retArr = await Promise.all(files.map(file => uploadFile(file)))
        typeof onSuccess === 'function' && onSuccess(retArr)
      } catch (errArr) {
        typeof onError === 'function' && onError(errArr)
      } finally {
        isUploading = false;
      }

      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i];
      //   file.progress = 0;
      //   const upload = this.uploadFile || this._defaultUploadFile
      //   try {
      //     const res = await upload(file);
      //     resArr.unshift(res);
      //     if (typeof onSuccess === "function") {
      //       onSuccess(file);
      //     }
      //   } catch (error) {
      //     if (typeof onError === "function"){
      //       onError(file, error)
      //     }
      //   }
      // }
    },
    _defaultUploadFile(file) {
      const formData = new FormData();
      formData.append(file.name, file);
      return request.post(this.url || '/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded / event.total) * 100);
          file.progress = progress
          // this.onUploadProgress(progress, event, file);
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

.preview-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.file-item {
  margin-right: 10px;
  text-align: center;
}

.file-preview {
  max-width: 100px;
  max-height: 100px;
  object-fit: cover;
  margin-bottom: 5px;
}

button {
  margin-top: 10px;
}
</style>
