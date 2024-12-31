<script setup lang="ts">
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
// preview.css相比style.css少了编辑器那部分样式
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';
const text = ref('');
const scrollElement = '#content-main';
const router = useRouter()

function goHome() {
  router.push({
    path: '/home'
  })
}
</script>
<template>
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