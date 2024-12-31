<script setup lang="ts">
import { type BlogItem, type BlogTagItem, type PageData, type ResponseData } from '~/types';
const myBlogs = ref<BlogItem[]>([]);
const total = ref(0);
const router = useRouter();
const dataLoading = ref(false)

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
    useFetch('/api/blogs/getBlogs').then(res => {
        console.log(res.data.value);
        const resData = res.data.value as unknown as ResponseData<PageData<BlogItem[]>>;
        total.value = resData.data.total;
        myBlogs.value = resData.data.list || [];
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
getBlogs()
</script>
<template>
    <div class="my-home-container">
        <div class="my-home-container-main">
            <vs-card class="blog-item-container" type="3" v-for="item in myBlogs" :key="item.id" @click="detailClick(item)">
                <template #title>
                    <h3>Art paintings</h3>
                </template>
                <template #img>
                    <img :src="item.coverUrl" />
                </template>
                <template #text>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                </template>
                <template #interactions>
                    <vs-button class="btn-chat" type="shadow">
                        <i class="bx bx-chat" />
                        <span class="span"> {{ item.discussCount }} </span>
                    </vs-button>
                </template>
            </vs-card>
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