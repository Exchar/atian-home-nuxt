<script setup lang="ts">
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';
import {VsLoadingFn} from "vuesax-alpha";
import type {BlogItem, PageData, ResponseData} from "~/types";

const id = 'preview-only';
const text = ref('');
const scrollElement = '#content-main';
const router = useRouter()
const detailContainer = ref<HTMLElement>()
const blogDetail = ref<BlogItem>()

function goHome() {
  router.push({
    path: '/home'
  })
}
onMounted(()=> {
  console.log(useRoute())
  const query = useRoute().query as {id:string}
//   获取文章内容
  const loadingFn = VsLoadingFn({
    target: detailContainer.value,
    type: 'circles',
    // text: '玩命加载中',
    scale: '1.2',
  })
  const loadingBar = useLoadingBar();
  loadingBar.start()
  const params = new URLSearchParams({id: query.id})
  $fetch('/api/blogs/getBlogContent',{
    query: params,
  }).then(res => {
    const resData = res as unknown as ResponseData<BlogItem>;
    console.log(resData)
    blogDetail.value = resData.data;
    loadingBar.finish()
  }).catch(()=> {
    loadingBar.error()
  }).finally(()=> {
    loadingFn.close()
  })
})
</script>
<template>
  <div class="detail-container" ref="detailContainer">
    <div class="guide-header">
      <vs-button type="transparent" @click="goHome">
        <i class="bx bx-left-arrow-alt" />
        <template #animate>
          首页
        </template>
      </vs-button>

      <span class="detail-title" style="margin-left: 8px">
      这是一个文章标题
    </span>
    </div>
    <MdPreview :id="id" :modelValue="text" />
    <MdCatalog :editorId="id" :scrollElement="scrollElement" />
  </div>
</template>
<style lang="scss">
.guide-header{
  //margin-top: 12px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  .detail-title{
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>