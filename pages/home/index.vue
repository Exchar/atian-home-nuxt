<script setup lang="ts">
import { type BlogItem, type BlogTagItem, type PageData, type ResponseData } from '~/types';
import {VsLoadingFn} from "vuesax-alpha";
const myBlogs = ref<BlogItem[]>([]);
const total = ref(0);
const router = useRouter();
const dataLoading = ref(false)
const homeContainer = ref<HTMLElement>()

async function getBlogs() {
    const params = {
        page: 1,
        size: 10
    }
    // myBlogs.value = [
    //     {
    //         blogDesc: '发的时刻加分的考生',
    //         blogTitle: '的事实是事实',
    //         coverUrl: 'https://www.bing.com/th?id=OHR.FestivusCranes_ZH-CN2464862059_UHD.jpg',
    //         createDate: '',
    //         discussCount: 0,
    //         editorType: 0,
    //         enable: true,
    //         id: '',
    //         tagsList: [],
    //         updateDate: ''
    //     },
    //     {
    //         blogDesc: '发的时刻加分的考生',
    //         blogTitle: '的事实是事实',
    //         coverUrl: 'https://www.bing.com/th?id=OHR.FestivusCranes_ZH-CN2464862059_UHD.jpg',
    //         createDate: '',
    //         discussCount: 0,
    //         editorType: 0,
    //         enable: true,
    //         id: '',
    //         tagsList: [],
    //         updateDate: ''
    //     },
    //     {
    //         blogDesc: '发的时刻加分的考生',
    //         blogTitle: '的事实是事实',
    //         coverUrl: 'https://www.bing.com/th?id=OHR.FestivusCranes_ZH-CN2464862059_UHD.jpg',
    //         createDate: '',
    //         discussCount: 0,
    //         editorType: 0,
    //         enable: true,
    //         id: '',
    //         tagsList: [],
    //         updateDate: ''
    //     },
    // ];
  const loadingFn = VsLoadingFn({
    target: homeContainer,
    type: 'circles',
    // text: '玩命加载中',
    scale: '1.2',
  })
    $fetch('/api/blogs/getBlogs',{
      params,
    }).then(res => {
        const resData = res as unknown as ResponseData<PageData<BlogItem[]>>;
        console.log(resData)
        total.value = resData.data.total;
        myBlogs.value = resData.data.list || [];
    }).finally(()=> {
      loadingFn.close()
    })
    // myBlogs.value = (await useFetch('/api/blog/getBlogs')).data as any;
}
function detailClick(item:BlogItem) {
  router.push({
    path: '/home/detail',
    query:{
      id: item.id
    }
  })
}
onMounted(()=> {
  getBlogs()
})
</script>
<template>
    <div class="my-home-container" ref="homeContainer" id="index-home-container">
        <div class="my-home-container-main">
          <client-only>
            <vs-card class="blog-item-container" type="3" v-for="item in myBlogs" :key="item.id" @click="detailClick(item)">
              <template #title>
                <h3>{{item.blogTitle}}</h3>
              </template>
              <template #img>
                <img :src="item.coverUrl"  alt="图片"/>
              </template>
              <template #text>
                <p>{{item.blogTitle}}</p>
              </template>
              <template #interactions>
                <vs-button class="btn-chat" type="shadow">
                  <i class="bx bx-chat" />
                  <span class="span"> {{ item.discussCount }} </span>
                </vs-button>
              </template>
            </vs-card>
          </client-only>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.my-home-container-main {
    width: 80%;
    margin: 0 auto;
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.1);
    // border: 1px solid #e2e2e2;
    margin-top: 16px;
    padding: 4vw;
    border-radius: var(--vs-radius);
    min-height: 30vh;

    :deep() {
        .vs-card__img {
            width: 200px;
        }

        .blog-item-container {
            max-width: none !important;
            padding: 8px;
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
</style>