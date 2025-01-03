<script setup lang="ts">
import { type BlogItem, type BlogTagItem, type PageData, type ResponseData } from '~/types';
import {VsLoadingFn} from "vuesax-alpha";
import notFoundIcon from '~/assets/svg/404.svg'

const myBlogs = ref<BlogItem[]>([]);
const total = ref(0);
const router = useRouter();
const dataLoading = ref(false)
const homeContainer = ref<HTMLElement>()

const typeList = [ "default" ,"primary", "info", "success","warning","error"]
type TagType = "default" | "primary" | "info" | "success" | "warning" | "error"

async function getBlogs() {
    const params = {
        page: 1,
        size: 10
    }
  const loadingFn = VsLoadingFn({
    target: homeContainer.value,
    type: 'circles',
    // text: '玩命加载中',
    scale: '1.2',
  })
  const loadingBar = useLoadingBar();
    loadingBar.start()
    // $fetch('/api/blogs/getBlogs',{
    //   params,
    // }).then(res => {
    //     const resData = res as unknown as ResponseData<PageData<BlogItem[]>>;
    //     console.log(resData)
    //     total.value = resData.data.total;
    //     myBlogs.value = resData.data.list || [];
    //     loadingBar.finish()
    // }).catch(()=> {
    //   loadingBar.error()
    // }).finally(()=> {
    //   loadingFn.close()
    // })
  setTimeout(()=> {
/*    myBlogs.value = [
      {
        blogDesc: '发的时刻加分的考生',
        blogTitle: '的事实是事实',
        coverUrl: 'https://www.bing.com/th?id=OHR.FestivusCranes_ZH-CN2464862059_UHD.jpg',
        createDate: '',
        discussCount: 0,
        editorType: 0,
        enable: true,
        id: '',
        tagsList: [],
        updateDate: ''
      },
      {
        blogDesc: '发的时刻加分的考生',
        blogTitle: '的事实是事实',
        coverUrl: 'https://www.bing.com/th?id=OHR.FestivusCranes_ZH-CN2464862059_UHD.jpg',
        createDate: '',
        discussCount: 0,
        editorType: 0,
        enable: true,
        id: '',
        tagsList: [],
        updateDate: ''
      },
      {
        blogDesc: '发的时刻加分的考生',
        blogTitle: '的事实是事实',
        coverUrl: 'https://www.bing.com/th?id=OHR.FestivusCranes_ZH-CN2464862059_UHD.jpg',
        createDate: '',
        discussCount: 0,
        editorType: 0,
        enable: true,
        id: '',
        tagsList: [],
        updateDate: ''
      },
    ];*/
        loadingBar.finish();
        loadingFn.close()
  },1500)
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
    <div class="my-home-container" ref="homeContainer" id="index-home-container">
        <div class="my-home-container-main">
          <client-only v-if="myBlogs.length>0">
            <vs-card class="blog-item-container" type="3" v-for="item in myBlogs" :key="item.id" @click="detailClick(item)">
              <template #title>
                <h3>{{item.blogTitle}}</h3>
              </template>
              <template #img>
                <n-image :src="item.coverUrl"  alt="图片">
                  <template #error>
                    <n-icon :size="100" color="lightGrey">
                      <i class="bx bx-image"></i>
                    </n-icon>
                  </template>
                </n-image>
              </template>
              <template #text>
                <n-el class="text-container">
                  <p>{{item.blogDesc}}</p>
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
                      <n-tooltip
                          v-if="item.tagsList && item.tagsList.length>4"
                          placement="top"
                          trigger="hover"
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
                      </n-tooltip>
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
          </client-only>
          <div class="data-empty" v-else>
            <img :src="notFoundIcon" alt="page not found"/>
          </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.my-home-container-main {
    width: 80%;
    margin: 16px auto;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
    // border: 1px solid #e2e2e2;
    padding: 4vw;
    border-radius: var(--vs-radius);
    min-height: 30vh;

    :deep() {
        .vs-card__img {
            width: 20vw;
          max-width: 340px;
          min-width: 140px;
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

            &:not(:last-child) {
                margin-bottom: 16px;
                // border-bottom: 1px solid #e2e2e2;
            }
        }

        .vs-card__img img {
            height: 100%;
            object-fit: cover;
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