<script setup lang="ts">
import { ref } from 'vue'
import windImg from '~/assets/imgs/wind.png';

const active = ref('home');
const activeSidebar = ref(false);
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
const imgInfo = (await useFetch('/api/wallpaper')).data.value as bingImgInfo;

// console.log('图片信息', imgInfo);
wallpaper.value = imgInfo;

const { $gsap: gsap } = useNuxtApp();
onMounted(() => {
  // 开始旋转风车图片
  gsap.to('.wind-img', {
    rotate: 360,
    duration: 4,
    repeat: -1,
    ease: 'none'
  })
})
const changeActiveSideBar = ()=>{
  activeSidebar.value = !activeSidebar.value
}

</script>
<template>
  <div class="page-content">
    <div class="my-sidebar">
      <!-- 顶部导航栏 -->
      <vs-navbar class="my-navbar"
                 v-model="active" shadow shape="square" center-collapsed
                 padding-scroll
                 target-scroll=".content-main"
      >
        <template #left>
          <vs-button type="flat" icon @click="changeActiveSideBar">
            <i class="bx bx-menu" />
          </vs-button>
        </template>
        <vs-navbar-item id="home" :active="active == 'home'" to="/home"> 博客 </vs-navbar-item>
        <vs-navbar-item id="projects" :active="active == 'projects'" to="/projects"> 项目总览 </vs-navbar-item>
        <vs-navbar-item id="about" :active="active == 'about'" to="/about">
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
      <!-- 侧边导航栏 -->
      <vs-sidebar v-model="active" v-model:open="activeSidebar" absolute>
        <template #logo>
        </template>
        <template #header />
        <vs-sidebar-item id="home" to="/home">
          <template #icon>

            <i class="bx bx-book-content"></i>
          </template>
          博客
        </vs-sidebar-item>
        <vs-sidebar-item id="projects" to="projects">
          <template #icon>
            <i class="bx bx-shape-polygon" />
          </template>
          项目总览
        </vs-sidebar-item>
        <vs-sidebar-item id="about" to="/about">
          <template #icon>
            <i class="bx bxs-upside-down" />
          </template>
          关于我
        </vs-sidebar-item>
        <vs-sidebar-item id="news" to="/news">
          <template #icon>
            <i class="bx bx-news" />
          </template>
          新闻趣事
        </vs-sidebar-item>
        <template #footer>
        </template>
      </vs-sidebar>
    </div>
    <div class="content-main" id="content-main">
      <!-- 顶部壁纸图，使用Bing API -->
      <div class="bing-wallpaper" :style="{
    backgroundImage: `url(${wallpaper.url})`
  }">
        <p class="description">{{ wallpaper.copyright }}</p>
        <div class="external-weather">
          <iframe allowtransparency="true" border="0" frameborder="0" scrolling="no"
                  :src="useRuntimeConfig().public.weatherPage"></iframe>
        </div>
      </div>
      <div id="page-main">
        <slot />
      </div>
      <!-- 底部footer -->
      <vs-row class="my-footer">
        <vs-col vs-type="flex" class="my-footer-main" vs-justify="center" vs-align="center" vs-w="24">
          <p class="copyright">
            Copyright © 2025
            <a href="https://github.com/Exchar" class="link" target="_blank" style="margin-right: 16px">Exchar</a>
            <a href="https://beian.miit.gov.cn/" class="link" target="_blank">蜀ICP备2023023736号</a>
          </p>
          <p class="abreast">
            <img class="wind-img" :src="windImg" alt="">
            powerd by <a href="https://vuesax-alpha.vercel.app/" class="link" style="margin-left: 4px;"> vuesax-alpha</a>&<a
              href="https://nuxtjs.org.cn/" class="link">Nuxt</a>
          </p>
        </vs-col>
      </vs-row>
    </div>
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
  box-shadow: 0px 6px 7px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 2vh;

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
    top: 64px;
    height: 130px;
    width: 254px;
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

#page-main {
  min-height: calc(56vh - 10px);
}

.my-footer {
  background-color: rgba(0, 0, 0, .8);
  color: #ffffff;
  backdrop-filter: blur(14px);
  height: 8vh;
  transition: all .4s;
}

.my-footer-main {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.link {
  color: #007aff;
}

.wind-img {
  height: 1.8em;
  margin-right: 8px;
}
.page-content{
  height: 100%;
}
.my-sidebar {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.content-main{
  height: 100%;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  top: 0;
  transition: all .4s;
}
</style>
