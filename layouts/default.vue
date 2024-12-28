<script setup lang="ts">
import { ref } from 'vue'

const active = ref('')
const wallpaper = ref<bingImgInfo>({
  url: '',
  sortdate: '',
  copyright: '',
  urlbase: '',
})
const routeInfo = useRoute();
// console.log(routeInfo);
if (routeInfo.path) {
  active.value = routeInfo.path.split('/')[1];
}


// 获取壁纸图
const imgInfo = (await useFetch('/api/wallpaper')).data.value;

console.log('图片信息', imgInfo);
wallpaper.value = imgInfo;

</script>
<template>
  <!-- 侧边导航栏 -->
  <vs-sidebar v-model="active" hover-expand absolute reduce open>
    <template #logo>
    </template>
    <template #header />
    <vs-sidebar-item id="home">
      <template #icon>

        <i class="bx bx-book-content"></i>
      </template>
      博客
    </vs-sidebar-item>
    <vs-sidebar-item id="Music">
      <template #icon>
        <i class="bx bxs-music" />
      </template>
      项目总览
    </vs-sidebar-item>
    <vs-sidebar-item id="donate">
      <template #icon>
        <i class="bx bxs-donate-heart" />
      </template>
      关于我
    </vs-sidebar-item>
    <vs-sidebar-item id="news">
      <template #icon>
        <i class="bx bxs-donate-heart" />
      </template>
      新闻趣事
    </vs-sidebar-item>
    <template #footer>
    </template>
  </vs-sidebar>
  <!-- 顶部导航栏 -->
  <div class="hidden">
    <vs-navbar class="my-navbar" v-model="active" shadow shape="square" center-collapsed>
      <!-- <template #left>
        <vs-button type="flat" icon @click="activeSidebar = !activeSidebar">
          <i class="bx bx-menu" />
        </vs-button>
      </template> -->
      <vs-navbar-item id="guide" :active="active == ''" to="/"> 博客 </vs-navbar-item>
      <vs-navbar-item id="docs" :active="active == 'projects'" to="/projects"> 项目总览 </vs-navbar-item>
      <vs-navbar-item id="components" :active="active == 'about'" to="/about">
        关于我
      </vs-navbar-item>
      <vs-navbar-item id="news" :active="active == 'news'" to="/news">
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
      <p class="description">{{ wallpaper.copyright }}</p>
      <div class="external-weather">
        <iframe allowtransparency="yes" border="0" frameborder="0" scrolling="no"
          :src="useRuntimeConfig().public.weatherPage"></iframe>
      </div>
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
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, var(--vs-shadow-opacity));
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
  justify-content: flex-start;
  align-items: flex-end;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, var(--vs-shadow-opacity));

  .description {
    color: #a2b5d8;
    backdrop-filter: blur(3px);
    border-radius: 10px;
    padding: 4px;
    background-color: rgba(0, 0, 0, .4);
    margin-bottom: 16px;
    margin-left: 6px;
    padding: 2px 4px;
  }

  .external-weather {
    position: absolute;
    right: 16px;
    bottom: 32px;
    height: 130px;
    width: 240px;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, var(--vs-shadow-opacity));
    background-color: rgba(255, 255, 255, .2);
    backdrop-filter: blur(8px);
    border-radius: var(--vs-radius);

    iframe {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      overflow: hidden;
      background-color: transparent;
    }
  }
}
</style>
