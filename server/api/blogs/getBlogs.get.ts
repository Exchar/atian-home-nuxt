export default defineEventHandler(async (event) => {
    const baseUrl = useRuntimeConfig().public.serviceUrl;
    // console.log(res.data)
    return await fetch(baseUrl + '/blogs/getBlogs', {
        method: 'GET',
    }).then((res) => res.json());
})