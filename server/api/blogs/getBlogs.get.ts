export default defineEventHandler(async (event) => {
    const baseUrl = useRuntimeConfig().public.serviceUrl;
    const res = await fetch(baseUrl + '/blogs/getBlogs', {
        method: 'GET',
    }).then((res)=>res.json());
    console.log(res.data)
    return res;
})