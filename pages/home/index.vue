<script setup lang="ts">
import { type BlogItem, type BlogTagItem, type PageData, type ResponseData } from '~/types';
import {VsLoadingFn} from "vuesax-alpha";
import notFoundIcon from '~/assets/svg/404.svg'

const myBlogs = ref<BlogItem[]>([]);
const total = ref(0);
const router = useRouter();
const dataLoading = ref(true)
const homeContainer = ref<HTMLElement>()
const blogItemContainer = ref<HTMLElement[]>()

const typeList = [ "default" ,"primary", "info", "success","warning","error"]
type TagType = "default" | "primary" | "info" | "success" | "warning" | "error"

async function getBlogs() {
    const params = {
        page: 1,
        size: 10
    }
    dataLoading.value = true;
  const loadingFn = VsLoadingFn({
    target: '#index-home-container',
    type: 'circles',
    // text: '玩命加载中',
    scale: '1.2',
  })
  const loadingBar = useLoadingBar();
    loadingBar.start()
    $fetch('/api/blogs/getBlogs',{
      params,
    }).then(res => {
        const resData = res as unknown as ResponseData<PageData<BlogItem[]>>;
        console.log(resData)
        total.value = resData.data.total;
        myBlogs.value = resData.data.list || [];
        loadingBar.finish()
    }).catch(()=> {
      loadingBar.error()
    }).finally(()=> {
      loadingFn.close()
      dataLoading.value = false
      nextTick(()=> {
        //   开启列表动画
        const { $gsap: gsap } = useNuxtApp();
        console.log(blogItemContainer)
        blogItemContainer.value && gsap.fromTo(blogItemContainer.value,{
          opacity: 0,
          duration: 0.4,
          stagger: {
            // wrap advanced options in an object
            each: 0.2,
            // from: 'center',
            // grid: 'auto',
            ease: 'ease.in',
            repeat: 0 // Repeats immediately, not waiting for the other staggered animations to finish
          },
          y: -80
        },{
          opacity: 1,
          duration: 0.4,
          stagger: {
            // wrap advanced options in an object
            each: 0.2,
            // from: 'center',
            // grid: 'auto',
            ease: 'ease.in',
            repeat: 0 // Repeats immediately, not waiting for the other staggered animations to finish
          },
          y: 0
        })
      })
    })
    // myBlogs.value = (await useFetch('/api/blog/getBlogs')).data as any;
//   todo :添加首页插画背景、详情页字数统计、时间等
}
function detailClick(item:BlogItem) {
  router.push({
    path: '/home/detail',
    query:{
      id: item.id
    }
  })
}
function getRandomType():TagType{
  const randomIndex = Math.floor(Math.random()*6)
  return typeList[randomIndex] as TagType
}

onMounted(()=> {
  getBlogs()
})

</script>
<template>
    <n-el class="my-home-container" ref="homeContainer" id="index-home-container">
      <n-el class="my-home-container-main">
        <client-only v-if="myBlogs.length>0">
          <div ref="blogItemContainer" class="cardBox" v-for="item in myBlogs" :key="item.id" >
            <vs-card class="blog-item-container" type="3" @click="detailClick(item)">
              <template #title>
                <n-h3>{{item.blogTitle}}</n-h3>
              </template>
              <template #img>
                <n-image preview-disabled :src="item.coverUrl"  alt="图片">
                  <template #error>
                    <n-icon :size="100" color="lightGrey">
                      <i class="bx bx-image"></i>
                    </n-icon>
                  </template>
                </n-image>
              </template>
              <template #text>
                <n-el class="text-container">
                  <n-p>{{item.blogDesc}}</n-p>
                  <n-el class="tag-container">
                    <n-space>
                      <n-tag :type="getRandomType()" :bordered="false" v-for="tag in item.tagsList.slice(0,4)">
                        {{tag.tagName}}
                        <template #avatar>
                          <n-avatar
                              v-if="tag.tagImg"
                              :src="tag.tagImg"
                          >
                            <template #fallback>
                              <i class='bx bxs-purchase-tag'></i>
                            </template>
                          </n-avatar>
                          <i v-else class='bx bxs-purchase-tag'></i>
                        </template>
                      </n-tag>
                      <n-popover trigger="hover"
                                 v-if="item.tagsList && item.tagsList.length>4"
                                 placement="top"
                      >
                        <template #trigger>
                          <n-button text>
                            <i class='bx bxl-flickr'></i>
                          </n-button>
                        </template>
                        <span>
                          <n-space>
                            <n-tag :type="getRandomType()"  :bordered="false" v-for="tag in item.tagsList.slice(4)">
                              {{tag.tagName}}
                              <template #avatar>
                                <n-avatar
                                    v-if="tag.tagImg"
                                    :src="tag.tagImg"
                                >
                                  <template #fallback>
                                    <i class='bx bxs-purchase-tag'></i>
                                  </template>
                                </n-avatar>
                                <i v-else class='bx bxs-purchase-tag'></i>
                              </template>
                            </n-tag>
                          </n-space>
                        </span>
                      </n-popover>
                    </n-space>
                  </n-el>
                </n-el>
              </template>
              <template #interactions>
                <vs-button class="btn-chat" type="shadow">
                  <i class="bx bx-chat" />
                  <span class="span"> {{ item.discussCount }} </span>
                </vs-button>
              </template>
            </vs-card>
          </div>
        </client-only>
        <div class="data-empty" v-else-if="!dataLoading">
          <img :src="notFoundIcon" alt="page not found"/>
        </div>
      </n-el>
    </n-el>
</template>

<style lang="scss" scoped>
.my-home-container-main {
    width: 80%;
    margin: 16px auto;
    //box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
    // border: 1px solid #e2e2e2;
    padding: 16px;
    border-radius: var(--vs-radius);
    min-height: 30vh;
    .cardBox{
      opacity: 0;
      padding: 4px 16px;
      //overflow: hidden;
      &:not(:last-child){
        margin-bottom: 2vh;
      }
    }
    :deep() {
      //.vs-card-content.type-3 .vs-card:hover{
      //  transform: scale(1);
      //}
        .vs-card__img {
            width: 20vw;
          max-width: 340px;
          min-width: 140px;
        }
      *{
        transition: all .4s;
      }
      .vs-card{
        box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
        //border: 1px solid rgba();
      }
        .blog-item-container {
            max-width: none !important;
            padding: 8px;
            align-items:stretch;
            .vs-card__text{
            //height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
              flex-basis: 100%;
              flex-grow: 1;

          }
        }

        .vs-card-content {
            // padding: 6px 0;
          //box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, .4);
            &:not(:last-child) {
                margin-bottom: 16px;
                // border-bottom: 1px solid #e2e2e2;
            }
          &:hover{
            transform: scale(1) !important;
          }
        }

        .vs-card__img img {
            height: 100%;
            object-fit: cover;
        }
        .vs-card__text{
          padding-top: 0;
        }
        .vs-card__interactions {
            bottom: 8px;
        }
    }
}
.text-container{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 auto;
  overflow: hidden;
  .tag-container{
    display: flex;
  }
}
.data-empty{
  width: 60%;
  margin: 0 auto;
}
</style>