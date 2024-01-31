<template>
  <div>
    <div id="upload-container" :class="{ 'is-dragover': isDragover }" @drop="handleDrop" @click="handleClick"
      @dragover.prevent @dragenter.prevent="isDragover = true" @dragleave.prevent="isDragover = false">
      <template v-if="selectedFile.url">
        <img v-if="selectedFile?.file!.type.indexOf('image') > -1" :src="selectedFile.url" alt="Selected Image" />
        <video controls v-if="selectedFile?.file!.type.indexOf('video') > -1" :src="selectedFile.url"></video>
      </template>
      <el-icon v-else :size="30" :color="'red'">
        <Files />
      </el-icon>
    </div>
    <!-- 按钮添加上点击事件 -->
    <el-button @click="handleUpload">开始上传(不切片)</el-button>
    <el-button @click="handleSliceUpload" :loading="calculating">切片上传</el-button>
    <el-button @click="handleCancel" type="danger">取消上传</el-button>
    <div class="progress" v-if="progressInfo.percentage > 0">
      <span>{{ progressInfo.name }}</span>
      <el-progress :percentage="progressInfo.percentage"></el-progress>
    </div>
    <template v-if="sliceProgressInfo.size > 0">
      <div class="progress" v-for="(value, key) in sliceProgressInfo" :key="key">
        <span>{{ value[0] }}</span>
        <el-progress :percentage="value[1]"></el-progress>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import axiosInstans from './utils/axiosInstans'
import { getFileName } from './utils/getFileName'
import { createChunks } from './utils/createChunk'
import type { chunkInfo } from './utils/createChunk'
import axios, { CancelTokenSource } from 'axios';
const isDragover = ref(false);//是否拖放
const calculating = ref<Boolean>(false);//上传按钮的加载状态
//已选择的文件
const selectedFile = reactive({
  url: "",
  file: null as File | null
})
//进度条信息--不切片
const progressInfo = reactive({
  name: '',
  percentage: 0,
})
//切片进度条信息
const sliceProgressInfo = reactive<Map<string, number>>(new Map())
// 取消请求的 token 数组
const cancelTokens =reactive<Array<CancelTokenSource>>([]);
// 取消所有请求
const handleCancel = () => {
  cancelTokens.forEach((cancelToken:CancelTokenSource) => {
    cancelToken.cancel();
  });
};

//切片上传
const handleSliceUpload = async () => {
  if (!selectedFile.file) {
    ElMessage.error('请先选择文件');
    return;
  }
  //清空进度条map
  sliceProgressInfo.clear()
  calculating.value = true;
  //利用cropto(不是node中的,是web环境下自带的)获取文件摘要,唯一文件名称
  const fileName = await getFileName(selectedFile.file)
  calculating.value = false

  const CHUNK_SIZE = 1024 * 1024 * 100 //100MB
  //获取文件切片
  const chunks = createChunks(selectedFile.file, CHUNK_SIZE, fileName)
  //上传切片
  const request = chunks.map((chunkInfo: chunkInfo) => {
    const cancelToken = axios.CancelToken.source();
    cancelTokens.push(cancelToken);
    return axiosInstans.post(`slice/upload/${fileName}`, chunkInfo.chunk, {
      headers: {
        "Content-Type": "application/octet-stream"
      },
      params: {
        chnkFilename: chunkInfo.chunkFilename
      },
      onUploadProgress(progressEvent) {
        if (!progressEvent.total) return
        sliceProgressInfo.set(chunkInfo.chunkFilename, Math.round((progressEvent.loaded * 100) / progressEvent.total))
      },
      cancelToken: cancelToken.token
    })
  })
  try {
    await Promise.all(request)
    ElMessage.success('切片上传完成')
    await handleMerge(fileName)
  } catch (error) {
    if (axios.isCancel(error)) {
      ElMessage.warning("上传已取消");
    } else {
      ElMessage.error("上传失败");
    }
  }
}

//合并
const handleMerge = async (fileName: string) => {
  //合并切片
  await axiosInstans.post(`/slice/merge/${fileName}`)
  ElMessage.success('文件合并完成')
}


//开始上传--不切片
const handleUpload = async () => {
  if (!selectedFile.file) {
    ElMessage.error('请先选择文件');
    return;
  }
  //上传文件,以流的方式
  axiosInstans.post(`/upload/${selectedFile.file.name}`, selectedFile.file, {
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    onUploadProgress: (progressEvent) => {
      // console.log("🚀 ~ file: App.vue:52 ~ handleUpload ~ progressEvent:", progressEvent)
      if (!progressEvent.total) return
      const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      progressInfo.name = selectedFile?.file ? selectedFile.file.name : '未知文件';
      progressInfo.percentage = percentage;
    }
  }).then(res => {
    console.log(res);
    ElMessage.success('上传成功');
  }).catch(err => {
    console.log(err);
    ElMessage.error('上传失败');
  })
}

//拖放事件
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  const { files } = e.dataTransfer as DataTransfer;
  if (files.length === 0) return
  //限制只能上传图片或者视频
  const isMedia = files[0].type.indexOf('image') > -1 || files[0].type.indexOf('video') > -1;
  if (!isMedia) {
    return ElMessage.warning("只能上传图片或者视频")
  }
  selectedFile.url = URL.createObjectURL(files[0]);
  selectedFile.file = files[0];
}
//点击上传文件
const handleClick = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.addEventListener('change', (e: Event) => {
    const { files } = e.target as HTMLInputElement;
    if (files?.length === 0) return
    // console.log(files);
    //限制只能上传图片或者视频---file![0]（是非空断言）
    const isMedia = files![0].type.indexOf('image') > -1 || files![0].type.indexOf('video') > -1;
    if (!isMedia) {
      return ElMessage.warning("只能上传图片或者视频")
    }
    selectedFile.url = URL.createObjectURL(files![0]);
    selectedFile.file = files![0];
  })
  input.click();
}
</script>

<style scoped>
#upload-container {
  height: 400px;
  line-height: 400px;
  text-align: center;
  border: 1px dashed #ccc;
  margin-bottom: 20px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

#upload-container:hover,
#upload-container.is-dragover {
  border: 1px dashed #0037ff;
  color: #0037ff;
}
</style>
