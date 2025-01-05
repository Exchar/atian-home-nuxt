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
const blogDetail = ref<BlogItem>({
  blogDesc: '',
  blogTitle: '',
  coverUrl: '',
  createDate: '',
  discussCount: 0,
  editorType: 0,
  enable: false,
  id: '',
  tagsList: [],
  updateDate: '',
})
const getNowTheme = inject('getNowTheme') as ()=> 'dark'|'light'

function goHome() {
  router.push({
    path: '/home'
  })
}
const nowTheme = computed(()=> getNowTheme())
onMounted(()=> {
  console.log(useRoute())
  const query = useRoute().query as {id:string}
//   获取文章内容
  const loadingFn = VsLoadingFn({
    target: '#detailContainer',
    type: 'circles',
    // text: '玩命加载中',
    scale: '1.2',
  })
  const loadingBar = useLoadingBar();
  loadingBar.start()
  // const params = new URLSearchParams({id: query.id})
  $fetch('/api/blogs/getBlogContent',{
    method:'get',
    query: {id: query.id}
  }).then(res => {
    const resData = res as unknown as ResponseData<BlogItem>;
    console.log(resData)
    blogDetail.value = resData.data;
    text.value = blogDetail.value?.blogContent || ''
    loadingBar.finish()
  }).catch(()=> {
    loadingBar.error()
  }).finally(()=> {
    loadingFn.close()
  })
})
</script>
<template>
  <div class="detail-container" ref="detailContainer" id="detailContainer">
    <div class="guide-header">
      <vs-button color="whatsapp" size="large" type="floating" @click="goHome">
        <i class="bx bx-left-arrow-alt" />
        <template #animate>
          首页
        </template>
      </vs-button>

      <span class="detail-title" style="margin-left: 8px">
        {{blogDetail.blogTitle}}
      </span>
      <n-space class="detail-desc m-4">
        <n-tag> 创建日期：{{blogDetail.createDate}} </n-tag>
        <n-tag> 最后更新：{{blogDetail.updateDate}}  </n-tag>
      </n-space>
    </div>
    <span class="text-gray-500"> 说明：{{blogDetail.blogDesc}} </span>
    <MdPreview :theme="nowTheme" :id="id" :modelValue="text" />
    <MdCatalog :editorId="id" :scrollElement="scrollElement" />
  </div>
</template>
<style lang="scss">
.detail-container{
  width: 80%;
  margin: 16px auto;
  //box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
  // border: 1px solid #e2e2e2;
  padding: 16px;
  border-radius: var(--vs-radius);
  min-height: 30vh;
}
.detail-title{
  font-size: var(--vs-font-size-extra-large);
}
.guide-header{
  //margin-top: 12px;
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  .detail-title{
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-wrap: wrap;
  }
}
</style>