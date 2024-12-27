<script setup lang="ts">
import { ref } from 'vue'

const active = ref('blog')
const wallpaper = ref<bingImgInfo>({
  url: '',
  sortdate: '',
  copyright: '',
  urlbase: '',
  title: ''
})

// 获取壁纸图
const imgInfo = (await useFetch('/api/wallpaper')).data.value;

console.log('图片信息', imgInfo);
wallpaper.value = imgInfo;

</script>
<template>
  <!-- 顶部导航栏 -->
  <div class="hidden">
    <vs-navbar class="my-navbar" v-model="active" shadow shape="square" center-collapsed>
      <!-- <template #left>
        <vs-button type="flat" icon @click="activeSidebar = !activeSidebar">
          <i class="bx bx-menu" />
        </vs-button>
      </template> -->
      <vs-navbar-item id="guide" :active="active == 'blog'"> 博客 </vs-navbar-item>
      <vs-navbar-item id="docs" :active="active == 'projects'"> 项目总览 </vs-navbar-item>
      <vs-navbar-item id="components" :active="active == 'about'">
        关于我
      </vs-navbar-item>
      <vs-navbar-item id="license" :active="active == 'news'">
        新闻趣事
      </vs-navbar-item>
      <!-- <template #right>
        <vs-button type="flat">Login</vs-button>
        <vs-button>Get Started</vs-button>
      </template> -->
    </vs-navbar>
    <!-- 顶部壁纸图，使用Bing API -->
    <div class="bing-wallpaper" :style="{
      backgroundImage: `url(${wallpaper.url})`
    }">
      <p class="description">{{ wallpaper.title }}</p>
    </div>
    <slot />
  </div>
</template>
<style lang="css" scoped>
.my-navbar {
  height: 3.6em;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(14px);
}

.bing-wallpaper {
  width: 100%;
  height: 36vh;
  overflow: hidden;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, var(--vs-shadow-opacity));

  .description {
    color: #303030;
    backdrop-filter: blur(3px);
    border-radius: 10px;
    padding: 4px;
  }
}
</style>
